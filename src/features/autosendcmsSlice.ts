import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import autosendcmsApi from '../api/autosendcms';

interface IAutoSendCMSState {
  autoSendCMSCat5: any[];
  loading: boolean;
  error: string | null;
}

export const fetchDataAutoSendCMSCat5 = createAsyncThunk(
  'autosendcms/fetch-data-auto-send-cms-cat5',
  async (
    payload: { dateFrom: string; dateTo: string; factory: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await autosendcmsApi.autoSentCMSCat5({ ...payload });
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

const initialState: IAutoSendCMSState = {
  autoSendCMSCat5: [],
  loading: false,
  error: null,
};

const autosendcmsSlice = createSlice({
  name: 'autosendcms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default autosendcmsSlice.reducer;
