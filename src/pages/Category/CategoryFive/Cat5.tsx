import { useCallback, useEffect, useRef, useState } from 'react';
import Search from '../../../components/Category/CategoryFive/Search';
import Table from '../../../components/Category/CategoryFive/Table';
import { HEADER } from '../../../types/cat5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat5, resetDataCat5 } from '../../../features/categorySlice';
import { fetchDataAutoSendCMSCat5 } from '../../../features/autosendcmsSlice';

const Cat5 = () => {
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
  const [dockey, setDockey] = useState<string>('3.6');
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

  const { cat5, page, loading, hasMore } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetDataCat5());
    dispatch(
      getDataCat5({
        dateFrom,
        dateTo,
        factory,
        page: 1,
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
    setLoadingFetch(true);
    dispatch(
      fetchDataAutoSendCMSCat5({
        dateFrom,
        dateTo,
        factory,
        dockey,
      })
    ).finally(() => setLoadingFetch(false));
  }, [dispatch, activeSort, dateFrom, dateTo, factory]);

  const onScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || !hasMore) return;
    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (bottomReached) {
      dispatch(
        getDataCat5({
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
          dockey={dockey}
          setDockey={setDockey}
          loadingFetch={loadingFetch}
          setLoadingFetch={setLoadingFetch}
        />
      </div>
      <div className="mt-4 flex min-h-[320px] min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1">
        <Table
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={cat5}
          tableRef={tableRef}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default Cat5;
