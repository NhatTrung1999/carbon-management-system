import axiosConfig from '../../lib/axiosConfig';

const categoryApi = {
  getDataCat9AndCat12: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get(
      'cat9-and-cat12/get-data-cat9-and-cat12',
      {
        params: {
          dateFrom,
          dateTo,
          factory,
          page,
          limit: 20,
          sortField,
          sortOrder,
        },
      }
    );
    return res.data;
  },
  getDataCat5: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat5/get-data-cat5', {
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
  getDataCat7: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat7/get-data-cat7', {
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
  getDataCat6: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat6/get-data-cat6', {
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
  getDataCat1AndCat4: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat1andcat4/get-data-cat1-and-cat4', {
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
  getPortCode: async (sortField: string, sortOrder: string) => {
    const res = await axiosConfig.get('cat9-and-cat12/get-port-code', {
      params: { sortField, sortOrder },
    });
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
