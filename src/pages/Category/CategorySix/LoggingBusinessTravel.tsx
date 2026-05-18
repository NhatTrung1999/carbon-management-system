import { useCallback, useEffect, useRef, useState } from 'react';
// import Search from '../../../components/Category/CategorySix/LoggingCat6/Search';
import { HEADER_BUSINESS_TRAVEL } from '../../../types/loggingcat6';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchLogCat6BusinessTravel,
  resetLogCat6BusinessTravel,
} from '../../../features/logcatSlice';
import Search from '../../../components/Category/CategorySix/LoggingBusinessTravel/Search';
import Table from '../../../components/Category/CategorySix/LoggingBusinessTravel/Table';

const LoggingBusinessTravel = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER_BUSINESS_TRAVEL[0].state,
    sortOrder: 'asc',
  });

  const [dateFrom, setDateFrom] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [factory, setFactory] = useState<string>('LYV');

  const { logcat6businesstravel, page, loading, hasMore } = useAppSelector(
    (state) => state.logcat
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetLogCat6BusinessTravel());
    dispatch(
      fetchLogCat6BusinessTravel({
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
        fetchLogCat6BusinessTravel({
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
    <div className="w-full">
      <div className="mt-4 overflow-x-auto">
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
      <div className="overflow-x-auto">
        <Table
          header={HEADER_BUSINESS_TRAVEL}
          tableRef={tableRef}
          data={logcat6businesstravel}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default LoggingBusinessTravel;
