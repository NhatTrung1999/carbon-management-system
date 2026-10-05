import { createSlice } from '@reduxjs/toolkit';
import infofactoryApi from '../api/infofactory';
import type { InfoFactoryData } from '../types/infofactorymanagement';
import { addLoadingMatchers, createApiThunk } from './helpers';

interface InfoFactoryState {
  infofactory: InfoFactoryData[];
  loading: boolean;
  error: string | null;
}

const initialState: InfoFactoryState = {
  infofactory: [],
  loading: false,
  error: null,
};

export const getInfoFactory = createApiThunk<
  InfoFactoryData[],
  Parameters<typeof infofactoryApi.getInfoFactory>[0]
>('infofactory/get-info-factory', infofactoryApi.getInfoFactory);

const infofactorySlice = createSlice({
  name: 'infofactory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfoFactory.fulfilled, (state, action) => {
      state.infofactory = action.payload;
    });

    addLoadingMatchers(builder, getInfoFactory);
  },
});

export default infofactorySlice.reducer;
