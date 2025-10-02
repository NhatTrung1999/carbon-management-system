import axiosConfig from '../../lib/axiosConfig';

const categoryApi = {
  getDataCat9AndCat12: async (
    date: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get(
      'cat9-and-cat12/get-data-cat9-and-cat12',
      {
        params: { date, page, limit: 20, sortField, sortOrder },
      }
    );
    return res.data;
  },
  getDataCat5: async (
    date: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat5/get-data-cat5', {
      params: { date, page, limit: 20, sortField, sortOrder },
    });
    return res.data;
  },
  getPortCode: async () => {
    const res = await axiosConfig.get('cat9-and-cat12/get-port-code');
    return res.data;
  },
  importExcelPortCode: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosConfig.post(
      'cat9-and-cat12/import-excel-port-code',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },
};

export default categoryApi;
