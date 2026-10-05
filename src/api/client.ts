import axiosConfig from '../lib/axiosConfig';

/** Rows per page for infinite-scroll lists. */
export const PAGE_SIZE = 20;

type Params = Record<string, unknown>;

export const get = async (url: string, params?: Params) =>
  (await axiosConfig.get(url, { params })).data;

/** GET a file (e.g. an Excel export) as binary data. */
export const getBlob = async (url: string, params?: Params) =>
  (await axiosConfig.get(url, { params, responseType: 'blob' })).data;

/** Uploads one file as multipart/form-data under the `file` field. */
export const uploadFile = async (url: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axiosConfig.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
