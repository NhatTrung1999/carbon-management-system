import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import categoryReducer from '../features/categorySlice';
import fileReducer from '../features/fileSlice';
import infofactoryReducer from '../features/infofactorySlice';
import hrmoduleReducer from '../features/hrmoduleSlice';
import autosendcmsReducer from '../features/autosendcmsSlice';
import logcatReducer from '../features/logcatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    file: fileReducer,
    infofactory: infofactoryReducer,
    hrmodule: hrmoduleReducer,
    autosendcms: autosendcmsReducer,
    logcat: logcatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
