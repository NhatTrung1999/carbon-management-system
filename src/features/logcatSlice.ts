import { createSlice } from '@reduxjs/toolkit';
import logcatApi from '../api/logcat';
import type {
  ILogCat1AndCat4Payload,
  ILogCat5Payload,
  ILogCat9AndCat12Payload,
  ILoggingCMSData,
} from '../types/loggingcms';
import type {
  ILoggingCat6BusinessTravelData,
  ILoggingCat6Accommodation,
} from '../types/loggingcat6';
import type { ILogCat7Payload, ILoggingCat7Data } from '../types/loggingcat7';
import type { ListQuery } from '../types/query';
import {
  addPagedListCases,
  createApiThunk,
  createPagedList,
  createPagedThunk,
  resetPagedList,
  type PagedList,
} from './helpers';

// Logs of data sent to CMS; each logging tab owns its paged list.
interface LogcatState {
  logcat1and4: PagedList<ILoggingCMSData>;
  logcat5: PagedList<ILoggingCMSData>;
  logcat6businesstravel: PagedList<ILoggingCat6BusinessTravelData>;
  logcat6accommodation: PagedList<ILoggingCat6Accommodation>;
  logcat7: PagedList<ILoggingCat7Data>;
  logcat9and12: PagedList<ILoggingCMSData>;
}

const initialState: LogcatState = {
  logcat1and4: createPagedList(),
  logcat5: createPagedList(),
  logcat6businesstravel: createPagedList(),
  logcat6accommodation: createPagedList(),
  logcat7: createPagedList(),
  logcat9and12: createPagedList(),
};

// ── Write logs ───────────────────────────────────────────────────────────────
export const createLogCat1AndCat4 = createApiThunk<
  unknown,
  ILogCat1AndCat4Payload[]
>('logcat/create-log-cat1-and-cat4', logcatApi.createLogCat1AndCat4);

export const createLogCat5 = createApiThunk<unknown, ILogCat5Payload[]>(
  'logcat/create-log-cat5',
  logcatApi.createLogCat5,
);

export const createLogCat6BusinessTravel = createApiThunk<unknown, object[]>(
  'logcat/create-log-cat6-business-travel',
  logcatApi.createLogCat6BusinessTravel,
);

export const createLogCat6Accommodation = createApiThunk<unknown, object[]>(
  'logcat/create-log-cat6-accommodation',
  logcatApi.createLogCat6Accommodation,
);

export const createLogCat7 = createApiThunk<unknown, ILogCat7Payload[]>(
  'logcat/create-log-cat7',
  logcatApi.createLogCat7,
);

export const createLogCat9AndCat12 = createApiThunk<
  unknown,
  ILogCat9AndCat12Payload[]
>('logcat/create-log-cat9-12', logcatApi.createLogCat9AndCat12);

// ── Read logs (paged) ────────────────────────────────────────────────────────
export const fetchLogCat1AndCat4 = createPagedThunk<ILoggingCMSData, ListQuery>(
  'logcat/fetch-log-cat1-and-cat4',
  logcatApi.fetchLogCat1AndCat4,
);

export const fetchLogCat5 = createPagedThunk<ILoggingCMSData, ListQuery>(
  'logcat/fetch-log-cat5',
  logcatApi.fetchLogCat5,
);

export const fetchLogCat6BusinessTravel = createPagedThunk<
  ILoggingCat6BusinessTravelData,
  ListQuery
>(
  'logcat/fetch-log-cat6-business-travel',
  logcatApi.fetchLogCat6BusinessTravel,
);

export const fetchLogCat6Accommodation = createPagedThunk<
  ILoggingCat6Accommodation,
  ListQuery
>('logcat/fetch-log-cat6-accommodation', logcatApi.fetchLogCat6Accommodation);

export const fetchLogCat7 = createPagedThunk<ILoggingCat7Data, ListQuery>(
  'logcat/fetch-log-cat7',
  logcatApi.fetchLogCat7,
);

export const fetchLogCat9AndCat12 = createPagedThunk<
  ILoggingCMSData,
  ListQuery
>('logcat/fetch-log-cat9-12', logcatApi.fetchLogCat9AndCat12);

const logcatSlice = createSlice({
  name: 'logcat',
  initialState,
  reducers: {
    resetLogCat1And4: (state) => resetPagedList(state.logcat1and4),
    resetLogCat5: (state) => resetPagedList(state.logcat5),
    resetLogCat7: (state) => resetPagedList(state.logcat7),
    resetLogCat6BusinessTravel: (state) =>
      resetPagedList(state.logcat6businesstravel),
    resetLogCat6Accommodation: (state) =>
      resetPagedList(state.logcat6accommodation),
    resetLogCat9And12: (state) => resetPagedList(state.logcat9and12),
  },
  extraReducers: (builder) => {
    addPagedListCases(builder, fetchLogCat1AndCat4, (s) => s.logcat1and4);
    addPagedListCases(builder, fetchLogCat5, (s) => s.logcat5);
    addPagedListCases(
      builder,
      fetchLogCat6BusinessTravel,
      (s) => s.logcat6businesstravel,
    );
    addPagedListCases(
      builder,
      fetchLogCat6Accommodation,
      (s) => s.logcat6accommodation,
    );
    addPagedListCases(builder, fetchLogCat7, (s) => s.logcat7);
    addPagedListCases(builder, fetchLogCat9AndCat12, (s) => s.logcat9and12);
  },
});

export const {
  resetLogCat1And4,
  resetLogCat5,
  resetLogCat7,
  resetLogCat6BusinessTravel,
  resetLogCat6Accommodation,
  resetLogCat9And12,
} = logcatSlice.actions;

export default logcatSlice.reducer;
