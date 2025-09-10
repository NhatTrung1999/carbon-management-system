import axiosConfig from '../../lib/axiosConfig';

const usersApi = {
  getAll: async () => {
    const res = await axiosConfig.get('users');
    return res.data;
  },
};

export default usersApi;
