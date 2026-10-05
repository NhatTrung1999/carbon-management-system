import {
  createAsyncThunk,
  isFulfilled,
  isPending,
  isRejected,
  type ActionReducerMapBuilder,
  type AsyncThunk,
  type Draft,
} from '@reduxjs/toolkit';
import type { PagedResponse } from '../types/query';

// ─── Errors ──────────────────────────────────────────────────────────────────

/** Readable message from an axios/JS error, so rejected payloads stay serializable strings. */
export const getErrorMessage = (error: unknown, fallback = 'Error!') => {
  const err = error as {
    response?: { data?: { message?: unknown } };
    message?: unknown;
  };
  const message = err?.response?.data?.message ?? err?.message;
  return typeof message === 'string' && message ? message : fallback;
};

type ThunkConfig = { rejectValue: string };

/** createAsyncThunk with a string rejection value taken from the API error. */
export const createApiThunk = <Returned, Arg = void>(
  type: string,
  request: (arg: Arg) => Promise<unknown>,
  fallbackError = 'Error!',
) =>
  createAsyncThunk<Returned, Arg, ThunkConfig>(
    type,
    async (arg, { rejectWithValue }) => {
      try {
        return (await request(arg)) as Returned;
      } catch (error) {
        return rejectWithValue(getErrorMessage(error, fallbackError));
      }
    },
  );

// ─── Paged lists ─────────────────────────────────────────────────────────────

/** State of one infinite-scroll list. Each list owns its paging, so lists cannot clash. */
export type PagedList<T> = {
  items: T[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  /** Latest request; responses from older requests are ignored. */
  requestId: string | null;
};

export const createPagedList = <T>(): PagedList<T> => ({
  items: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
  requestId: null,
});

export const resetPagedList = <T>(list: PagedList<T> | Draft<PagedList<T>>) => {
  list.items = [];
  list.page = 1;
  list.hasMore = true;
  list.error = null;
};

export const createPagedThunk = <T, Q extends { page: number }>(
  type: string,
  request: (query: Q) => Promise<unknown>,
) => createApiThunk<PagedResponse<T>, Q>(type, request);

/**
 * Wires a paged thunk to one list: tracks loading, appends pages and ignores
 * stale responses. `dedupeBy` drops rows whose key is already in the list.
 */
export const addPagedListCases = <S, T, Q>(
  builder: ActionReducerMapBuilder<S>,
  thunk: AsyncThunk<PagedResponse<T>, Q, ThunkConfig>,
  selectList: (state: Draft<S>) => Draft<PagedList<T>>,
  dedupeBy?: (item: T) => unknown,
) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      const list = selectList(state);
      list.requestId = action.meta.requestId;
      list.loading = true;
      list.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      const list = selectList(state);
      if (action.meta.requestId !== list.requestId) return;
      list.loading = false;
      let rows = action.payload.data;
      if (dedupeBy) {
        const seen = new Set((list.items as T[]).map(dedupeBy));
        rows = rows.filter((item) => !seen.has(dedupeBy(item)));
      }
      (list.items as T[]).push(...rows);
      list.page += 1;
      list.hasMore = action.payload.hasMore;
    })
    .addCase(thunk.rejected, (state, action) => {
      const list = selectList(state);
      if (action.meta.requestId !== list.requestId) return;
      list.loading = false;
      list.error = action.payload ?? 'Error!';
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyApiThunk = AsyncThunk<any, any, ThunkConfig>;

/**
 * Keeps a slice-level `loading`/`error` in sync with the given thunks.
 * Uses matchers, so call it after all `addCase` calls of the slice.
 */
export const addLoadingMatchers = <
  S extends { loading: boolean; error: string | null },
>(
  builder: ActionReducerMapBuilder<S>,
  ...thunks: [AnyApiThunk, ...AnyApiThunk[]]
) => {
  builder
    .addMatcher(isPending(...thunks), (state) => {
      state.loading = true;
      state.error = null;
    })
    .addMatcher(isFulfilled(...thunks), (state) => {
      state.loading = false;
    })
    .addMatcher(isRejected(...thunks), (state, action) => {
      state.loading = false;
      state.error = (action.payload as string | undefined) ?? 'Error!';
    });
};
