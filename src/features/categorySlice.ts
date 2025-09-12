import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import categoryApi from '../api/category';
import type { ICat9AndCat12, ICat9AndCat12Res } from '../types/category';

interface CategoryState {
  cat9andcat12: ICat9AndCat12[];
  loading: boolean;
  error: string | null;
}

export const getDataCat9AndCat12 = createAsyncThunk(
  'category/cat9-and-cat12',
  async (date: string, { rejectWithValue }) => {
    try {
      const res = await categoryApi.getDataCat9AndCat12({ date });
      // console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: CategoryState = {
  cat9andcat12: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataCat9AndCat12.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDataCat9AndCat12.fulfilled,
        (state, action: PayloadAction<ICat9AndCat12Res[]>) => {
          state.loading = false;
          state.cat9andcat12 = action.payload.map((item, index) => ({
            No: `${index + 1}`,
            Date: item.INV_DATE,
            Invoice_Number: item.INV_NO,
            Article_Name: item.STYLE_NAME,
            Quantity: item.Qty,
            Gross_Weight: item.GW,
            Customer_ID: item.CUSTID,
            Local_Land_Transportation: item.LocalLandTransportation,
            Port_Of_Departure: item.Place_Delivery,
            Port_Of_Arrival: item.Country,
            Transport_Method: item.TransportMethod,
          }));
        }
      )
      .addCase(getDataCat9AndCat12.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
