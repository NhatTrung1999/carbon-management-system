// import { type RefObject, type UIEventHandler } from 'react';
// import type { TableHeaderProps } from '../../../types/table';
// import type { ICat7Data } from '../../../types/cat7';
import { useCallback, useEffect, useRef, useState } from 'react';
import Search from '../../../components/Category/CategorySeven/Search';
import Table from '../../../components/Category/CategorySeven/Table';
import { HEADER } from '../../../types/cat7';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat7, resetDataCat7 } from '../../../features/categorySlice';
import { fetchDataAutoSendCMSCat7 } from '../../../features/autosendcmsSlice';

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

const Cat7 = () => {
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

  const { cat7, page, loading, hasMore } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetDataCat7());
    dispatch(
      getDataCat7({
        dateFrom,
        dateTo,
        factory,
        page: 1,
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
    dispatch(
      fetchDataAutoSendCMSCat7({
        dateFrom,
        dateTo,
        factory,
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
        getDataCat7({
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
      <div className="mt-4 overflow-x-auto">
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
