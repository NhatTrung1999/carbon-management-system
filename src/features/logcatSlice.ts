import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ILogCat5Payload, ILoggingCat5Data } from '../types/loggingcat5';
import logcatApi from '../api/logcat';
import type { ILoggingCat1AndCat4Data } from '../types/loggingcat1and4';
import type { ILoggingCat6Data } from '../types/loggingcat6';
import type { ILoggingCat7Data } from '../types/loggingcat7';
import type {
  ILogCat9AndCat12Payload,
  ILoggingCat9AndCat12Data,
} from '../types/loggingcat9and12';

interface LogcatState {
  loggingcat1and4: ILoggingCat1AndCat4Data[];
  logcat5: ILoggingCat5Data[];
  loggingcat6: ILoggingCat6Data[];
  loggingcat7: ILoggingCat7Data[];
  logcat9and12: ILoggingCat9AndCat12Data[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: LogcatState = {
  loggingcat1and4: [],
  logcat5: [],
  loggingcat6: [],
  loggingcat7: [],
  logcat9and12: [],
  loading: false,
  error: null,
  page: 1,
  limit: 20,
  hasMore: true,
};

export const createLogCat5 = createAsyncThunk(
  'logcat/create-log-cat5',
  async (data: ILogCat5Payload, { rejectWithValue }) => {
    try {
      const res = await logcatApi.createLogCat5(data);
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

export const fetchLogCat5 = createAsyncThunk(
  'logcat/fetch-log-cat5',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await logcatApi.fetchLogCat5(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ILoggingCat5Data[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
      };
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

export const createLogCat9AndCat12 = createAsyncThunk(
  'logcat/create-log-cat9-and-cat12',
  async (data: ILogCat9AndCat12Payload, { rejectWithValue }) => {
    try {
      const res = await logcatApi.createLogCat9AndCat12(data);
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

export const fetchLogCat9AndCat12 = createAsyncThunk(
  'logcat/fetch-log-cat9-and-cat12',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await logcatApi.fetchLogCat9AndCat12(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ILoggingCat9AndCat12Data[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
      };
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

const logcatSlice = createSlice({
  name: 'logcat',
  initialState,
  reducers: {
    resetLogCat5: (state) => {
      state.logcat5 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetLogCat9And12: (state) => {
      state.logcat9and12 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogCat5.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogCat5.fulfilled, (state, action) => {
        state.loading = false;
        state.logcat5.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchLogCat5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchLogCat9AndCat12.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogCat9AndCat12.fulfilled, (state, action) => {
        state.loading = false;
        state.logcat9and12.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchLogCat9AndCat12.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetLogCat5, resetLogCat9And12 } = logcatSlice.actions;

export default logcatSlice.reducer;
