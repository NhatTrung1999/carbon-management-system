import { isFulfilled } from '@reduxjs/toolkit';
import { Toast } from './Toast';
import i18n from '../i18n';

type ThunkAction = { type: string; payload?: unknown };
type StatusResponse = { statusCode: number; message: string };

/** Error text from a rejected thunk payload, which may be a string or an error object. */
const errorMessage = (payload: unknown) => {
  if (typeof payload === 'string' && payload) return payload;
  if (payload && typeof payload === 'object' && 'message' in payload) {
    return String((payload as { message: unknown }).message);
  }
  return i18n.t('common.error');
};

/** Toast options for a thunk result: the API's message on success, the error otherwise. */
export const resultToastOptions = (action: ThunkAction) => {
  const ok = isFulfilled(action);
  return {
    icon: ok ? ('success' as const) : ('error' as const),
    title: ok
      ? (action.payload as { message: string }).message
      : errorMessage(action.payload),
  };
};

/** Toast options for a create-log thunk, whose API replies `{ success, message }`. */
export const logResultToastOptions = (action: ThunkAction) => {
  if (!isFulfilled(action)) {
    return { icon: 'error' as const, title: errorMessage(action.payload) };
  }
  const { success, message } = action.payload as {
    success: boolean;
    message: string;
  };
  return {
    icon: success ? ('success' as const) : ('error' as const),
    title: message,
  };
};

/** Shows a success/error toast for a dispatched thunk result. */
export const toastResult = (action: ThunkAction) =>
  Toast.fire(resultToastOptions(action));

/** Shows a toast for API responses shaped `{ statusCode, message }`. */
export const toastStatus = (payload: unknown) => {
  const { statusCode, message } = payload as StatusResponse;
  return Toast.fire({
    title: message,
    icon: statusCode === 200 ? 'success' : 'error',
  });
};
