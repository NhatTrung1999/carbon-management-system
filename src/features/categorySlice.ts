import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/category';
import type { ICat9AndCat12Data } from '../types/cat9andcat12';
import type { ICat5Data } from '../types/cat5';

interface CategoryState {
  cat9andcat12: ICat9AndCat12Data[];
  cat5: ICat5Data[];
  loading: boolean;
  date: string;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
}

// export const getDataCat9AndCat12 = createAsyncThunk(
//   'category/cat9-and-cat12',
//   async (
//     { date, page }: { date: string; page: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await categoryApi.getDataCat9AndCat12({
//         date,
//         page,
//       });
//       return res;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const getDataCat9AndCat12Test = createAsyncThunk(
//   'category/cat9-and-cat12-test',
//   async (
//     { date, page }: { date: string; page?: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await categoryApi.getDataCat9AndCat12Test({ date, page });
//       return res;
//     } catch (error: any) {
//       return rejectWithValue(error);
//     }
//   }
// );

const initialState: CategoryState = {
  cat9andcat12: [],
  cat5: [],
  loading: false,
  date: new Date().toISOString().slice(0, 10),
  error: null,
  page: 1,
  limit: 20,
  hasMore: true,
};

export const getDataCat9AndCat12 = createAsyncThunk(
  'category/cat9-and-cat12',
  async (
    {
      date,
      page,
      sortField,
      sortOrder,
    }: {
      date: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoryApi.getDataCat9AndCat12(
        date,
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

export const getDataCat5 = createAsyncThunk(
  'category/cat5',
  async (
    {
      date,
      page,
      sortField,
      sortOrder,
    }: {
      date: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoryApi.getDataCat5(
        date,
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
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
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
  },
});

export const { resetDataCat9AndCat12, resetDataCat5, setDate } =
  categorySlice.actions;

export default categorySlice.reducer;
