import axios from 'axios';
import { apiCmsConfig } from './apiConfig';

const axiosCmsConfig = axios.create({
  baseURL: apiCmsConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1800000,
});

export default axiosCmsConfig;
