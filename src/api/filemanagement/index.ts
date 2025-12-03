import axiosConfig from '../../lib/axiosConfig';
import qs from 'qs';

const fileManagementApi = {
  getData: async ({
    module,
    file_name,
    sortField,
    sortOrder,
  }: {
    module: string;
    file_name: string;
    sortField: string;
    sortOrder: string;
  }) => {
    const url = `filemanagement/get-data?Module=${module}&File_Name=${file_name}&sortField=${sortField}&sortOrder=${sortOrder}`;
    const res = await axiosConfig.get(url);
    return res.data;
  },
  generateFileExcel: async ({
    module,
    dateFrom,
    dateTo,
    factory,
    field,
  }: {
    module: string;
    dateFrom: string;
    dateTo: string;
    factory: string;
    field?: string[];
  }) => {
    // console.log(field);
    const url = `filemanagement/generate-file-excel`;
    const res = await axiosConfig.get(url, {
      params: {
        Module: module,
        DateFrom: dateFrom,
        DateTo: dateTo,
        Factory: factory,
        Fields: field,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return res.data;
  },
  downloadFile: async (id: string) => {
    const url = `filemanagement/download/${id}`;
    const res = await axiosConfig.get(url, { responseType: 'blob' });
    return res.data;
  },
};

export default fileManagementApi;
