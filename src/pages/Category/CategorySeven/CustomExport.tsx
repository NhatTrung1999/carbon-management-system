// import { type RefObject, type UIEventHandler } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Search from '../../../components/Category/CategorySeven/CustomExport/Search';
import Table from '../../../components/Category/CategorySeven/CustomExport/Table';
import { HEADER_CUSTOM_EXPORT } from '../../../types/customexport';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getCustomExport,
  resetDataCustomExport,
} from '../../../features/categorySlice';
// import type { TableHeaderProps } from '../../../types/table';
// import type { ICat7Data } from '../../../types/cat7';

// type Props = {
//   header: TableHeaderProps[];
//   activeSort: {
//     sortField: string;
//     sortOrder: string;
//   };
//   dateFrom: string;
//   setDateFrom: (dateVal: string) => void;
//   dateTo: string;
//   setDateTo: (dateVal: string) => void;
//   factory: string;
//   setFactory: (factoryVal: string) => void;
//   setActiveSort: (data: any) => void;
//   data: ICat7Data[];
//   tableRef: RefObject<HTMLDivElement | null>;
//   onScroll: UIEventHandler<HTMLDivElement>;
// };

const CustomExport = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER_CUSTOM_EXPORT[0].state,
    sortOrder: 'asc',
  });

  const [dateFrom, setDateFrom] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [factory, setFactory] = useState<string>('LYV');
  const [field, setField] = useState<string[]>([]);

  const { customExport, page, loading, hasMore } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetDataCustomExport());
    dispatch(
      getCustomExport({
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
        getCustomExport({
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
    <>
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
      <Table
        header={HEADER_CUSTOM_EXPORT}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        data={customExport}
        tableRef={tableRef}
        onScroll={onScroll}
        setField={setField}
      />
    </>
  );
};

export default CustomExport;
