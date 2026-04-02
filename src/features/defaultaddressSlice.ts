import { createSlice } from '@reduxjs/toolkit';
import type { IDefaultAddress } from '../types/defaultaddress';

interface DefaultAddressState {
  defaultAddress: IDefaultAddress[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: DefaultAddressState = {
  defaultAddress: [],
  loading: false,
  error: null,
  page: 1,
  limit: 20,
  hasMore: true,
};

const defaultaddressSlice = createSlice({
  name: 'defaultAddress',
  initialState,
  reducers: {},
});

export default defaultaddressSlice.reducer;
