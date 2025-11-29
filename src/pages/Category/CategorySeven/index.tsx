import { Fragment } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
// import { HEADER } from '../../../types/cat7';
// import { useAppDispatch, useAppSelector } from '../../../app/hooks';
// import { getDataCat7, resetDataCat7 } from '../../../features/categorySlice';
import { BREADCRUMB } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';
import Tabs from '../../../components/common/Tabs';
import Cat7 from './Cat7';
import CustomExport from './CustomExport';
// import { HEADER_CUSTOM_EXPORT } from '../../../types/customexport';

const CategorySeven = () => {
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

  // const { cat7, page, loading, hasMore } = useAppSelector(
  //   (state) => state.category
  // );
  // const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (didFetch.current) return;
  //   didFetch.current = true;
  //   dispatch(resetDataCat7());
  //   dispatch(
  //     getDataCat7({
  //       dateFrom,
  //       dateTo,
  //       factory,
  //       page: 1,
  //       sortField: activeSort.sortField,
  //       sortOrder: activeSort.sortOrder,
  //     })
  //   );
  // }, [dispatch, activeSort, dateFrom, dateTo, factory]);

  // const onScroll = useCallback(() => {
  //   const el = tableRef.current;
  //   if (!el || loading || !hasMore) return;
  //   const bottomReached =
  //     el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
  //   if (bottomReached) {
  //     dispatch(
  //       getDataCat7({
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

  return (
    <Fragment>
      <Breadcrumb items={BreadcrumbData(t(BREADCRUMB), t('cat7.cat_7'))} />

      <Typography
        name={t('cat7.cat_7')}
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name={t('cat7.employee_commuting')}
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
      <Card>
        <Tabs
          tabs={[
            {
              label: 'GHG Inventory Template',
              content: <Cat7 />,
            },
            {
              label: 'Custom Export',
              content: <CustomExport />,
            },
          ]}
        />
      </Card>
    </Fragment>
  );
};

export default CategorySeven;
