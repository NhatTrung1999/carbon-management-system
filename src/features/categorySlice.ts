import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import categoryApi from '../api/category';
import type { ICat9AndCat12Data, IPortCodeData } from '../types/cat9andcat12';
import type { ICat5Data } from '../types/cat5';
import type { ICat7Data } from '../types/cat7';

interface CategoryState {
  cat9andcat12: ICat9AndCat12Data[];
  cat5: ICat5Data[];
  cat7: ICat7Data[];
  portCode: IPortCodeData[];
  loading: boolean;
  // date: string;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: CategoryState = {
  cat9andcat12: [],
  cat5: [],
  cat7: [],
  portCode: [],
  loading: false,
  // date: new Date().toISOString().slice(0, 10),
  error: null,
  page: 1,
  limit: 20,
  hasMore: true,
};

export const getDataCat9AndCat12 = createAsyncThunk(
  'category/cat9-and-cat12',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoryApi.getDataCat9AndCat12(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ICat9AndCat12Data[];
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

export const importExcelPortCode = createAsyncThunk(
  'category/import-excel-port-code',
  async (file: File, { rejectWithValue }) => {
    try {
      const res = await categoryApi.importExcelPortCode(file);
      return res as { message: string; records: IPortCodeData[] };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Import failed!'
      );
    }
  }
);

export const getPortCode = createAsyncThunk(
  'category/get-port-code',
  async (
    { sortField, sortOrder }: { sortField: string; sortOrder: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoryApi.getPortCode(sortField, sortOrder);
      return res as IPortCodeData[];
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Get failed!');
    }
  }
);

export const getDataCat5 = createAsyncThunk(
  'category/cat5',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoryApi.getDataCat5(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ICat5Data[];
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

export const getDataCat7 = createAsyncThunk(
  'category/cat7',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoryApi.getDataCat7(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ICat7Data[];
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

export const getDataCat6 = createAsyncThunk(
  'category/cat6',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoryApi.getDataCat6(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ICat7Data[];
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

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetDataCat9AndCat12: (state) => {
      state.cat9andcat12 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetDataCat5: (state) => {
      state.cat5 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetDataCat7: (state) => {
      state.cat7 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    // setDate: (state, action) => {
    //   state.date = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // cat9andcat12
    builder
      .addCase(getDataCat9AndCat12.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataCat9AndCat12.fulfilled, (state, action) => {
        state.loading = false;
        const existingKeys = new Set(
          state.cat9andcat12.map((item) => item.Invoice_Number)
        );
        const filtered = action.payload.data.filter(
          (item) => !existingKeys.has(item.Invoice_Number)
        );
        state.cat9andcat12.push(...filtered);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(getDataCat9AndCat12.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // cat5
    builder
      .addCase(getDataCat5.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataCat5.fulfilled, (state, action) => {
        state.loading = false;
        // const existingKeys = new Set(state.cat5.map((item) => item.No));
        // const filtered = action.payload.data.filter(
        //   (item) => !existingKeys.has(item.No)
        // );
        // state.cat5.push(...filtered);
        state.cat5.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
        // const existingKeys = new Set(
        //   state.cat9andcat12.map((item) => item.Invoice_Number)
        // );
        // const filtered = action.payload.data.filter(
        //   (item) => !existingKeys.has(item.Invoice_Number)
        // );
        // state.cat9andcat12.push(...filtered);
        // state.state.page += 1;
        // state.hasMore = action.payload.hasMore;
      })
      .addCase(getDataCat5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //cat7
    builder
      .addCase(getDataCat7.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataCat7.fulfilled, (state, action) => {
        state.loading = false;
        state.cat7.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(getDataCat7.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // import excel port code
    builder
      .addCase(importExcelPortCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        importExcelPortCode.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; records: IPortCodeData[] }>
        ) => {
          const { records } = action.payload;
          state.loading = false;
          state.portCode = records;
          // console.log(action.payload);
        }
      )
      .addCase(importExcelPortCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //get port code
    builder
      .addCase(getPortCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPortCode.fulfilled,
        (state, action: PayloadAction<IPortCodeData[]>) => {
          state.loading = false;
          state.portCode = action.payload;
        }
      )
      .addCase(getPortCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDataCat9AndCat12, resetDataCat5, resetDataCat7 } =
  categorySlice.actions;

export default categorySlice.reducer;
