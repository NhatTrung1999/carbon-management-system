import axiosConfig from '../../lib/axiosConfig';
import type { ILogCat1AndCat4Payload } from '../../types/cat1andcat4';
import type { ILogCat5Payload } from '../../types/loggingcat5';
import type { ILogCat7Payload } from '../../types/loggingcat7';
import type { ILogCat9AndCat12Payload } from '../../types/loggingcat9and12';

const logcatApi = {
  createLogCat1AndCat4: async (data: ILogCat1AndCat4Payload) => {
    const response = await axiosConfig.post(`logcat/create-log-cat1-4`, data);
    return response.data;
  },
  fetchLogCat1AndCat4: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('logcat/get-log-cat1-4', {
      params: {
        dateFrom,
        dateTo,
        factory,
        page,
        limit: 20,
        sortField,
        sortOrder,
      },
    });

    return res.data;
  },
  createLogCat5: async (data: ILogCat5Payload) => {
    const response = await axiosConfig.post(`logcat/create-log-cat5`, data);
    return response.data;
  },
  fetchLogCat5: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('logcat/get-log-cat5', {
      params: {
        dateFrom,
        dateTo,
        factory,
        page,
        limit: 20,
        sortField,
        sortOrder,
      },
    });

    return res.data;
  },
  createLogCat7: async (data: ILogCat7Payload) => {
    const response = await axiosConfig.post(`logcat/create-log-cat7`, data);
    return response.data;
  },
  fetchLogCat7: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('logcat/get-log-cat7', {
      params: {
        dateFrom,
        dateTo,
        factory,
        page,
        limit: 20,
        sortField,
        sortOrder,
      },
    });

    return res.data;
  },
  createLogCat9AndCat12: async (data: ILogCat9AndCat12Payload) => {
    const response = await axiosConfig.post(`logcat/create-log-cat9-12`, data);
    return response.data;
  },
  fetchLogCat9AndCat12: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('logcat/get-log-cat9-12', {
      params: {
        dateFrom,
        dateTo,
        factory,
        page,
        limit: 20,
        sortField,
        sortOrder,
      },
    });

    return res.data;
  },
  exportExcelCat5: async (
    dateFrom: string,
    dateTo: string,
    factory: string
  ) => {
    const res = await axiosConfig.get('logcat/export-excel-cat5', {
      params: {
        dateFrom,
        dateTo,
        factory,
      },
      responseType: 'blob',
    });

    return res.data;
  },
};

export default logcatApi;
