import axiosConfig from '../../lib/axiosConfig';

const autosendcmsApi = {
  // Auto Sent CMS
  fetchDataAutoSentCMSCat1AndCat4: async (payload: {
    dateFrom: string;
    dateTo: string;
    factory: string;
  }) => {
    const res = await axiosConfig.get(`cat1andcat4/auto-sent-cms`, {
      params: {
        ...payload,
      },
    });
    return res.data;
  },
  fetchDataAutoSentCMSCat5: async (payload: {
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
  fetchDataAutoSentCMSCat6: async (payload: {
    dateFrom: string;
    dateTo: string;
    factory: string;
  }) => {
    const res = await axiosConfig.get(`cat6/auto-sent-cms`, {
      params: {
        ...payload,
      },
    });
    return res.data;
  },
  fetchDataAutoSentCMSCat7: async (payload: {
    dateFrom: string;
    dateTo: string;
    factory: string;
  }) => {
    const res = await axiosConfig.get(`cat7/auto-sent-cms`, {
      params: {
        ...payload,
      },
    });
    return res.data;
  },
  fetchDataAutoSentCMSCat9AndCat12: async (payload: {
    dateFrom: string;
    dateTo: string;
    factory: string;
  }) => {
    const res = await axiosConfig.get(`cat9-and-cat12/auto-sent-cms`, {
      params: {
        ...payload,
      },
    });
    return res.data;
  },
};

export default autosendcmsApi;
