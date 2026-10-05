import { createListenerMiddleware, isRejected } from '@reduxjs/toolkit';
import i18n from '../i18n';
import {
  fetchDataAutoSendCMSCat1AndCat4,
  fetchDataAutoSendCMSCat5,
  fetchDataAutoSendCMSCat6,
  fetchDataAutoSendCMSCat6Accommodation,
  fetchDataAutoSendCMSCat7,
  fetchDataAutoSendCMSCat9AndCat12,
} from '../features/autosendcmsSlice';
import {
  getCustomExport,
  getDataCat1AndCat4,
  getDataCat5,
  getDataCat6,
  getDataCat7,
  getDataCat9AndCat12,
} from '../features/categorySlice';
import { getDefaultAddress } from '../features/defaultaddressSlice';
import { getData } from '../features/fileSlice';
import {
  fetchDepartmentHRModule,
  fetchHRModule,
} from '../features/hrmoduleSlice';
import { getInfoFactory } from '../features/infofactorySlice';
import {
  fetchLogCat1AndCat4,
  fetchLogCat5,
  fetchLogCat6Accommodation,
  fetchLogCat6BusinessTravel,
  fetchLogCat7,
  fetchLogCat9AndCat12,
} from '../features/logcatSlice';
import {
  getPortCode,
  getPortCodeCat1AndCat4,
  getStyleAutoFill,
  getTaxFreeZoneAddress,
} from '../features/masterDataSlice';
import { getSearch } from '../features/userSlice';

/**
 * Thunks that only load data. Pages show nothing when they fail, so this
 * listener tells the user why the table stayed empty. Write thunks (create,
 * update, delete, import, ...) are left out: their callers already toast.
 */
const isLoadFailure = isRejected(
  fetchDataAutoSendCMSCat1AndCat4,
  fetchDataAutoSendCMSCat5,
  fetchDataAutoSendCMSCat6,
  fetchDataAutoSendCMSCat6Accommodation,
  fetchDataAutoSendCMSCat7,
  fetchDataAutoSendCMSCat9AndCat12,
  getDataCat1AndCat4,
  getDataCat5,
  getDataCat6,
  getDataCat7,
  getDataCat9AndCat12,
  getCustomExport,
  getDefaultAddress,
  getData,
  fetchHRModule,
  fetchDepartmentHRModule,
  getInfoFactory,
  fetchLogCat1AndCat4,
  fetchLogCat5,
  fetchLogCat6BusinessTravel,
  fetchLogCat6Accommodation,
  fetchLogCat7,
  fetchLogCat9AndCat12,
  getPortCode,
  getPortCodeCat1AndCat4,
  getStyleAutoFill,
  getTaxFreeZoneAddress,
  getSearch,
);

export const loadErrorToast = createListenerMiddleware();

// Some pages load the same list twice at once; show one toast, not two.
const DEDUPE_MS = 2000;
let lastToast = { reason: '', at: 0 };

loadErrorToast.startListening({
  matcher: isLoadFailure,
  effect: async (action, api) => {
    if (action.meta.aborted || action.meta.condition) return;
    // Signed out (e.g. the session expired): the app is going back to login.
    const { auth } = api.getState() as { auth: { token: string | null } };
    if (!auth.token) return;

    const reason =
      (typeof action.payload === 'string'
        ? action.payload
        : action.error.message) ?? '';
    const now = Date.now();
    if (reason === lastToast.reason && now - lastToast.at < DEDUPE_MS) return;
    lastToast = { reason, at: now };

    // Loaded lazily so sweetalert2 stays out of the entry chunk.
    const { Toast } = await import('../utils/Toast');
    Toast.fire({
      icon: 'error',
      title: i18n.t('common.load_failed'),
      text: reason,
    });
  },
});
