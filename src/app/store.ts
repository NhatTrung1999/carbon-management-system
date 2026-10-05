import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import categoryReducer from '../features/categorySlice';
import fileReducer from '../features/fileSlice';
import infofactoryReducer from '../features/infofactorySlice';
import hrmoduleReducer from '../features/hrmoduleSlice';
import autosendcmsReducer from '../features/autosendcmsSlice';
import logcatReducer from '../features/logcatSlice';
import defaultaddressReducer from '../features/defaultaddressSlice';
import masterDataReducer from '../features/masterDataSlice';
import { loadErrorToast } from './loadErrorToast';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    masterData: masterDataReducer,
    file: fileReducer,
    infofactory: infofactoryReducer,
    hrmodule: hrmoduleReducer,
    autosendcms: autosendcmsReducer,
    logcat: logcatReducer,
    defaultaddress: defaultaddressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(loadErrorToast.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
