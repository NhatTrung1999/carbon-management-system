import axiosConfig from '../../lib/axiosConfig';
import type {
  SearchPayload,
  UpdateUserPayload,
  UserPayload,
} from '../../types/users';

const usersApi = {
  getSearch: async (payload: SearchPayload) => {
    const { userid = '', name = '', sortField, sortOrder } = payload;
    const res = await axiosConfig.get(
      `users/get-search?userid=${userid}&name=${name}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
    return res.data;
  },
  addUser: async (payload: UserPayload) => {
    const res = await axiosConfig.post('users/add-user', payload);
    return res.data;
  },
  updateUser: async (payload: UpdateUserPayload) => {
    const res = await axiosConfig.patch('users/update-user', payload);
    return res.data;
  },
  deleteUser: async (id: string) => {
    const res = await axiosConfig.delete(`users/${id}`);
    return res.data;
  },
};

export default usersApi;
