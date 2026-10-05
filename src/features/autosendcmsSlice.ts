import { createSlice } from '@reduxjs/toolkit';
import autosendcmsApi, {
  type CMSQuery,
  type CMSQueryCat9AndCat12,
} from '../api/autosendcms';
import type { DateFactoryFilter } from '../types/query';
import type {
  ILogCat1AndCat4Payload,
  ILogCat5Payload,
  ILogCat9AndCat12Payload,
} from '../types/loggingcms';
import type { ILogCat7Payload } from '../types/loggingcat7';
import { addLoadingMatchers, createApiThunk } from './helpers';

/** One row in the format the CMS integration API expects (also written to the log). */
export type CMSRecord = Record<string, unknown>;

// Data prefetched for the "Send to CMS" button of each category.
interface AutoSendCMSState {
  autoSendCMSCat1AndCat4: ILogCat1AndCat4Payload[];
  autoSendCMSCat5: ILogCat5Payload[];
  autoSendCMSCat6: CMSRecord[];
  autoSendCMSCat6Accommodation: CMSRecord[];
  autoSendCMSCat7: ILogCat7Payload[];
  autoSendCMSCat9AndCat12: ILogCat9AndCat12Payload[];
  loading: boolean;
  error: string | null;
}

const initialState: AutoSendCMSState = {
  autoSendCMSCat1AndCat4: [],
  autoSendCMSCat5: [],
  autoSendCMSCat6: [],
  autoSendCMSCat6Accommodation: [],
  autoSendCMSCat7: [],
  autoSendCMSCat9AndCat12: [],
  loading: false,
  error: null,
};

export const fetchDataAutoSendCMSCat1AndCat4 = createApiThunk<
  ILogCat1AndCat4Payload[],
  CMSQuery
>('autosendcms/cat1-and-cat4', autosendcmsApi.getCat1AndCat4);

export const fetchDataAutoSendCMSCat5 = createApiThunk<
  ILogCat5Payload[],
  CMSQuery
>('autosendcms/cat5', autosendcmsApi.getCat5);

export const fetchDataAutoSendCMSCat6 = createApiThunk<
  CMSRecord[],
  DateFactoryFilter
>('autosendcms/cat6', autosendcmsApi.getCat6);

export const fetchDataAutoSendCMSCat6Accommodation = createApiThunk<
  CMSRecord[],
  DateFactoryFilter
>('autosendcms/cat6-accommodation', autosendcmsApi.getCat6Accommodation);

export const fetchDataAutoSendCMSCat7 = createApiThunk<
  ILogCat7Payload[],
  DateFactoryFilter
>('autosendcms/cat7', autosendcmsApi.getCat7);

export const fetchDataAutoSendCMSCat9AndCat12 = createApiThunk<
  ILogCat9AndCat12Payload[],
  CMSQueryCat9AndCat12
>('autosendcms/cat9-and-cat12', autosendcmsApi.getCat9AndCat12);

const autosendcmsSlice = createSlice({
  name: 'autosendcms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAutoSendCMSCat1AndCat4.fulfilled, (state, action) => {
        state.autoSendCMSCat1AndCat4 = action.payload;
      })
      .addCase(fetchDataAutoSendCMSCat5.fulfilled, (state, action) => {
        state.autoSendCMSCat5 = action.payload;
      })
      .addCase(fetchDataAutoSendCMSCat6.fulfilled, (state, action) => {
        state.autoSendCMSCat6 = action.payload;
      })
      .addCase(
        fetchDataAutoSendCMSCat6Accommodation.fulfilled,
        (state, action) => {
          state.autoSendCMSCat6Accommodation = action.payload;
        },
      )
      .addCase(fetchDataAutoSendCMSCat7.fulfilled, (state, action) => {
        state.autoSendCMSCat7 = action.payload;
      })
      .addCase(fetchDataAutoSendCMSCat9AndCat12.fulfilled, (state, action) => {
        state.autoSendCMSCat9AndCat12 = action.payload;
      });

    addLoadingMatchers(
      builder,
      fetchDataAutoSendCMSCat1AndCat4,
      fetchDataAutoSendCMSCat5,
      fetchDataAutoSendCMSCat6,
      fetchDataAutoSendCMSCat6Accommodation,
      fetchDataAutoSendCMSCat7,
      fetchDataAutoSendCMSCat9AndCat12,
    );
  },
});

export default autosendcmsSlice.reducer;
