import axiosConfig from '../../lib/axiosConfig';
import { get } from '../client';

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
    return get('filemanagement/get-data', {
      Module: module,
      File_Name: file_name,
      sortField,
      sortOrder,
    });
  },
  generateFileExcel: async ({
    module,
    dateFrom,
    dateTo,
    factory,
    ry = 'ALL',
    field,
    usage,
    unitWeight,
    weight,
    departure,
  }: {
    module: string;
    dateFrom: string;
    dateTo: string;
    factory: string;
    ry?: string;
    field?: string[];
    usage?: boolean;
    unitWeight?: boolean;
    weight?: boolean;
    departure?: boolean;
  }) => {
    const url = `filemanagement/generate-file-excel`;
    const res = await axiosConfig.get(url, {
      params: {
        Module: module,
        DateFrom: dateFrom,
        DateTo: dateTo,
        Factory: factory,
        RY: ry,
        Fields: field,
        Usage: usage,
        UnitWeight: unitWeight,
        Weight: weight,
        Departure: departure,
      },
      // Arrays as repeated keys (Fields=a&Fields=b), which the backend expects.
      paramsSerializer: { indexes: null },
    });
    return res.data;
  },
  downloadFile: async (id: string) => {
    const url = `filemanagement/download/${id}`;
    const res = await axiosConfig.get(url, { responseType: 'blob' });
    return res.data;
  },
  previewPayload: async ({
    module,
    dateFrom,
    dateTo,
    factory,
    ry,
    dockeyCMS,
  }: {
    module: string;
    dateFrom: string;
    dateTo: string;
    factory: string;
    ry?: string;
    dockeyCMS?: string;
  }) => {
    const url = `previewpayload/preview-excel`;
    const res = await axiosConfig.get(url, {
      params: {
        module,
        dateFrom,
        dateTo,
        factory,
        ry,
        dockeyCMS,
      },
    });
    return res.data;
  },
};

export default fileManagementApi;
