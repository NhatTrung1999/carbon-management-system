import axiosConfig from '../../lib/axiosConfig';

const categoryApi = {
  getDataCat9AndCat12: async (
    date: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get(
      'cat9-and-cat12/get-data-cat9-and-cat12',
      {
        params: { date, page, limit: 20, sortField, sortOrder },
      }
    );
    return res.data;
  },
  getDataCat5: async (
    date: string,
    page: number,
    sortField: string,
    sortOrder: string
  ) => {
    const res = await axiosConfig.get('cat5/get-data-cat5', {
      params: { date, page, limit: 20, sortField, sortOrder },
    });
    return res.data;
  },
};

export default categoryApi;
