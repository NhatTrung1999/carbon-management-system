import { createSlice } from '@reduxjs/toolkit';
import defaultAddressApi from '../api/defaultaddress';
import type { IDefaultAddress } from '../types/defaultaddress';
import type { SortQuery } from '../types/query';
import { addLoadingMatchers, createApiThunk } from './helpers';

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

export const getDefaultAddress = createApiThunk<IDefaultAddress[], SortQuery>(
  'defaultaddress/get-default-address',
  defaultAddressApi.getDefaultAddress,
  'Get failed!',
);

export const updateDefaultAddress = createApiThunk<
  IDefaultAddress,
  { id: string; defaultAddress: string }
>(
  'defaultaddress/update-default-address',
  ({ id, defaultAddress }) =>
    defaultAddressApi.updateDefaultAddress(id, defaultAddress),
  'Update failed!',
);

export const deleteDefaultAddress = createApiThunk<
  { message: string; ID: string },
  { id: string }
>(
  'defaultaddress/delete-default-address',
  ({ id }) => defaultAddressApi.deleteDefaultAddress(id),
  'Delete failed!',
);

export const importExcelDefaultAddress = createApiThunk<
  { message: string; records: IDefaultAddress[] },
  File
>(
  'defaultaddress/import-excel-default-address',
  defaultAddressApi.importExcelDefaultAddress,
  'Import failed!',
);

export const syncDefaultAddress = createApiThunk<
  { message: string },
  { factory: string; defaultAddress: string }
>(
  'defaultaddress/sync-default-address',
  ({ factory, defaultAddress }) =>
    defaultAddressApi.syncDefaultAddress(factory, defaultAddress),
  'Sync failed!',
);

const defaultaddressSlice = createSlice({
  name: 'defaultaddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDefaultAddress.fulfilled, (state, action) => {
        state.defaultAddress = action.payload;
      })
      .addCase(updateDefaultAddress.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.defaultAddress.findIndex(
          (item) => item.ID === updated.ID,
        );
        if (index !== -1) {
          state.defaultAddress[index] = {
            ...state.defaultAddress[index],
            ...updated,
          };
        }
      })
      .addCase(importExcelDefaultAddress.fulfilled, (state, action) => {
        state.defaultAddress = action.payload.records;
      })
      // Delete has its own spinner so the table does not reload.
      .addCase(deleteDefaultAddress.pending, (state) => {
        state.loadingDelete = true;
        state.error = null;
      })
      .addCase(deleteDefaultAddress.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.defaultAddress = state.defaultAddress.filter(
          (item) => item.ID !== action.payload.ID,
        );
      })
      .addCase(deleteDefaultAddress.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = action.payload ?? 'Delete failed!';
      });

    addLoadingMatchers(
      builder,
      getDefaultAddress,
      updateDefaultAddress,
      importExcelDefaultAddress,
    );
  },
});

export default defaultaddressSlice.reducer;
