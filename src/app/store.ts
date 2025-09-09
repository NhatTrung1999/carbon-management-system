import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import userManagementReducer from '../features/userManagementSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userManagement: userManagementReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
