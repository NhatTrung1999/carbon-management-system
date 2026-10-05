import axiosConfig from '../../lib/axiosConfig';

const cmsApi = {
  /** Forwards rows to the CMS integration API (via the backend). */
  createCMS: async (data: unknown) => {
    const res = await axiosConfig.post(`cms/create`, data);
    return res.data;
  },
};

export default cmsApi;
