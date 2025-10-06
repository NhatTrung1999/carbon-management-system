import { Fragment } from 'react/jsx-runtime';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Card from '../../../components/common/Card';
import Search from '../../../components/Category/CategoryFive/Search';
import Table from '../../../components/Category/CategoryFive/Table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HEADER } from '../../../types/cat5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat5, resetDataCat5 } from '../../../features/categorySlice';

const CategoryFive = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });
  const {  cat5, page, loading, hasMore } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetDataCat5());
    dispatch(
      getDataCat5({
        date: '',
        page: 1,
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [dispatch, activeSort]);
  // }, [dispatch, activeSort, date]);

  const onScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || !hasMore) return;
    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (bottomReached) {
      dispatch(
        getDataCat5({
          date: '',
          page,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        })
      );
    }
  }, [dispatch, loading, hasMore, page, activeSort]);
  // }, [dispatch, loading, hasMore, page, date, activeSort]);

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'Category five')}
      />

      <Typography
        name="Category five"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Waste generated in operations"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
      <Card>
        <Search activeSort={activeSort} />
        <Table
          onScroll={onScroll}
          tableRef={tableRef}
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={cat5}
        />
      </Card>
    </Fragment>
  );
};

export default CategoryFive;
