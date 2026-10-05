import { createSlice } from '@reduxjs/toolkit';
import categoryApi, {
  type Cat1AndCat4Query,
  type Cat6Query,
  type Cat9AndCat12Query,
} from '../api/category';
import type { ICat9AndCat12Data } from '../types/cat9andcat12';
import type { ICat5Data } from '../types/cat5';
import type { ICat7Data } from '../types/cat7';
import type { ICat6Data } from '../types/cat6';
import type { ICat1AndCat4Data } from '../types/cat1andcat4';
import type { ICustomExportData } from '../types/customexport';
import type { ListQuery } from '../types/query';
import {
  addPagedListCases,
  createPagedList,
  createPagedThunk,
  resetPagedList,
  type PagedList,
} from './helpers';

// Infinite-scroll lists of the category screens; each list owns its paging.
interface CategoryState {
  cat1andcat4: PagedList<ICat1AndCat4Data>;
  cat5: PagedList<ICat5Data>;
  cat6: PagedList<ICat6Data>;
  cat7: PagedList<ICat7Data>;
  cat9andcat12: PagedList<ICat9AndCat12Data>;
  customExport: PagedList<ICustomExportData>;
}

const initialState: CategoryState = {
  cat1andcat4: createPagedList(),
  cat5: createPagedList(),
  cat6: createPagedList(),
  cat7: createPagedList(),
  cat9andcat12: createPagedList(),
  customExport: createPagedList(),
};

export const getDataCat9AndCat12 = createPagedThunk<
  ICat9AndCat12Data,
  Cat9AndCat12Query
>('category/cat9-and-cat12', categoryApi.getDataCat9AndCat12);

export const getDataCat5 = createPagedThunk<ICat5Data, ListQuery>(
  'category/cat5',
  categoryApi.getDataCat5,
);

export const getDataCat7 = createPagedThunk<ICat7Data, ListQuery>(
  'category/cat7',
  categoryApi.getDataCat7,
);

export const getCustomExport = createPagedThunk<ICustomExportData, ListQuery>(
  'category/custom-export',
  categoryApi.getCustomExport,
);

export const getDataCat6 = createPagedThunk<ICat6Data, Cat6Query>(
  'category/cat6',
  categoryApi.getDataCat6,
);

export const getDataCat1AndCat4 = createPagedThunk<
  ICat1AndCat4Data,
  Cat1AndCat4Query
>('category/cat1-and-cat4', categoryApi.getDataCat1AndCat4);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetDataCat9AndCat12: (state) => resetPagedList(state.cat9andcat12),
    resetDataCat5: (state) => resetPagedList(state.cat5),
    resetDataCat7: (state) => resetPagedList(state.cat7),
    resetDataCat6: (state) => resetPagedList(state.cat6),
    resetDataCat1AndCat4: (state) => resetPagedList(state.cat1andcat4),
    resetDataCustomExport: (state) => resetPagedList(state.customExport),
  },
  extraReducers: (builder) => {
    addPagedListCases(
      builder,
      getDataCat9AndCat12,
      (s) => s.cat9andcat12,
      (item) => item.Invoice_Number,
    );
    addPagedListCases(builder, getDataCat5, (s) => s.cat5);
    addPagedListCases(builder, getDataCat7, (s) => s.cat7);
    addPagedListCases(builder, getDataCat6, (s) => s.cat6);
    addPagedListCases(builder, getDataCat1AndCat4, (s) => s.cat1andcat4);
    addPagedListCases(builder, getCustomExport, (s) => s.customExport);
  },
});

export const {
  resetDataCat1AndCat4,
  resetDataCat5,
  resetDataCat6,
  resetDataCat7,
  resetDataCat9AndCat12,
  resetDataCustomExport,
} = categorySlice.actions;

export default categorySlice.reducer;
