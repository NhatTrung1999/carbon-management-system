import type { AuthUser, Session } from '../types/login';

// The login session lives in sessionStorage, so it ends when the tab closes.

const KEYS = {
  token: 'token',
  refreshToken: 'refreshToken',
  user: 'user',
} as const;

const readUser = (): AuthUser | null => {
  try {
    return JSON.parse(sessionStorage.getItem(KEYS.user) ?? 'null');
  } catch {
    return null;
  }
};

export const session = {
  getToken: () => sessionStorage.getItem(KEYS.token),
  getRefreshToken: () => sessionStorage.getItem(KEYS.refreshToken),
  getUser: readUser,

  save: ({ token, refreshToken, user }: Session) => {
    sessionStorage.setItem(KEYS.token, token);
    sessionStorage.setItem(KEYS.refreshToken, refreshToken);
    sessionStorage.setItem(KEYS.user, JSON.stringify(user));
  },

  clear: () => {
    Object.values(KEYS).forEach((key) => sessionStorage.removeItem(key));
  },
};
