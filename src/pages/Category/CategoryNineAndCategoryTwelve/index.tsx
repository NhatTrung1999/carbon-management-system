import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Card from '../../../components/common/Card';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { HEADER, HEADER_PORTCODE } from '../../../types/cat9andcat12';
import {
  getDataCat9AndCat12,
  resetDataCat9AndCat12,
} from '../../../features/categorySlice';
import Tabs from '../../../components/common/Tabs';
import Cat9AndCat12 from './Cat9AndCat12';
import PortCode from './PortCode';

const CategoryNineAndCategoryTwelvePage = () => {
  const { cat9andcat12, portCode, page, hasMore, loading } = useAppSelector(
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

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetDataCat9AndCat12());
    dispatch(
      getDataCat9AndCat12({
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
        getDataCat9AndCat12({
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
        items={BreadcrumbData(
          'Carbon Management System',
          'Category Nine & Category Twelve'
        )}
      />

      <Typography
        name="Category Nine & Category Twelve"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Downstream And End‑of‑life"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card>
        <Tabs
          tabs={[
            {
              label: 'Cat9AndCat12',
              content: (
                <Cat9AndCat12
                  activeSort={activeSort}
                  onScroll={onScroll}
                  tableRef={tableRef}
                  dateFrom={dateFrom}
                  setDateFrom={setDateFrom}
                  dateTo={dateTo}
                  setDateTo={setDateTo}
                  setActiveSort={setActiveSort}
                  data={cat9andcat12}
                  header={HEADER}
                />
              ),
            },
            {
              label: 'Port Code',
              content: <PortCode header={HEADER_PORTCODE} data={portCode} />,
            },
          ]}
        />
      </Card>
    </Fragment>
  );
};

export default CategoryNineAndCategoryTwelvePage;
