import axiosConfig from '../../lib/axiosConfig';
import { get, getBlob, PAGE_SIZE } from '../client';
import type {
  ILogCat1AndCat4Payload,
  ILogCat5Payload,
  ILogCat9AndCat12Payload,
} from '../../types/loggingcms';
import type { ILogCat7Payload } from '../../types/loggingcat7';
import type { DateFactoryFilter, ListQuery } from '../../types/query';

const post = async (url: string, data: unknown) =>
  (await axiosConfig.post(url, data)).data;

const paged = (url: string, query: ListQuery) =>
  get(url, { ...query, limit: PAGE_SIZE });

const logcatApi = {
  // ── Write logs (after sending to CMS; bodies are arrays of rows) ─────────────────────────────────────
  createLogCat1AndCat4: (data: ILogCat1AndCat4Payload[]) =>
    post('logcat/create-log-cat1-4', data),
  createLogCat5: (data: ILogCat5Payload[]) =>
    post('logcat/create-log-cat5', data),
  createLogCat6BusinessTravel: (data: object[]) =>
    post('logcat/create-log-cat6-business-travel', data),
  createLogCat6Accommodation: (data: object[]) =>
    post('logcat/create-log-cat6-accommodation', data),
  createLogCat7: (data: ILogCat7Payload[]) =>
    post('logcat/create-log-cat7', data),
  createLogCat9AndCat12: (data: ILogCat9AndCat12Payload[]) =>
    post('logcat/create-log-cat9-12', data),

  // ── Read logs (paged) ─────────────────────────────────────────────────────
  fetchLogCat1AndCat4: (query: ListQuery) =>
    paged('logcat/get-log-cat1-4', query),
  fetchLogCat5: (query: ListQuery) => paged('logcat/get-log-cat5', query),
  fetchLogCat6BusinessTravel: (query: ListQuery) =>
    paged('logcat/get-log-cat6-business-travel', query),
  fetchLogCat6Accommodation: (query: ListQuery) =>
    paged('logcat/get-log-cat6-accommodation', query),
  fetchLogCat7: (query: ListQuery) => paged('logcat/get-log-cat7', query),
  fetchLogCat9AndCat12: (query: ListQuery) =>
    paged('logcat/get-log-cat9-12', query),

  // ── Excel exports ─────────────────────────────────────────────────────────
  exportExcelCat1And4: (filter: DateFactoryFilter) =>
    getBlob('logcat/export-excel-cat1-4', filter),
  exportExcelCat5: (filter: DateFactoryFilter) =>
    getBlob('logcat/export-excel-cat5', filter),
  exportExcelCat7: (filter: DateFactoryFilter) =>
    getBlob('logcat/export-excel-cat7', filter),
  exportExcelCat9And12: (filter: DateFactoryFilter) =>
    getBlob('logcat/export-excel-cat9-12', filter),
};

export default logcatApi;
