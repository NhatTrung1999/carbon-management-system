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

export const fetchDepartmentHRModule = createAsyncThunk(
  'hrmodule/fetch-department-hrmodule',
  async (_, { rejectWithValue }) => {
    try {
      const res = await hrModuleAPi.fetchDepartmentHRModule();
      return res;
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

export const updateHRModule = createAsyncThunk(
  'hrmodule/update-hrmodule',
  async (
    {
      id,
      currentAddress,
      transportationMethod,
    }: {
      id: string;
      currentAddress: string;
      transportationMethod: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await hrModuleAPi.updateHRModule(
        id,
        currentAddress,
        transportationMethod
      );
      return res;
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

export const importExcelHRModule = createAsyncThunk(
  'hrmodule/import-excel-hrmodule',
  async (file: File, { rejectWithValue }) => {
    try {
      const res = await hrModuleAPi.importFromExcel(file);
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Import failed!'
      );
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

    builder
      .addCase(updateHRModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHRModule.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const index = state.hrmodule.findIndex(
          (item) => item.ID === updatedItem.id
        );
        if (index !== -1) {
          state.hrmodule[index] = {
            ...state.hrmodule[index],
            ...updatedItem,
          };
        }
      })
      .addCase(updateHRModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(importExcelHRModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importExcelHRModule.fulfilled, (state, action) => {
        state.loading = false;
        const { updatedData } = action.payload;
        if (updatedData && Array.isArray(updatedData)) {
          updatedData.forEach((newItem: any) => {
            const index = state.hrmodule.findIndex(
              (item) => item.ID === newItem.id
            );
            if (index !== -1) {
              state.hrmodule[index] = {
                ...state.hrmodule[index],
                CurrentAddress: newItem.CurrentAddress,
                TransportationMethod: newItem.TransportationMethod,
              };
            }
          });
        }
      })
      .addCase(importExcelHRModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDataHRModule } = hrmoduleSlice.actions;

export default hrmoduleSlice.reducer;
