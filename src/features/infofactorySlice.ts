import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import infofactoryApi from '../api/infofactory';
import type { InfoFactoryData } from '../types/infofactorymanagement';

interface IInfoFactoryState {
  infofactory: InfoFactoryData[];
  loading: boolean;
  error: string | null;
}

export const getInfoFactory = createAsyncThunk(
  'infofactory/get-info-factory',
  async (payload: {
    companyName: string;
    city: string;
    sortField: string;
    sortOrder: string;
  }) => {
    const response = await infofactoryApi.getInfoFactory(payload);
    return response;
  }
);

const initialState: IInfoFactoryState = {
  infofactory: [],
  loading: false,
  error: null,
};

const infofactorySlice = createSlice({
  name: 'infofactory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfoFactory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInfoFactory.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.infofactory = action.payload;
      })
      .addCase(getInfoFactory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default infofactorySlice.reducer;
