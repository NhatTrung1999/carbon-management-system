import { useCallback, useEffect, useRef, useState } from 'react';
// import Search from '../../../components/Category/CategoryOneAndCategoryFour/LoggingCat1AndCat4/Search';
import Table from '../../../components/Category/CategoryOneAndCategoryFour/LoggingCat1AndCat4/Table';
import { HEADER } from '../../../types/loggingcat1and4';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchLogCat1AndCat4,
  resetLogCat1And4,
} from '../../../features/logcatSlice';
import Search from '../../../components/Category/CategoryOneAndCategoryFour/LoggingCat1AndCat4/Search';

const Logging = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  const [dateFrom, setDateFrom] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [factory, setFactory] = useState<string>('LYV');

  const { logcat1and4, page, loading, hasMore } = useAppSelector(
    (state) => state.logcat
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetLogCat1And4());
    dispatch(
      fetchLogCat1AndCat4({
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
        fetchLogCat1AndCat4({
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
          header={HEADER}
          tableRef={tableRef}
          data={logcat1and4}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default Logging;
