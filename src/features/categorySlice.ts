import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import categoryApi from '../api/category';
import type { ICat9AndCat12, ICat9AndCat12Res } from '../types/cat9andcat12';

interface CategoryState {
  cat9andcat12: ICat9AndCat12[];
  loading: boolean;
  // date: string;
  error: string | null;
  page: number;
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
  // date: new Date().toISOString().slice(0, 10),
  error: null,
  page: 1,
  hasMore: true,
};

export const getTest = createAsyncThunk(
  'category/test',
  async (page: number) => {
    const res = await categoryApi.getTest(page);
    return res;
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCat9AndCat12: (state) => {
      state.cat9andcat12 = [];
      state.page = 1;
      state.hasMore = true;
    },
    // setDate: (state, action) => {
    //   state.date = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.loading = false;
        state.cat9andcat12.push(action.payload);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      });
    // builder
    //   .addCase(getDataCat9AndCat12.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(
    //     getDataCat9AndCat12.fulfilled,
    //     (state, action: PayloadAction<ICat9AndCat12Res[]>) => {
    //       state.loading = false;
    //       if (state.page === 1) {
    //         state.cat9andcat12 = [];
    //       }
    // const newData: ICat9AndCat12[] = action.payload.map(
    //   (item, index) => ({
    //     No: `${state.cat9andcat12.length + index + 1}`,
    //     Date: item.INV_DATE,
    //     Invoice_Number: item.INV_NO,
    //     Article_Name: item.STYLE_NAME,
    //     Quantity: item.Qty,
    //     Gross_Weight: item.GW,
    //     Customer_ID: item.CUSTID,
    //     Local_Land_Transportation: item.LocalLandTransportation,
    //     Port_Of_Departure: item.Place_Delivery,
    //     Port_Of_Arrival: item.Country,
    //     Land_Transport_Distance: item.Land_Transport_Distance || '',
    //     Sea_Transport_Distance: item.Sea_Transport_Distance || '',
    //     Air_Transport_Distance: item.Air_Transport_Distance || '',
    //     Transport_Method: item.TransportMethod,
    //     Air_Transport_Ton_Kilometers:
    //       item.Air_Transport_Ton_Kilometers || '',
    //     Sea_Transport_Ton_Kilometers:
    //       item.Sea_Transport_Ton_Kilometers || '',
    //     Land_Transport_Ton_Kilometers:
    //       item.Land_Transport_Ton_Kilometers || '',
    //   })
    // );
    //       state.cat9andcat12 = [...state.cat9andcat12, ...newData];
    //       state.page += 1;
    //       state.hasMore = action.payload.length >= 20;
    //     }
    //   )
    //   .addCase(getDataCat9AndCat12.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
    // builder
    //   .addCase(getDataCat9AndCat12Test.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(
    //     getDataCat9AndCat12Test.fulfilled,
    //     (state, action: PayloadAction<ICat9AndCat12Res[]>) => {
    //       state.loading = false;
    //       if (state.page === 1) {
    //         state.cat9andcat12 = [];
    //       }
    //       const newData = action.payload.map((item, index) => ({
    //         No: `${state.cat9andcat12.length + index + 1}`,
    //         Date: item.INV_DATE,
    //         Invoice_Number: item.INV_NO,
    //         Article_Name: item.STYLE_NAME,
    //         Quantity: item.Qty,
    //         Gross_Weight: item.GW,
    //         Customer_ID: item.CUSTID,
    //         Local_Land_Transportation: item.LocalLandTransportation,
    //         Port_Of_Departure: item.Place_Delivery,
    //         Port_Of_Arrival: item.Country,
    //         Land_Transport_Distance: item.Land_Transport_Distance || '',
    //         Sea_Transport_Distance: item.Sea_Transport_Distance || '',
    //         Air_Transport_Distance: item.Air_Transport_Distance || '',
    //         Transport_Method: item.TransportMethod,
    //         Air_Transport_Ton_Kilometers:
    //           item.Air_Transport_Ton_Kilometers || '',
    //         Sea_Transport_Ton_Kilometers:
    //           item.Sea_Transport_Ton_Kilometers || '',
    //         Land_Transport_Ton_Kilometers:
    //           item.Land_Transport_Ton_Kilometers || '',
    //       }));
    //       // state.cat9andcat12 = newData;
    //       state.cat9andcat12 = [...state.cat9andcat12, ...newData];
    //       // console.log(action.payload);
    //       // state.page += action.payload.length;
    //       state.hasMore = action.payload.length >= 20;
    //     }
    //   )
    //   .addCase(getDataCat9AndCat12Test.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});

export const { resetCat9AndCat12 } = categorySlice.actions;

export default categorySlice.reducer;
