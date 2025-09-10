import axios from 'axios';
import apiConfig from './apiConfig';
import storage from '../utils/storage';

const axiosConfig = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  function (config) {
    const accessToken: { accessToken: string } = {
      accessToken: storage.get('token'),
    };

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
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
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig