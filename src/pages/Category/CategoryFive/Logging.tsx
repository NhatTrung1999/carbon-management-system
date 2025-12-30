import { useCallback, useEffect, useRef, useState } from 'react';
import Search from '../../../components/Category/CategoryFive/LoggingCat5/Search';
import Table from '../../../components/Category/CategoryFive/LoggingCat5/Table';
import { HEADER } from '../../../types/loggingcat5'
import { getLoggingCat5, resetLoggingCat5 } from '../../../features/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const Logging = () => {
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

    const { loggingcat5, page, loading, hasMore } = useAppSelector(
      (state) => state.category
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (didFetch.current) return;
      didFetch.current = true;
      dispatch(resetLoggingCat5());
      dispatch(
        getLoggingCat5({
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
                    getLoggingCat5({
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
        <div className="p-4">
            <Search
                activeSort={activeSort}
                dateFrom={dateFrom}
                setDateFrom={setDateFrom}
                dateTo={dateTo}
                setDateTo={setDateTo}
                factory={factory}
                setFactory={setFactory}
            />
            <Table
                header={HEADER}
                tableRef={tableRef}
                data={loggingcat5}
                activeSort={activeSort}
                setActiveSort={setActiveSort}
                onScroll={onScroll}
            />
        </div>
    );
};

export default Logging;