import axios, { type InternalAxiosRequestConfig } from 'axios';
import { apiConfig } from './apiConfig';
import { session } from '../utils/session';
import type { Session } from '../types/login';

const axiosConfig = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // Excel exports and CMS payloads can take several minutes.
  timeout: 30 * 60 * 1000,
});

axiosConfig.interceptors.request.use((config) => {
  const accessToken = session.getToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ── Token refresh ─────────────────────────────────────────────────────────────

let onSessionRefreshed: ((s: Session) => void) | null = null;

/** Lets the app update its state (e.g. Redux) after a silent token refresh. */
export const setOnSessionRefreshed = (listener: (s: Session) => void) => {
  onSessionRefreshed = listener;
};

// One refresh shared by all requests that fail with 401 at the same time.
let refreshing: Promise<Session> | null = null;

const refreshSession = async (refreshToken: string): Promise<Session> => {
  const refreshUrl = `${apiConfig.baseUrl.replace(/\/?$/, '/')}auth/refresh`;
  const { data } = await axios.post(refreshUrl, {
    refresh_token: refreshToken,
  });
  const next: Session = {
    token: data.access_token,
    refreshToken: data.refresh_token,
    user: data.payload,
  };
  session.save(next);
  onSessionRefreshed?.(next);
  return next;
};

type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequest | undefined;
    const refreshToken = session.getRefreshToken();
    const isAuthCall =
      originalRequest?.url?.includes('auth/login') ||
      originalRequest?.url?.includes('auth/refresh');

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthCall ||
      !refreshToken
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      refreshing ??= refreshSession(refreshToken).finally(() => {
        refreshing = null;
      });
      const { token } = await refreshing;
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axiosConfig(originalRequest);
    } catch {
      session.clear();
      window.location.href = '/login';
      return Promise.reject(error);
    }
  },
);

export default axiosConfig;
