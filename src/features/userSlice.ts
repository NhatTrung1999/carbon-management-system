import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersApi from '../api/users';
import type {
  SearchPayload,
  UpdateUserPayload,
  UserPayload,
} from '../types/users';

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

export const getSearch = createAsyncThunk(
  'user/get-search',
  async (payload: SearchPayload, { rejectWithValue }) => {
    try {
      const res = await usersApi.getSearch(payload);
      return res;
    } catch (error: any) {
      return rejectWithValue('');
    }
  }
);

export const addUser = createAsyncThunk(
  'user/add-user',
  async (payload: UserPayload, { rejectWithValue }) => {
    try {
      const res = await usersApi.addUser(payload);
      // console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update-user',
  async (payload: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const res = await usersApi.updateUser(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete-user',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await usersApi.deleteUser(id);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //add
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload.data];
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //update
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //delete
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
