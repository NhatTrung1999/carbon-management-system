import axiosConfig from '../../lib/axiosConfig';
import type { ILogCat5Payload } from '../../types/loggingcat5';
import type { ILogCat9AndCat12Payload } from '../../types/loggingcat9and12';

const logcatApi = {
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
};

export default logcatApi;
