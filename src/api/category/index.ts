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
    usage: boolean,
    unitWeight: boolean,
    weight: boolean,
    departure: boolean,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat1andcat4/get-data-cat1-and-cat4', {
      params: {
        dateFrom,
        dateTo,
        factory,
        usage,
        unitWeight,
        weight,
        departure,
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
  getPortCodeCat1AndCat4: async (sortField: string, sortOrder: string) => {
    const res = await axiosConfig.get('cat1andcat4/get-port-code', {
      params: { sortField, sortOrder },
    });
    return res.data;
  },
  getTaxFreeZoneAddress: async (sortField: string, sortOrder: string) => {
    const res = await axiosConfig.get('cat1andcat4/get-tax-free-zone-address', {
      params: { sortField, sortOrder },
    });
    return res.data;
  },
  getStyleAutoFill: async (sortField: string, sortOrder: string) => {
    const res = await axiosConfig.get('cat1andcat4/get-style-auto-fill', {
      params: { sortField, sortOrder },
    });
    return res.data;
  },
  importExcelStyleAutoFill: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosConfig.post(
      'cat1andcat4/import-excel-style-auto-fill',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },
  deleteStyleAutoFill: async (id: string) => {
    const response = await axiosConfig.delete(`cat1andcat4/style-auto-fill/${id}`);
    return response.data;
  },
  updateTaxFreeZoneAddress: async (id: string, taxFreeZoneAddress: string) => {
    const response = await axiosConfig.patch(
      `cat1andcat4/tax-free-zone-address/${id}`,
      {
        TaxFreeZoneAddress: taxFreeZoneAddress,
      }
    );
    return response.data;
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
  importExcelPortCodeCat1AndCat4: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosConfig.post(
      'cat1andcat4/import-excel-port-code',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },
  importExcelTaxFreeZoneAddress: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosConfig.post(
      'cat1andcat4/import-excel-tax-free-zone-address',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },
  getCustomExport: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat7/custom-export', {
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
  exportExportPreviewPayload: async (
    dateFrom: string,
    dateTo: string,
    factory: string,
    dockey: string
  ) => {
    const res = await axiosConfig.get('cat1andcat4/export-preview-payload', {
      params: {
        dateFrom,
        dateTo,
        factory,
        dockey,
      },
      responseType: 'blob',
    });

    return res.data;
  },
  getVerificationReport: async (payload: {
    previewDateFrom: string;
    previewDateTo: string;
    loggingDateFrom: string;
    loggingDateTo: string;
    factory: string;
    category: string;
    status: string;
    page: number;
    limit: number;
  }) => {
    const res = await axiosConfig.get('cat1andcat4/verification-report', {
      params: payload,
    });

    return res.data;
  },
};

export default categoryApi;
