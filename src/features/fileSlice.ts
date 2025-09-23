import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fileManagementApi from '../api/filemanagement';

interface IFileState {
  file: any[];
  loading: boolean;
  error: string | null;
}

export const getData = createAsyncThunk(
  'file/get-data',
  async (
    {
      module,
      file_name,
      sortField,
      sortOrder,
    }: {
      module: string;
      file_name: string;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fileManagementApi.getData({
        module,
        file_name,
        sortField,
        sortOrder,
      });
      // console.log(res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const generateFileExcel = createAsyncThunk(
  'file/generate-file-excel',
  async (
    { module, date }: { module: string; date: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fileManagementApi.generateFileExcel({ module, date });
      console.log(res);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IFileState = {
  file: [],
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.file = action.payload.data;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fileSlice.reducer;
