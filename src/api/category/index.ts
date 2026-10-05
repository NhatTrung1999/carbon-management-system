import axiosConfig from '../../lib/axiosConfig';
import { get, PAGE_SIZE, uploadFile } from '../client';
import type { ListQuery, SortQuery } from '../../types/query';

export type Cat9AndCat12Query = ListQuery & { ry: string };
export type Cat6Query = ListQuery & { checkedDormShuttle: boolean };
export type Cat1AndCat4Query = ListQuery & {
  usage: boolean;
  unitWeight: boolean;
  weight: boolean;
  departure: boolean;
};

const paged = (url: string, query: ListQuery) =>
  get(url, { ...query, limit: PAGE_SIZE });

const categoryApi = {
  // ── Category lists (paged) ────────────────────────────────────────────────
  getDataCat9AndCat12: (query: Cat9AndCat12Query) =>
    paged('cat9-and-cat12/get-data-cat9-and-cat12', query),
  getDataCat5: (query: ListQuery) => paged('cat5/get-data-cat5', query),
  getDataCat7: (query: ListQuery) => paged('cat7/get-data-cat7', query),
  getDataCat6: (query: Cat6Query) => paged('cat6/get-data-cat6', query),
  getDataCat1AndCat4: (query: Cat1AndCat4Query) =>
    paged('cat1andcat4/get-data-cat1-and-cat4', query),
  getCustomExport: (query: ListQuery) => paged('cat7/custom-export', query),

  // ── Master data ───────────────────────────────────────────────────────────
  getPortCode: (sort: SortQuery) => get('cat9-and-cat12/get-port-code', sort),
  importExcelPortCode: (file: File) =>
    uploadFile('cat9-and-cat12/import-excel-port-code', file),

  getPortCodeCat1AndCat4: (sort: SortQuery) =>
    get('cat1andcat4/get-port-code', sort),
  importExcelPortCodeCat1AndCat4: (file: File) =>
    uploadFile('cat1andcat4/import-excel-port-code', file),

  getTaxFreeZoneAddress: (sort: SortQuery) =>
    get('cat1andcat4/get-tax-free-zone-address', sort),
  importExcelTaxFreeZoneAddress: (file: File) =>
    uploadFile('cat1andcat4/import-excel-tax-free-zone-address', file),
  updateTaxFreeZoneAddress: async (id: string, taxFreeZoneAddress: string) =>
    (
      await axiosConfig.patch(`cat1andcat4/tax-free-zone-address/${id}`, {
        TaxFreeZoneAddress: taxFreeZoneAddress,
      })
    ).data,

  getStyleAutoFill: (sort: SortQuery) =>
    get('cat1andcat4/get-style-auto-fill', sort),
  importExcelStyleAutoFill: (file: File) =>
    uploadFile('cat1andcat4/import-excel-style-auto-fill', file),
  deleteStyleAutoFill: async (id: string) =>
    (await axiosConfig.delete(`cat1andcat4/style-auto-fill/${id}`)).data,

  // ── Reports ───────────────────────────────────────────────────────────────
  getVerificationReport: (payload: {
    previewDateFrom: string;
    previewDateTo: string;
    loggingDateFrom: string;
    loggingDateTo: string;
    factory: string;
    category: string;
    status: string;
    page: number;
    limit: number;
  }) => get('cat1andcat4/verification-report', payload),
};

export default categoryApi;
