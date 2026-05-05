import { useCallback, useEffect, useRef, useState } from 'react';
import Search from '../../../components/Category/CategorySix/Search';
import Table from '../../../components/Category/CategorySix/Table';
import { getCat6Header } from '../../../types/cat6';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat6, resetDataCat6 } from '../../../features/categorySlice';

const Cat6 = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const lastQueryRef = useRef<string>('');
  const [activeSort, setActiveSort] = useState({
    sortField: 'Document_Date',
    sortOrder: 'asc',
  });

  const { cat6, page, loading, hasMore } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  const [dateFrom, setDateFrom] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [factory, setFactory] = useState<string>('LYV');
  const [searchSeq, setSearchSeq] = useState(0);

  const maxPlaceCount = Math.max(
    0,
    ...cat6.map((row) =>
      Object.keys(row).filter((key) => /^Place\d+$/.test(key)).length
    )
  );
  const placeCount = Math.max(maxPlaceCount, 1);
  const transportCount = Math.max(
    0,
    placeCount - 1,
    ...cat6.map((row) =>
      Object.keys(row).filter((key) => /^Transport_\d+$/.test(key)).length
    )
  );
  const header = getCat6Header(placeCount, transportCount);

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
      })
    );
  }, [
    dispatch,
    dateFrom,
    dateTo,
    factory,
    activeSort.sortField,
    activeSort.sortOrder,
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
        })
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
  ]);

  return (
    <div className="w-full">
      <div className="mt-4 overflow-x-auto">
        <Search
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          factory={factory}
          setFactory={setFactory}
          onSearch={handleSearch}
        />
      </div>
      <div className="mt-4 overflow-x-auto">
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
