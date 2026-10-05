import { useCallback, useEffect, useRef, useState } from 'react';
import type { SortState } from '../types/table';

type Options = {
  initialSort: SortState;
  page: number;
  loading: boolean;
  hasMore: boolean;
  /** Clears the list before loading page 1. */
  reset: () => void;
  /** Dispatches the fetch for one page, using the page's current filters. */
  fetchPage: (page: number, sort: SortState) => void;
  /** Runs once after the very first load (e.g. prefetching CMS data). */
  onFirstLoad?: () => void;
};

const SCROLL_THRESHOLD_PX = 20;

/**
 * Infinite-scroll list driven by server-side sorting.
 * Loads page 1 on mount and whenever the sort changes; filters reload through
 * the page's Search submit. Callbacks are read through a ref, so they always
 * see the latest filters without being listed as dependencies.
 */
export const useInfiniteList = ({
  initialSort,
  page,
  loading,
  hasMore,
  reset,
  fetchPage,
  onFirstLoad,
}: Options) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [activeSort, setActiveSort] = useState<SortState>(initialSort);

  const callbacks = useRef({ reset, fetchPage, onFirstLoad });
  useEffect(() => {
    callbacks.current = { reset, fetchPage, onFirstLoad };
  });

  // Guards against StrictMode's double effect run and repeated sort values.
  const lastSortKey = useRef('');
  useEffect(() => {
    const sortKey = `${activeSort.sortField}|${activeSort.sortOrder}`;
    if (lastSortKey.current === sortKey) return;
    const isFirstLoad = lastSortKey.current === '';
    lastSortKey.current = sortKey;

    callbacks.current.reset();
    callbacks.current.fetchPage(1, activeSort);
    if (isFirstLoad) callbacks.current.onFirstLoad?.();
  }, [activeSort]);

  const onScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || !hasMore) return;
    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - SCROLL_THRESHOLD_PX;
    if (bottomReached) callbacks.current.fetchPage(page, activeSort);
  }, [loading, hasMore, page, activeSort]);

  return { tableRef, activeSort, setActiveSort, onScroll };
};
