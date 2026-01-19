import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import autosendcmsApi from '../api/autosendcms';

interface IAutoSendCMSState {
  autoSendCMSCat1AndCat4: any[];
  autoSendCMSCat5: any[];
  autoSendCMSCat9AndCat12: any[];
  loading: boolean;
  error: string | null;
}

export const fetchDataAutoSendCMSCat1AndCat4 = createAsyncThunk(
  'autosendcms/fetch-data-auto-send-cms-cat1-and-cat4',
  async (
    payload: { dateFrom: string; dateTo: string; factory: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await autosendcmsApi.fetchDataAutoSentCMSCat1AndCat4({
        ...payload,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

export const fetchDataAutoSendCMSCat5 = createAsyncThunk(
  'autosendcms/fetch-data-auto-send-cms-cat5',
  async (
    payload: { dateFrom: string; dateTo: string; factory: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await autosendcmsApi.fetchDataAutoSentCMSCat5({ ...payload });
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

export const fetchDataAutoSendCMSCat9AndCat12 = createAsyncThunk(
  'autosendcms/fetch-data-auto-send-cms-cat9-and-cat12',
  async (
    payload: { dateFrom: string; dateTo: string; factory: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await autosendcmsApi.fetchDataAutoSentCMSCat9AndCat12({
        ...payload,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

const initialState: IAutoSendCMSState = {
  autoSendCMSCat1AndCat4: [],
  autoSendCMSCat5: [],
  autoSendCMSCat9AndCat12: [],
  loading: false,
  error: null,
};

const autosendcmsSlice = createSlice({
  name: 'autosendcms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(fetchDataAutoSendCMSCat1AndCat4.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataAutoSendCMSCat1AndCat4.fulfilled, (state, action) => {
        state.loading = false;
        state.autoSendCMSCat1AndCat4 = action.payload;
      })
      .addCase(fetchDataAutoSendCMSCat1AndCat4.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchDataAutoSendCMSCat5.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataAutoSendCMSCat5.fulfilled, (state, action) => {
        state.loading = false;
        state.autoSendCMSCat5 = action.payload;
      })
      .addCase(fetchDataAutoSendCMSCat5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchDataAutoSendCMSCat9AndCat12.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataAutoSendCMSCat9AndCat12.fulfilled, (state, action) => {
        state.loading = false;
        state.autoSendCMSCat9AndCat12 = action.payload;
      })
      .addCase(fetchDataAutoSendCMSCat9AndCat12.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default autosendcmsSlice.reducer;
