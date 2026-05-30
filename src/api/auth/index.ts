import axiosConfig from '../../lib/axiosConfig';
import type { LoginPayload } from '../../types/login';

const authApi = {
  login: ({ userid, password, factory }: LoginPayload) => {
    const url = 'auth/login';
    return axiosConfig.post(url, {
      userid,
      password,
      factory,
    });
  },
  refresh: (refreshToken: string) => {
    const url = 'auth/refresh';
    return axiosConfig.post(url, {
      refresh_token: refreshToken,
    });
  },
};

export default authApi;
