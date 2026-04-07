import axiosConfig from '../../lib/axiosConfig';

const defaultAddressApi = {
  getDefaultAddress: async (sortField: string, sortOrder: string) => {
    const res = await axiosConfig.get('defaultaddress/get-default-address', {
      params: { sortField, sortOrder },
    });
    return res.data;
  },
  updateDefaultAddress: async (id: string, defaultAddress: string) => {
    const response = await axiosConfig.patch(
      `defaultaddress/update-default-address/${id}`,
      {
        DefaultAddress: defaultAddress,
      }
    );
    return response.data;
  },
  deleteDefaultAddress: async (id: string) => {
    const response = await axiosConfig.delete(
      `defaultaddress/delete-default-address/${id}`
    );
    return response.data;
  },
  importExcelDefaultAddress: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosConfig.post(
      'defaultaddress/import-excel-default-address',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },
  syncDefaultAddress: async (factory: string, defaultAddress: string) => {
    const response = await axiosConfig.post(
      'defaultaddress/sync-default-address',
      {
        factory,
        syncDefaultAddress: defaultAddress,
      }
    );
    return response.data;
  },
};

export default defaultAddressApi;
