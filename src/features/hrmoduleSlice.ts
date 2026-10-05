import { createSlice } from '@reduxjs/toolkit';
import hrApi, { type HRQuery } from '../api/hr';
import type { IHRModule } from '../types/hrmodule';
import {
  addLoadingMatchers,
  addPagedListCases,
  createApiThunk,
  createPagedList,
  createPagedThunk,
  resetPagedList,
  type PagedList,
} from './helpers';

type HRUpdate = {
  id: string;
  CurrentAddress: string;
  TransportationMethod: string;
};

interface HRModuleState {
  list: PagedList<IHRModule>;
  /** Saving / importing (the list has its own loading flag). */
  loading: boolean;
  error: string | null;
}

const initialState: HRModuleState = {
  list: createPagedList(),
  loading: false,
  error: null,
};

export const fetchHRModule = createPagedThunk<IHRModule, HRQuery>(
  'hrmodule/fetch-hrmodule',
  hrApi.fetchHRModule,
);

export const fetchDepartmentHRModule = createApiThunk<
  { label: string; value: string }[]
>('hrmodule/fetch-department-hrmodule', hrApi.fetchDepartmentHRModule);

export const updateHRModule = createApiThunk<
  HRUpdate,
  { id: string; currentAddress: string; transportationMethod: string }
>(
  'hrmodule/update-hrmodule',
  ({ id, currentAddress, transportationMethod }) =>
    hrApi.updateHRModule(id, currentAddress, transportationMethod),
  'Update failed!',
);

export const importExcelHRModule = createApiThunk<
  { message: string; updatedData?: HRUpdate[] },
  File
>('hrmodule/import-excel-hrmodule', hrApi.importFromExcel, 'Import failed!');

/** Applies saved address/transport values to the rows already loaded (API returns lowercase `id`). */
const applyUpdate = (rows: IHRModule[], update: HRUpdate) => {
  const index = rows.findIndex((item) => item.ID === update.id);
  if (index !== -1) {
    rows[index] = {
      ...rows[index],
      CurrentAddress: update.CurrentAddress,
      TransportationMethod: update.TransportationMethod,
    };
  }
};

const hrmoduleSlice = createSlice({
  name: 'hrmodule',
  initialState,
  reducers: {
    resetDataHRModule: (state) => resetPagedList(state.list),
  },
  extraReducers: (builder) => {
    addPagedListCases(builder, fetchHRModule, (s) => s.list);

    builder
      .addCase(updateHRModule.fulfilled, (state, action) => {
        applyUpdate(state.list.items, action.payload);
      })
      .addCase(importExcelHRModule.fulfilled, (state, action) => {
        action.payload.updatedData?.forEach((update) =>
          applyUpdate(state.list.items, update),
        );
      });

    addLoadingMatchers(builder, updateHRModule, importExcelHRModule);
  },
});

export const { resetDataHRModule } = hrmoduleSlice.actions;

export default hrmoduleSlice.reducer;
