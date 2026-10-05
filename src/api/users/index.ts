import axiosConfig from '../../lib/axiosConfig';
import { get } from '../client';
import type {
  SearchPayload,
  UpdateUserPayload,
  UserPayload,
  ModulePermissionState,
} from '../../types/users';

const usersApi = {
  getSearch: async (payload: SearchPayload) => {
    const { userid = '', name = '', sortField, sortOrder } = payload;
    return get('users/get-search', { userid, name, sortField, sortOrder });
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
  getModulePermissions: async (
    userid: string,
  ): Promise<ModulePermissionState> => {
    const res = await axiosConfig.get(
      `users/${encodeURIComponent(userid)}/module-permissions`,
    );
    return res.data;
  },
  updateModulePermissions: async (
    userid: string,
    modulePaths: string[],
    allModulePaths: string[],
    updatedAt?: string,
  ): Promise<ModulePermissionState> => {
    const res = await axiosConfig.patch(
      `users/${encodeURIComponent(userid)}/module-permissions`,
      {
        modulePaths,
        allModulePaths,
        updatedAt,
      },
    );
    return res.data;
  },
};

export default usersApi;
