import { useState } from 'react';
import Search from '../../../components/Category/CategoryOneAndCategoryFour/Search';
import Table from '../../../components/Category/CategoryOneAndCategoryFour/Table';
import { HEADER } from '../../../types/cat1andcat4';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getDataCat1AndCat4,
  resetDataCat1AndCat4,
} from '../../../features/categorySlice';
import { fetchDataAutoSendCMSCat1AndCat4 } from '../../../features/autosendcmsSlice';
import { todayLocal } from '../../../utils/formatDate';
import { useInfiniteList } from '../../../hooks/useInfiniteList';
import { DEFAULT_FACTORY } from '../../../utils/constants';

const Cat1AndCat4 = () => {
  const [dateFrom, setDateFrom] = useState<string>(todayLocal());
  const [dateTo, setDateTo] = useState<string>(todayLocal());

  const [factory, setFactory] = useState<string>(DEFAULT_FACTORY);
  const [dockey, setDockey] = useState<string>('4.1');

  const [usage, setUsage] = useState<boolean>(false);
  const [unitWeight, setUnitWeight] = useState<boolean>(false);
  const [weight, setWeight] = useState<boolean>(false);
  const [departure, setDeparture] = useState<boolean>(false);
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

  const {
    items: cat1andcat4,
    page,
    loading,
    hasMore,
  } = useAppSelector((state) => state.category.cat1andcat4);
  const dispatch = useAppDispatch();

  const { tableRef, activeSort, setActiveSort, onScroll } = useInfiniteList({
    initialSort: { sortField: HEADER[0].state, sortOrder: 'asc' },
    page,
    loading,
    hasMore,
    reset: () => dispatch(resetDataCat1AndCat4()),
    fetchPage: (page, sort) =>
      dispatch(
        getDataCat1AndCat4({
          dateFrom,
          dateTo,
          factory,
          usage,
          unitWeight,
          weight,
          departure,
          page,
          ...sort,
        }),
      ),
    onFirstLoad: () => {
      setLoadingFetch(true);
      dispatch(
        fetchDataAutoSendCMSCat1AndCat4({
          dateFrom,
          dateTo,
          factory,
          dockey,
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
          dockey={dockey}
          setDockey={setDockey}
          usage={usage}
          setUsage={setUsage}
          unitWeight={unitWeight}
          setUnitWeight={setUnitWeight}
          weight={weight}
          setWeight={setWeight}
          departure={departure}
          setDeparture={setDeparture}
          loadingFetch={loadingFetch}
          setLoadingFetch={setLoadingFetch}
        />
      </div>
      <div className="mt-4 flex min-h-[320px] min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1">
        <Table
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={cat1andcat4}
          tableRef={tableRef}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default Cat1AndCat4;
