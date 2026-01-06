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
import { BREADCRUMB } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';

const CategorySix = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  const { page, loading, hasMore } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();
  const {t} = useTranslation()

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
      <div className='px3 sm:px-4 md:px-6'>
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('cat6.cat_6'))}
        />

        <div className="mb-4 sm:mb-6">
          <Typography
            name={t('cat6.cat_6')}
            className="block text-xs sm:text-sm font-semibold text-[#081c1b] mb-1 sm:mb-2"
          />
          <Typography
            name={t('cat6.business_travel')}
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
          />
        </div>

        <Card>
          <div className='overflow-hidden'>
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
              data={[]}
              tableRef={tableRef}
              onScroll={onScroll}
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default CategorySix;
