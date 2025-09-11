import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersApi from '../api/users';
import type { SearchPayload, UserPayload } from '../types/users';

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

export const getSearch = createAsyncThunk(
  'user/get-search',
  async (payload: SearchPayload, { rejectWithValue }) => {
    try {
      const res = await usersApi.getSearch(payload);
      // console.log(res);
      return res;
    } catch (error: any) {
      return rejectWithValue('');
    }
  }
);

export const addUser = createAsyncThunk(
  'user/add-user',
  async (payload: UserPayload, { rejectWithValue }) => {
    try {
      const res = await usersApi.addUser(payload);
      console.log(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
