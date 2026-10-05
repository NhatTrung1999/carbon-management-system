import { createSlice } from '@reduxjs/toolkit';
import usersApi from '../api/users';
import type {
  IUserManagement,
  SearchPayload,
  UpdateUserPayload,
  UserPayload,
} from '../types/users';
import { addLoadingMatchers, createApiThunk } from './helpers';

type UserResponse<T> = { statusCode: number; message: string; data: T };

interface UserState {
  users: IUserManagement[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const getSearch = createApiThunk<IUserManagement[], SearchPayload>(
  'user/get-search',
  usersApi.getSearch,
);

export const addUser = createApiThunk<
  UserResponse<IUserManagement>,
  UserPayload
>('user/add-user', usersApi.addUser, 'Add failed!');

// Update and delete reply with the whole user list.
export const updateUser = createApiThunk<
  UserResponse<IUserManagement[]>,
  UpdateUserPayload
>('user/update-user', usersApi.updateUser, 'Update failed!');

export const deleteUser = createApiThunk<
  UserResponse<IUserManagement[]>,
  string
>('user/delete-user', usersApi.deleteUser, 'Delete failed!');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearch.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = action.payload.data;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = action.payload.data;
      });

    addLoadingMatchers(builder, getSearch, addUser, updateUser, deleteUser);
  },
});

export default userSlice.reducer;
