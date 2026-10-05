import { get } from '../client';

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
    return get('infofactory/get-info-factory', {
      companyName,
      city,
      sortField,
      sortOrder,
    });
  },
};

export default infofactoryApi;
