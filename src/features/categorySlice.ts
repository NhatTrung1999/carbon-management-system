import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/category';
import type { ICat9AndCat12 } from '../types/cat9andcat12';

interface CategoryState {
  cat9andcat12: ICat9AndCat12[];
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
  loading: false,
  date: new Date().toISOString().slice(0, 10),
  error: null,
  page: 1,
  limit: 20,
  hasMore: true,
};

export const getData = createAsyncThunk(
  'category/test',
  async (
    {
      date,
      page,
      sortField,
      sortOrder
    }: {
      date: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoryApi.getData(date, page, sortField, sortOrder);
      // console.log(res);
      return res as {
        data: ICat9AndCat12[];
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
    resetData: (state) => {
      state.cat9andcat12 = [];
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
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        if (state.page === 2) {
          state.page = 1;
        }
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
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetData, setDate } = categorySlice.actions;

export default categorySlice.reducer;
