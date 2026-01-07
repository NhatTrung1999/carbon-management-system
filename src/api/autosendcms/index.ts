import axiosConfig from '../../lib/axiosConfig';

const autosendcmsApi = {
  // Auto Sent CMS
  autoSentCMSCat5: async (payload: {
    dateFrom: string;
    dateTo: string;
    factory: string;
  }) => {
    const res = await axiosConfig.get(`cat5/auto-sent-cms`, {
      params: {
        ...payload,
      },
    });
    return res.data;
  },
};

export default autosendcmsApi;
