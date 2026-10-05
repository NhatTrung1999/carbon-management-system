import axiosConfig from '../../lib/axiosConfig';
import { get, uploadFile } from '../client';
import type { SortQuery } from '../../types/query';

const defaultAddressApi = {
  getDefaultAddress: (sort: SortQuery) =>
    get('defaultaddress/get-default-address', sort),
  updateDefaultAddress: async (id: string, defaultAddress: string) =>
    (
      await axiosConfig.patch(`defaultaddress/update-default-address/${id}`, {
        DefaultAddress: defaultAddress,
      })
    ).data,
  deleteDefaultAddress: async (id: string) =>
    (await axiosConfig.delete(`defaultaddress/delete-default-address/${id}`))
      .data,
  importExcelDefaultAddress: (file: File) =>
    uploadFile('defaultaddress/import-excel-default-address', file),
  /** Copies a factory's default address to its employees in HRIS. */
  syncDefaultAddress: async (factory: string, defaultAddress: string) =>
    (
      await axiosConfig.post('defaultaddress/sync-default-address', {
        factory,
        syncDefaultAddress: defaultAddress,
      })
    ).data,
};

export default defaultAddressApi;
