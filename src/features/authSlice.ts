import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import type { AuthUser, LoginPayload, Session } from '../types/login';
import { session } from '../utils/session';
import { createApiThunk } from './helpers';

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export const login = createApiThunk<Session, LoginPayload>(
  'auth/login',
  async (payload) => {
    const { data } = await authApi.login(payload);
    const next: Session = {
      token: data.access_token,
      refreshToken: data.refresh_token,
      user: data.payload,
    };
    session.save(next);
    return next;
  },
  'Login failed!',
);

const initialState: AuthState = {
  user: session.getUser(),
  token: session.getToken(),
  refreshToken: session.getRefreshToken(),
  loading: false,
  error: null,
};

const applySession = (state: AuthState, next: Session) => {
  state.token = next.token;
  state.refreshToken = next.refreshToken;
  state.user = next.user;
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
      session.clear();
    },
    /** Called after the axios interceptor refreshed the tokens. */
    sessionRefreshed: (state, action: PayloadAction<Session>) => {
      applySession(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        applySession(state, action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed!';
      });
  },
});

export const { logout, sessionRefreshed } = authSlice.actions;

export default authSlice.reducer;
