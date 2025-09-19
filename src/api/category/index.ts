import axiosConfig from '../../lib/axiosConfig';

const categoryApi = {
  getDataCat9AndCat12: async ({
    date,
    page,
  }: {
    date: string;
    page: number;
  }) => {
    const url = `cat9-and-cat12/get-data?Date=${date}&page=${page}`;
    const res = await axiosConfig.get(url);
    return res.data;
  },
};

export default categoryApi;
