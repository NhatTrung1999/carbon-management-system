import { useCallback, useEffect, useRef, useState } from 'react';
import { HEADER } from '../../../types/cat9andcat12';
import Search from '../../../components/Category/CategoryNineAndCategoryTwelve/Search';
import Table from '../../../components/Category/CategoryNineAndCategoryTwelve/Table';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat9AndCat12, resetDataCat9AndCat12 } from '../../../features/categorySlice';
import { fetchDataAutoSendCMSCat9AndCat12 } from '../../../features/autosendcmsSlice';

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
//   dockey: string;
//   setDockey: (factoryVal: string) => void;
//   loadingFetch: boolean;
//   setLoadingFetch: (val: boolean) => void;
//   setActiveSort: (data: any) => void;
//   data: ICat9AndCat12Data[];
//   tableRef: RefObject<HTMLDivElement | null>;
//   onScroll: UIEventHandler<HTMLDivElement>;
// };

const Cat9AndCat12 = () => {

const { cat9andcat12, page, hasMore, loading } = useAppSelector(
    (state) => state.category
  );
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const dispatch = useAppDispatch();
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

  const [dockey, setDockey] = useState<string>('3.2');
  const [factory, setFactory] = useState<string>('LYV');
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetDataCat9AndCat12());
    dispatch(
      getDataCat9AndCat12({
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
      fetchDataAutoSendCMSCat9AndCat12({ dateFrom, dateTo, factory, dockey })
    ).finally(() => setLoadingFetch(false));
  }, [dispatch, activeSort, dateFrom, dateTo, factory]);
  // }, [dispatch, activeSort, date]);

  const onScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || !hasMore) return;
    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (bottomReached) {
      dispatch(
        getDataCat9AndCat12({
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
  // }, [dispatch, loading, hasMore, page, date, activeSort]);

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
