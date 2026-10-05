import axiosConfig from '../../lib/axiosConfig';
import type { LoginPayload } from '../../types/login';

// Token refresh is handled by the axios interceptor in lib/axiosConfig.
const authApi = {
  login: (payload: LoginPayload) => axiosConfig.post('auth/login', payload),
};

export default authApi;
