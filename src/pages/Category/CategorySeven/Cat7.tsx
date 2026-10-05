import { useState } from 'react';
import Search from '../../../components/Category/CategorySeven/Search';
import Table from '../../../components/Category/CategorySeven/Table';
import { HEADER } from '../../../types/cat7';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat7, resetDataCat7 } from '../../../features/categorySlice';
import { fetchDataAutoSendCMSCat7 } from '../../../features/autosendcmsSlice';
import { todayLocal } from '../../../utils/formatDate';
import { useInfiniteList } from '../../../hooks/useInfiniteList';
import { DEFAULT_FACTORY } from '../../../utils/constants';

const Cat7 = () => {
  const [dateFrom, setDateFrom] = useState<string>(todayLocal());
  const [dateTo, setDateTo] = useState<string>(todayLocal());

  const [factory, setFactory] = useState<string>(DEFAULT_FACTORY);
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

  const {
    items: cat7,
    page,
    loading,
    hasMore,
  } = useAppSelector((state) => state.category.cat7);
  const dispatch = useAppDispatch();

  const { tableRef, activeSort, setActiveSort, onScroll } = useInfiniteList({
    initialSort: { sortField: HEADER[0].state, sortOrder: 'asc' },
    page,
    loading,
    hasMore,
    reset: () => dispatch(resetDataCat7()),
    fetchPage: (page, sort) =>
      dispatch(
        getDataCat7({
          dateFrom,
          dateTo,
          factory,
          page,
          ...sort,
        }),
      ),
    onFirstLoad: () => {
      setLoadingFetch(true);
      dispatch(
        fetchDataAutoSendCMSCat7({
          dateFrom,
          dateTo,
          factory,
        }),
      ).finally(() => setLoadingFetch(false));
    },
  });

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
          loadingFetch={loadingFetch}
          setLoadingFetch={setLoadingFetch}
        />
      </div>
      <div className="mt-4 flex min-h-[320px] min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1">
        <Table
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={cat7}
          tableRef={tableRef}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default Cat7;
