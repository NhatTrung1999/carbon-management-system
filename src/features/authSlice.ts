import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import type { LoginPayload } from '../types/login';

export interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ userid, password, factory }: LoginPayload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login({ userid, password, factory });
      const token = data.access_token;
      sessionStorage.setItem('token', token);

      return { token, user: data.payload };
    } catch (error: any) {
      // console.log(error);
      return rejectWithValue(error.response.data.message || 'Login failed!');
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: sessionStorage.getItem('token'),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.token = null;
      state.user = null;
      state.error = null;
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;
        state.user = action.payload?.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
