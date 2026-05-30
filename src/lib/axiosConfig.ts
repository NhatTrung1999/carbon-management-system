import axios from 'axios';
import {apiConfig} from './apiConfig';
import storage from '../utils/storage';

const axiosConfig = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1800000,
});

axiosConfig.interceptors.request.use(
  function (config) {
    const accessToken = storage.get<string>('token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('auth/login') &&
      !originalRequest.url?.includes('auth/refresh')
    ) {
      originalRequest._retry = true;

      const refreshToken = storage.get<string>('refreshToken');

      if (refreshToken) {
        try {
          const refreshUrl = `${apiConfig.baseUrl.replace(/\/?$/, '/')}auth/refresh`;
          const { data } = await axios.post(
            refreshUrl,
            { refresh_token: refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          );

          sessionStorage.setItem('token', data.access_token);
          sessionStorage.setItem('refreshToken', data.refresh_token);
          sessionStorage.setItem('user', JSON.stringify(data.payload));

          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return axiosConfig(originalRequest);
        } catch {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('refreshToken');
          sessionStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosConfig
