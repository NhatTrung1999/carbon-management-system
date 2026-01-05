import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import hrModuleAPi from '../api/hr';
import type { IHRModule } from '../types/hrmodule';

interface IHrModuleState {
  hrmodule: IHRModule[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
}

export const fetchHRModule = createAsyncThunk(
  'hrmodule/fetch-hrmodule',
  async (
    {
      dateFrom,
      dateTo,
      fullName,
      id,
      department,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      fullName: string;
      id: string;
      department: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await hrModuleAPi.fetchHRModule(
        dateFrom,
        dateTo,
        fullName,
        id,
        department,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: IHRModule[];
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

const initialState: IHrModuleState = {
  hrmodule: [],
  loading: false,
  error: null,
  page: 1,
  limit: 20,
  hasMore: true,
};

const hrmoduleSlice = createSlice({
  name: 'hrmodule',
  initialState,
  reducers: {
    resetDataHRModule: (state) => {
      state.hrmodule = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    setHRModule: (state, action) => {
      console.log(action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHRModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHRModule.fulfilled, (state, action) => {
        state.loading = false;
        state.hrmodule.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchHRModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDataHRModule, setHRModule } = hrmoduleSlice.actions;

export default hrmoduleSlice.reducer;
