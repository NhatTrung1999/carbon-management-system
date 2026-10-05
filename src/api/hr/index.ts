import axiosConfig from '../../lib/axiosConfig';
import { get, getBlob, PAGE_SIZE, uploadFile } from '../client';
import type { SortQuery } from '../../types/query';

export type HRFilter = {
  dateFrom: string;
  dateTo: string;
  fullName: string;
  id: string;
  department: string;
  joinDateFrom: string;
  joinDateTo: string;
};

export type HRQuery = HRFilter & SortQuery & { page: number };

const hrApi = {
  fetchHRModule: (query: HRQuery) => get('hr', { ...query, limit: PAGE_SIZE }),
  fetchDepartmentHRModule: () => get('hr/department'),
  updateHRModule: async (
    id: string,
    currentAddress: string,
    transportationMethod: string,
  ) =>
    (
      await axiosConfig.patch(`hr/${id}`, {
        CurrentAddress: currentAddress,
        TransportationMethod: transportationMethod,
      })
    ).data,
  importFromExcel: (file: File) => uploadFile('hr/import', file),
  exportToExcel: (filter: HRFilter) => getBlob('hr/export', filter),
};

export default hrApi;
