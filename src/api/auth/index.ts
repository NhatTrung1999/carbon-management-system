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
};

export default authApi;
