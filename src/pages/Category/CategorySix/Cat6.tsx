import { useCallback, useEffect, useRef, useState } from 'react';
import Search from '../../../components/Category/CategorySix/Search';
import Table from '../../../components/Category/CategorySix/Table';
import { getCat6Header } from '../../../types/cat6';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat6, resetDataCat6 } from '../../../features/categorySlice';
import { todayLocal } from '../../../utils/formatDate';
import { DEFAULT_FACTORY } from '../../../utils/constants';

const Cat6 = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const lastQueryRef = useRef<string>('');
  const [activeSort, setActiveSort] = useState({
    sortField: 'Document_Date',
    sortOrder: 'asc',
  });

  const {
    items: cat6,
    page,
    loading,
    hasMore,
  } = useAppSelector((state) => state.category.cat6);
  const dispatch = useAppDispatch();

  const [dateFrom, setDateFrom] = useState<string>(todayLocal());
  const [dateTo, setDateTo] = useState<string>(todayLocal());

  const [factory, setFactory] = useState<string>(DEFAULT_FACTORY);
  const [searchSeq, setSearchSeq] = useState(0);
  const [checkedDormShuttle, setCheckedDormShuttle] = useState(false);

  const header = getCat6Header();

  const handleSearch = () => {
    setSearchSeq((value) => value + 1);
  };

  useEffect(() => {
    const queryKey = [
      dateFrom,
      dateTo,
      factory,
      activeSort.sortField,
      activeSort.sortOrder,
      checkedDormShuttle,
      searchSeq,
    ].join('|');

    if (lastQueryRef.current === queryKey) {
      return;
    }

    lastQueryRef.current = queryKey;
    dispatch(resetDataCat6());
    dispatch(
      getDataCat6({
        dateFrom,
        dateTo,
        factory,
        page: 1,
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
        checkedDormShuttle,
      }),
    );
  }, [
    dispatch,
    dateFrom,
    dateTo,
    factory,
    activeSort.sortField,
    activeSort.sortOrder,
    checkedDormShuttle,
    searchSeq,
  ]);

  const onScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || !hasMore) return;
    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (bottomReached) {
      dispatch(
        getDataCat6({
          dateFrom,
          dateTo,
          factory,
          page,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
          checkedDormShuttle,
        }),
      );
    }
  }, [
    dispatch,
    loading,
    hasMore,
    page,
    activeSort.sortField,
    activeSort.sortOrder,
    dateFrom,
    dateTo,
    factory,
    checkedDormShuttle,
  ]);

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
          onSearch={handleSearch}
          checkedDormShuttle={checkedDormShuttle}
          setCheckedDormShuttle={setCheckedDormShuttle}
        />
      </div>
      <div className="mt-4 flex min-h-[320px] min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1">
        <Table
          header={header}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={cat6}
          tableRef={tableRef}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default Cat6;
