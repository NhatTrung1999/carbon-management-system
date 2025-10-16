import axiosConfig from '../../lib/axiosConfig';

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
  }: {
    module: string;
    dateFrom: string;
    dateTo: string;
    factory: string;
  }) => {
    const url = `filemanagement/generate-file-excel?Module=${module}&DateFrom=${dateFrom}&DateTo=${dateTo}&Factory=${factory}`;
    const res = await axiosConfig.get(url);
    return res.data;
  },
  downloadFile: async (id: string) => {
    const url = `filemanagement/download/${id}`;
    const res = await axiosConfig.get(url, { responseType: 'blob' });
    return res.data;
  },
};

export default fileManagementApi;
