import { Fragment } from 'react/jsx-runtime';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Card from '../../../components/common/Card';
// import Search from '../../../components/Category/CategoryFive/Search';
// import Table from '../../../components/Category/CategoryFive/Table';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { HEADER } from '../../../types/cat5';
// import { useAppDispatch, useAppSelector } from '../../../app/hooks';
// import { getDataCat5, resetDataCat5 } from '../../../features/categorySlice';
import { BREADCRUMB } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';
import Tabs from '../../../components/common/Tabs';
import Cat5 from './Cat5';
import Logging from './Logging';

const CategoryFive = () => {
  // const tableRef = useRef<HTMLDivElement | null>(null);
  // const didFetch = useRef(false);
  // const [activeSort, setActiveSort] = useState({
  //   sortField: HEADER[0].state,
  //   sortOrder: 'asc',
  // });

  // const [dateFrom, setDateFrom] = useState<string>(
  //   new Date().toISOString().slice(0, 10)
  // );
  // const [dateTo, setDateTo] = useState<string>(
  //   new Date().toISOString().slice(0, 10)
  // );

  // const [factory, setFactory] = useState<string>('LYV');
  // const { cat5, page, loading, hasMore } = useAppSelector(
  //   (state) => state.category
  // );
  // const dispatch = useAppDispatch();
  const {t} = useTranslation()

  // useEffect(() => {
  //   if (didFetch.current) return;
  //   didFetch.current = true;
  //   dispatch(resetDataCat5());
  //   dispatch(
  //     getDataCat5({
  //       dateFrom,
  //       dateTo,
  //       factory,
  //       page: 1,
  //       sortField: activeSort.sortField,
  //       sortOrder: activeSort.sortOrder,
  //     })
  //   );
  // }, [dispatch, activeSort, dateFrom, dateTo, factory]);
  // // }, [dispatch, activeSort, date]);

  // const onScroll = useCallback(() => {
  //   const el = tableRef.current;
  //   if (!el || loading || !hasMore) return;
  //   const bottomReached =
  //     el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
  //   if (bottomReached) {
  //     dispatch(
  //       getDataCat5({
  //         dateFrom,
  //         dateTo,
  //         factory,
  //         page,
  //         sortField: activeSort.sortField,
  //         sortOrder: activeSort.sortOrder,
  //       })
  //     );
  //   }
  // }, [dispatch, loading, hasMore, page, activeSort, dateFrom, dateTo, factory]);
  // }, [dispatch, loading, hasMore, page, date, activeSort]);

  return (
    <Fragment>
      <div className="px-3 sm:px-4 md:px-6">
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('cat5.cat_5'))}
        />

        <div className="mb-4 sm:mb-6">
          <Typography
            name={t('cat5.cat_5')}
            className="block text-xs sm:text-sm font-semibold text-[#081c1b] mb-1 sm:mb-2"
          />
          <Typography
            name={t('cat5.waste_generated_in_operations')}
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
          />
        </div>

        <Card>
          <div className="overflow-hidden">
            <Tabs
              tabs={[
                {
                  label: 'WG in Operations',
                  content: <Cat5 />,
                },
                {
                  label: 'Logging',
                  content: <Logging />,
                }
              ]}
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default CategoryFive;