import { get } from '../client';
import type { DateFactoryFilter } from '../../types/query';

// Rows prepared by the backend in the shape CMS expects, per category.

export type CMSQuery = DateFactoryFilter & { dockey: string };
export type CMSQueryCat9AndCat12 = CMSQuery & { ry: string };

const autosendcmsApi = {
  getCat1AndCat4: (query: CMSQuery) => get('cat1andcat4/auto-sent-cms', query),
  getCat5: (query: CMSQuery) => get('cat5/auto-sent-cms', query),
  getCat6: (query: DateFactoryFilter) => get('cat6/auto-sent-cms', query),
  getCat6Accommodation: (query: DateFactoryFilter) =>
    get('cat6/auto-sent-cms-accommodation', query),
  getCat7: (query: DateFactoryFilter) => get('cat7/auto-sent-cms', query),
  getCat9AndCat12: (query: CMSQueryCat9AndCat12) =>
    get('cat9-and-cat12/auto-sent-cms', query),
};

export default autosendcmsApi;
