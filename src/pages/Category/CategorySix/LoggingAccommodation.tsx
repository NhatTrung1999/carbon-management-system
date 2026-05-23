import { useCallback, useEffect, useRef, useState } from 'react';
// import Search from '../../../components/Category/CategorySix/LoggingCat6/Search';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchLogCat6Accommodation,
  resetLogCat6Accommodation,
} from '../../../features/logcatSlice';
import Search from '../../../components/Category/CategorySix/LoggingAccommodation/Search';
import Table from '../../../components/Category/CategorySix/LoggingAccommodation/Table';
import { HEADER_ACCOMMODATION } from '../../../types/loggingcat6';

const LoggingAccommodation = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER_ACCOMMODATION[0].state,
    sortOrder: 'asc',
  });

  const [dateFrom, setDateFrom] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [factory, setFactory] = useState<string>('LYV');

  const { logcat6accommodation, page, loading, hasMore } = useAppSelector(
    (state) => state.logcat
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetLogCat6Accommodation());
    dispatch(
      fetchLogCat6Accommodation({
        dateFrom,
        dateTo,
        factory,
        page: 1,
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [dispatch, activeSort, dateFrom, dateTo, factory]);

  const onScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || !hasMore) return;
    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (bottomReached) {
      dispatch(
        fetchLogCat6Accommodation({
          dateFrom,
          dateTo,
          factory,
          page,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        })
      );
    }
  }, [dispatch, loading, hasMore, page, activeSort, dateFrom, dateTo, factory]);

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0">
      <div className="shrink-0 min-w-0 overflow-x-auto">
        <Search
          activeSort={activeSort}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          factory={factory}
          setFactory={setFactory}
        />
      </div>
      <div className="mt-4 flex min-h-[320px] min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1">
        <Table
          header={HEADER_ACCOMMODATION}
          tableRef={tableRef}
          data={logcat6accommodation}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default LoggingAccommodation;
