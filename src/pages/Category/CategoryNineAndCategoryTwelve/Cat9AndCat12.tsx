import { useState } from 'react';
import { HEADER } from '../../../types/cat9andcat12';
import Search from '../../../components/Category/CategoryNineAndCategoryTwelve/Search';
import Table from '../../../components/Category/CategoryNineAndCategoryTwelve/Table';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getDataCat9AndCat12,
  resetDataCat9AndCat12,
} from '../../../features/categorySlice';
import { fetchDataAutoSendCMSCat9AndCat12 } from '../../../features/autosendcmsSlice';
import { todayLocal } from '../../../utils/formatDate';
import { useInfiniteList } from '../../../hooks/useInfiniteList';
import { DEFAULT_FACTORY } from '../../../utils/constants';

const Cat9AndCat12 = () => {
  const {
    items: cat9andcat12,
    page,
    hasMore,
    loading,
  } = useAppSelector((state) => state.category.cat9andcat12);
  const dispatch = useAppDispatch();
  const [dateFrom, setDateFrom] = useState<string>(todayLocal());
  const [dateTo, setDateTo] = useState<string>(todayLocal());

  const [dockey, setDockey] = useState<string>('3.2');
  const [factory, setFactory] = useState<string>(DEFAULT_FACTORY);
  const [ry, setRY] = useState<string>('ALL');
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

  const { tableRef, activeSort, setActiveSort, onScroll } = useInfiniteList({
    initialSort: { sortField: HEADER[0].state, sortOrder: 'asc' },
    page,
    loading,
    hasMore,
    reset: () => dispatch(resetDataCat9AndCat12()),
    fetchPage: (page, sort) =>
      dispatch(
        getDataCat9AndCat12({
          dateFrom,
          dateTo,
          factory,
          ry,
          page,
          ...sort,
        }),
      ),
    onFirstLoad: () => {
      setLoadingFetch(true);
      dispatch(
        fetchDataAutoSendCMSCat9AndCat12({
          dateFrom,
          dateTo,
          factory,
          ry,
          dockey,
        }),
      ).finally(() => setLoadingFetch(false));
    },
  });

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0">
      <div className="shrink-0 min-w-0 overflow-x-auto">
        <Search
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          factory={factory}
          setFactory={setFactory}
          activeSort={activeSort}
          dockey={dockey}
          setDockey={setDockey}
          ry={ry}
          setRY={setRY}
          loadingFetch={loadingFetch}
          setLoadingFetch={setLoadingFetch}
        />
      </div>

      <div className="mt-4 flex min-h-[320px] min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1">
        <Table
          onScroll={onScroll}
          tableRef={tableRef}
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={cat9andcat12}
        />
      </div>
    </div>
  );
};

export default Cat9AndCat12;
