import { useCallback, useEffect, useRef, useState } from 'react';
import Table from '../../../components/Category/CategoryFive/LoggingCat5/Table';
import { HEADER } from '../../../types/loggingcat5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchLogCat5, resetLogCat5 } from '../../../features/logcatSlice';

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

  const { logcat5, page, loading, hasMore } = useAppSelector(
    (state) => state.logcat
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetLogCat5());
    dispatch(
      fetchLogCat5({
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
        fetchLogCat5({
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
  // console.log(setDateFrom, setDateTo, setFactory);

  return (
    <div className="w-full">
      {/* <div className="mt-4 overflow-x-auto">
        <Search
          activeSort={activeSort}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          factory={factory}
          setFactory={setFactory}
        />
      </div> */}
      <div className="overflow-x-auto">
        <Table
          header={HEADER}
          tableRef={tableRef}
          data={logcat5}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default Logging;