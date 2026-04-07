import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { IDefaultAddress } from '../types/defaultaddress';
import defaultAddressApi from '../api/defaultaddress';

interface DefaultAddressState {
  defaultAddress: IDefaultAddress[];
  loading: boolean;
  loadingDelete: boolean;
  error: string | null;
}

const initialState: DefaultAddressState = {
  defaultAddress: [],
  loading: false,
  loadingDelete: false,
  error: null,
};

export const getDefaultAddress = createAsyncThunk(
  'defaultaddress/get-default-address',
  async (
    { sortField, sortOrder }: { sortField: string; sortOrder: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAddressApi.getDefaultAddress(
        sortField,
        sortOrder
      );
      return res as IDefaultAddress[];
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Get failed!');
    }
  }
);

export const updateDefaultAddress = createAsyncThunk(
  'defaultaddress/update-default-address',
  async (
    {
      id,
      defaultAddress,
    }: {
      id: string;
      defaultAddress: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAddressApi.updateDefaultAddress(
        id,
        defaultAddress
      );
      return res;
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

export const deleteDefaultAddress = createAsyncThunk(
  'defaultaddress/delete-default-address',
  async (
    {
      id,
    }: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAddressApi.deleteDefaultAddress(id);
      return res;
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

export const importExcelDefaultAddress = createAsyncThunk(
  'defaultaddress/import-excel-default-address',
  async (file: File, { rejectWithValue }) => {
    try {
      const res = await defaultAddressApi.importExcelDefaultAddress(file);
      return res as { message: string; records: IDefaultAddress[] };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Import failed!'
      );
    }
  }
);

export const syncDefaultAddress = createAsyncThunk(
  'defaultaddress/sync-default-address',
  async (
    {
      factory,
      defaultAddress,
    }: {
      factory: string;
      defaultAddress: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAddressApi.syncDefaultAddress(
        factory,
        defaultAddress
      );
      return res;
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

const defaultaddressSlice = createSlice({
  name: 'defaultaddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDefaultAddress.fulfilled,
        (state, action: PayloadAction<IDefaultAddress[]>) => {
          state.loading = false;
          state.defaultAddress = action.payload;
        }
      )
      .addCase(getDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const index = state.defaultAddress.findIndex(
          (item) => item.ID === updatedItem.ID
        );
        if (index !== -1) {
          state.defaultAddress[index] = {
            ...state.defaultAddress[index],
            ...updatedItem,
          };
        }
      })
      .addCase(updateDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteDefaultAddress.pending, (state) => {
        state.loadingDelete = true;
        state.error = null;
      })
      .addCase(deleteDefaultAddress.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.defaultAddress = state.defaultAddress.filter(
          (item) => item.ID !== action.payload.ID
        );
      })
      .addCase(deleteDefaultAddress.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(importExcelDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importExcelDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultAddress = action.payload.records;
      })
      .addCase(importExcelDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default defaultaddressSlice.reducer;
