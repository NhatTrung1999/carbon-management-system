import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import Search from '../../../components/Category/CategorySix/Search';
import Table from '../../../components/Category/CategorySix/Table';
import { HEADER } from '../../../types/cat6';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat6, resetDataCat6 } from '../../../features/categorySlice';

const CategorySix = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
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

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
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
  }, [dispatch, activeSort]);

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
  }, [dispatch, loading, hasMore, page, activeSort]);

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'Category six')}
      />

      <Typography
        name="Category six"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Business travel"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card>
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
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={cat6}
          tableRef={tableRef}
          onScroll={onScroll}
        />
      </Card>
    </Fragment>
  );
};

export default CategorySix;
