import { createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/category';
import type { IPortCodeData } from '../types/cat9andcat12';
import type {
  IPortCodeDataCat1AndCat4,
  IStyleAutoFill,
  ITaxFreeZoneAddress,
} from '../types/cat1andcat4';
import type { SortQuery } from '../types/query';
import { addLoadingMatchers, createApiThunk } from './helpers';

// Reference tables maintained by Excel import (port codes, addresses, styles).
interface MasterDataState {
  portCode: IPortCodeData[];
  portCodeCat1AndCat4: IPortCodeDataCat1AndCat4[];
  taxFreeZoneAddress: ITaxFreeZoneAddress[];
  styleAutoFill: IStyleAutoFill[];
  loading: boolean;
  error: string | null;
}

const initialState: MasterDataState = {
  portCode: [],
  portCodeCat1AndCat4: [],
  taxFreeZoneAddress: [],
  styleAutoFill: [],
  loading: false,
  error: null,
};

type ImportResult<T> = { message: string; records: T[] };

// ── Port code (Cat 9 & 12) ───────────────────────────────────────────────────
export const getPortCode = createApiThunk<IPortCodeData[], SortQuery>(
  'masterData/get-port-code',
  categoryApi.getPortCode,
  'Get failed!',
);

export const importExcelPortCode = createApiThunk<
  ImportResult<IPortCodeData>,
  File
>(
  'masterData/import-excel-port-code',
  categoryApi.importExcelPortCode,
  'Import failed!',
);

// ── Port code (Cat 1 & 4) ────────────────────────────────────────────────────
export const getPortCodeCat1AndCat4 = createApiThunk<
  IPortCodeDataCat1AndCat4[],
  SortQuery
>(
  'masterData/get-port-code-cat1-and-cat4',
  categoryApi.getPortCodeCat1AndCat4,
  'Get failed!',
);

export const importExcelPortCodeCat1AndCat4 = createApiThunk<
  ImportResult<IPortCodeDataCat1AndCat4>,
  File
>(
  'masterData/import-excel-port-code-cat1-and-cat4',
  categoryApi.importExcelPortCodeCat1AndCat4,
  'Import failed!',
);

// ── Tax-free zone address ────────────────────────────────────────────────────
export const getTaxFreeZoneAddress = createApiThunk<
  ITaxFreeZoneAddress[],
  SortQuery
>(
  'masterData/get-tax-free-zone-address',
  categoryApi.getTaxFreeZoneAddress,
  'Get failed!',
);

export const importExcelTaxFreeZoneAddress = createApiThunk<
  ImportResult<ITaxFreeZoneAddress>,
  File
>(
  'masterData/import-excel-tax-free-zone-address',
  categoryApi.importExcelTaxFreeZoneAddress,
  'Import failed!',
);

export const updateTaxFreeZoneAddress = createApiThunk<
  ITaxFreeZoneAddress,
  { id: string; taxFreeZoneAddress: string }
>(
  'masterData/update-tax-free-zone-address',
  ({ id, taxFreeZoneAddress }) =>
    categoryApi.updateTaxFreeZoneAddress(id, taxFreeZoneAddress),
  'Update failed!',
);

// ── Style auto-fill ──────────────────────────────────────────────────────────
export const getStyleAutoFill = createApiThunk<IStyleAutoFill[], SortQuery>(
  'masterData/get-style-auto-fill',
  categoryApi.getStyleAutoFill,
  'Get failed!',
);

export const importExcelStyleAutoFill = createApiThunk<
  ImportResult<IStyleAutoFill>,
  File
>(
  'masterData/import-excel-style-auto-fill',
  categoryApi.importExcelStyleAutoFill,
  'Import failed!',
);

export const deleteStyleAutoFill = createApiThunk<
  { message: string; Id: string },
  { id: string }
>(
  'masterData/delete-style-auto-fill',
  ({ id }) => categoryApi.deleteStyleAutoFill(id),
  'Delete failed!',
);

const masterDataSlice = createSlice({
  name: 'masterData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPortCode.fulfilled, (state, action) => {
        state.portCode = action.payload;
      })
      .addCase(importExcelPortCode.fulfilled, (state, action) => {
        state.portCode = action.payload.records;
      })
      .addCase(getPortCodeCat1AndCat4.fulfilled, (state, action) => {
        state.portCodeCat1AndCat4 = action.payload;
      })
      .addCase(importExcelPortCodeCat1AndCat4.fulfilled, (state, action) => {
        state.portCodeCat1AndCat4 = action.payload.records;
      })
      .addCase(getTaxFreeZoneAddress.fulfilled, (state, action) => {
        state.taxFreeZoneAddress = action.payload;
      })
      .addCase(importExcelTaxFreeZoneAddress.fulfilled, (state, action) => {
        state.taxFreeZoneAddress = action.payload.records;
      })
      .addCase(updateTaxFreeZoneAddress.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.taxFreeZoneAddress.findIndex(
          (item) => item.ID === updated.ID,
        );
        if (index !== -1) {
          state.taxFreeZoneAddress[index] = {
            ...state.taxFreeZoneAddress[index],
            ...updated,
          };
        }
      })
      .addCase(getStyleAutoFill.fulfilled, (state, action) => {
        state.styleAutoFill = action.payload;
      })
      .addCase(importExcelStyleAutoFill.fulfilled, (state, action) => {
        state.styleAutoFill = action.payload.records;
      })
      .addCase(deleteStyleAutoFill.fulfilled, (state, action) => {
        state.styleAutoFill = state.styleAutoFill
          .filter((item) => item.Id !== action.payload.Id)
          .map((item, index) => ({ ...item, No: String(index + 1) }));
      });

    addLoadingMatchers(
      builder,
      getPortCode,
      importExcelPortCode,
      getPortCodeCat1AndCat4,
      importExcelPortCodeCat1AndCat4,
      getTaxFreeZoneAddress,
      importExcelTaxFreeZoneAddress,
      updateTaxFreeZoneAddress,
      getStyleAutoFill,
      importExcelStyleAutoFill,
    );
  },
});

export default masterDataSlice.reducer;
