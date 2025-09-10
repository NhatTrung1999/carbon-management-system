import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersApi from '../api/users';

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

export const getAll = createAsyncThunk(
  'user/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const res = await usersApi.getAll();
      // console.log(res);
      return res
    } catch (error: any) {
      return rejectWithValue('');
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
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
