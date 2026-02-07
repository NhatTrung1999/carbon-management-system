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
    {
      module,
      dateFrom,
      dateTo,
      factory,
      field,
      usage,
      unitWeight,
      weight,
      departure,
    }: {
      module: string;
      dateFrom: string;
      dateTo: string;
      factory: string;
      field?: string[];
      usage?: boolean;
      unitWeight?: boolean;
      weight?: boolean;
      departure?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fileManagementApi.generateFileExcel({
        module,
        dateFrom,
        dateTo,
        factory,
        field,
        usage,
        unitWeight,
        weight,
        departure,
      });
      return res;
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
