import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import type { LoginPayload } from '../types/login';

export interface AuthState {
  user: any;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ userid, password, factory }: LoginPayload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login({ userid, password, factory });
      const token = data.access_token;
      const refreshToken = data.refresh_token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('user', JSON.stringify(data.payload));
      return { token, refreshToken, user: data.payload };
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Login failed!');
    }
  }
);

const initialState: AuthState = {
  user: JSON.parse(sessionStorage.getItem('user') ?? 'null'),
  token: sessionStorage.getItem('token'),
  refreshToken: sessionStorage.getItem('refreshToken'),
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
      state.refreshToken = null;
      state.user = null;
      state.error = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token || sessionStorage.getItem('token');
        state.refreshToken =
          action.payload?.refreshToken || sessionStorage.getItem('refreshToken');
        state.user =
          action.payload?.user ||
          JSON.parse(sessionStorage.getItem('user') ?? 'null');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
