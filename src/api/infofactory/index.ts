import axiosConfig from '../../lib/axiosConfig';

const infofactoryApi = {
  getInfoFactory: async ({
    companyName,
    city,
    sortField,
    sortOrder,
  }: {
    companyName: string;
    city: string;
    sortField: string;
    sortOrder: string;
  }) => {
    const url = `infofactory/get-info-factory?companyName=${companyName}&city=${city}&sortField=${sortField}&sortOrder=${sortOrder}`;
    const response = await axiosConfig.get(url);
    return response.data;
  },
};

export default infofactoryApi;
