import axiosConfig from '../../lib/axiosConfig';

const categoryApi = {
  getData: async (
    date: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat9-and-cat12/get-data', {
      params: { date, page, limit: 20, sortField, sortOrder },
    });
    return res.data;
  },
};

export default categoryApi;
