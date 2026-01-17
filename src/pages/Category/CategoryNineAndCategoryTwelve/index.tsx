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
import Logging from '../CategoryNineAndCategoryTwelve/Logging';
import { BREADCRUMB } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';
import { fetchDataAutoSendCMSCat9AndCat12 } from '../../../features/autosendcmsSlice';

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

  const [factory, setFactory] = useState<string>('LYV');
  const { t } = useTranslation();

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
    dispatch(fetchDataAutoSendCMSCat9AndCat12({ dateFrom, dateTo, factory }));
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
    <Fragment>
      <div className="px-3 sm:px-4 md:px-6">
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('cat9andcat12.cat_9_12'))}
        />

        <div className="mb-4 sm:mb-6">
          <Typography
            name={t('cat9andcat12.cat_9_12')}
            className="block text-xs sm:text-sm font-semibold text-[#081c1b] mb-1 sm:mb-2"
          />
          <Typography
            name={t('cat9andcat12.downstream_and_endoflife')}
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
          />
        </div>

        <Card>
          <div className="overflow-hidden">
            <Tabs
              tabs={[
                {
                  label: t('cat9andcat12.cat_9_12'),
                  content: (
                    <Cat9AndCat12
                      activeSort={activeSort}
                      onScroll={onScroll}
                      tableRef={tableRef}
                      dateFrom={dateFrom}
                      setDateFrom={setDateFrom}
                      dateTo={dateTo}
                      setDateTo={setDateTo}
                      factory={factory}
                      setFactory={setFactory}
                      setActiveSort={setActiveSort}
                      data={cat9andcat12}
                      header={HEADER}
                    />
                  ),
                },
                {
                  label: t('cat9andcat12.port_code'),
                  content: (
                    <PortCode header={HEADER_PORTCODE} data={portCode} />
                  ),
                },
                {
                  label: 'Logging',
                  content: <Logging />,
                },
              ]}
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default CategoryNineAndCategoryTwelvePage;
