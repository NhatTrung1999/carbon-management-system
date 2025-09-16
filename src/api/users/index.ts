import axiosConfig from '../../lib/axiosConfig';
import type {
  SearchPayload,
  UpdateUserPayload,
  UserPayload,
} from '../../types/users';

const usersApi = {
  getAll: async () => {
    const res = await axiosConfig.get('users');
    return res.data;
  },
  getSearch: async (payload: SearchPayload) => {
    const { userid = '', name = '' } = payload;
    const res = await axiosConfig.get(
      `users/get-search?userid=${userid}&name=${name}`
    );
    return res.data;
  },
  addUser: async (payload: UserPayload) => {
    const res = await axiosConfig.post('users/add-user', payload);
    return res.data;
  },
  updateUser: async (payload: UpdateUserPayload) => {
    console.log(payload);
    const res = await axiosConfig.patch('users/update-user', payload);
    return res.data;
  },
  deleteUser: async (id: string) => {
    await axiosConfig.delete(`users/${id}`);
  },
};

export default usersApi;
