export type SortQuery = { sortField: string; sortOrder: string };

/** Date range + factory filter used by most category screens. */
export type DateFactoryFilter = {
  dateFrom: string;
  dateTo: string;
  factory: string;
};

/** One page of a date/factory list, sorted on the server. */
export type ListQuery = DateFactoryFilter & SortQuery & { page: number };

export type PagedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};
