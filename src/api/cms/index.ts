import axiosConfig from '../../lib/axiosConfig';

const cmsApi = {
  createCMS: async (data: any) => {
    const res = await axiosConfig.post(`cms/create`, data);
    return res.data;
  },
};

export default cmsApi;
