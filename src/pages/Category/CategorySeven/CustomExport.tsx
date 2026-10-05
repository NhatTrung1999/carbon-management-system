import { useState } from 'react';
import Search from '../../../components/Category/CategorySeven/CustomExport/Search';
import Table from '../../../components/Category/CategorySeven/CustomExport/Table';
import { HEADER_CUSTOM_EXPORT } from '../../../types/customexport';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getCustomExport,
  resetDataCustomExport,
} from '../../../features/categorySlice';
import { todayLocal } from '../../../utils/formatDate';
import { useInfiniteList } from '../../../hooks/useInfiniteList';
import { DEFAULT_FACTORY } from '../../../utils/constants';

const CustomExport = () => {
  const [dateFrom, setDateFrom] = useState<string>(todayLocal());
  const [dateTo, setDateTo] = useState<string>(todayLocal());

  const [factory, setFactory] = useState<string>(DEFAULT_FACTORY);
  const [field, setField] = useState<string[]>([]);

  const {
    items: customExport,
    page,
    loading,
    hasMore,
  } = useAppSelector((state) => state.category.customExport);
  const dispatch = useAppDispatch();

  const { tableRef, activeSort, setActiveSort, onScroll } = useInfiniteList({
    initialSort: { sortField: HEADER_CUSTOM_EXPORT[0].state, sortOrder: 'asc' },
    page,
    loading,
    hasMore,
    reset: () => dispatch(resetDataCustomExport()),
    fetchPage: (page, sort) =>
      dispatch(
        getCustomExport({
          dateFrom,
          dateTo,
          factory,
          page,
          ...sort,
        }),
      ),
  });

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0">
      <div className="shrink-0 min-w-0 overflow-x-auto">
        <Search
          field={field}
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
          header={HEADER_CUSTOM_EXPORT}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={customExport}
          tableRef={tableRef}
          onScroll={onScroll}
          setField={setField}
        />
      </div>
    </div>
  );
};

export default CustomExport;
