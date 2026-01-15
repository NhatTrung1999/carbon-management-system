import axiosConfig from '../../lib/axiosConfig';

const hrModuleAPi = {
  fetchHRModule: async (
    dateFrom: string,
    dateTo: string,
    fullName: string,
    id: string,
    department: string,
    joinDate: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const url = `hr`;
    const res = await axiosConfig.get(url, {
      params: {
        dateFrom,
        dateTo,
        fullName,
        id,
        department,
        joinDate,
        page,
        limit: 20,
        sortField,
        sortOrder,
      },
    });
    return res.data;
  },
  fetchDepartmentHRModule: async () => {
    const url = `hr/department`;
    const res = await axiosConfig.get(url);
    return res.data;
  },
  updateHRModule: async (
    id: string,
    currentAddress: string,
    transportationMethod: string
  ) => {
    const response = await axiosConfig.patch(`hr/${id}`, {
      CurrentAddress: currentAddress,
      TransportationMethod: transportationMethod,
    });
    return response.data;
  },
  importFromExcel: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosConfig.post('hr/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  exportToExcel: async (
    dateFrom: string,
    dateTo: string,
    fullName: string,
    id: string,
    department: string,
    joinDate: string
  ) => {
    const response = await axiosConfig.get('hr/export', {
      params: {
        dateFrom,
        dateTo,
        fullName,
        id,
        department,
        joinDate,
      },
      responseType: 'blob',
    });
    return response.data;
  },
};

export default hrModuleAPi;
