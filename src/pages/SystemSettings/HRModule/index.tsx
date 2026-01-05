import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Card from '../../../components/common/Card';
import Table from '../../../components/SystemSettings/HRModule/Table';
import Typography from '../../../components/common/Typography';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search from '../../../components/SystemSettings/HRModule/Search';
import { HEADER, type IHRModule } from '../../../types/hrmodule';
import { useTranslation } from 'react-i18next';
import { BREADCRUMB } from '../../../utils/constanst';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchHRModule,
  resetDataHRModule,
  setHRModule,
} from '../../../features/hrmoduleSlice';

const HRModule = () => {
  const { t } = useTranslation();
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

  const [fullName, setFullName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [department, setDepartment] = useState<string>('');

  const { hrmodule, page, loading, hasMore } = useAppSelector(
    (state) => state.hrmodule
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    dispatch(resetDataHRModule());
    dispatch(
      fetchHRModule({
        dateFrom,
        dateTo,
        fullName,
        id,
        department,
        page: 1,
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [dispatch, activeSort, dateFrom, dateTo]);

  const onScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || !hasMore) return;
    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (bottomReached) {
      dispatch(
        fetchHRModule({
          dateFrom,
          dateTo,
          fullName,
          id,
          department,
          page,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        })
      );
    }
  }, [dispatch, loading, hasMore, page, activeSort, dateFrom, dateTo]);

  const handleUpdateRow = (updatedItem: IHRModule) => {
    const newData = hrmodule.map((item) =>
      item.ID === updatedItem.ID ? updatedItem : item
    );
    dispatch(setHRModule(newData));
    console.log('Đã cập nhật:', updatedItem);
  };

  // console.log(hrmodule, setDateFrom, setDateTo, setFactory);

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData(t(BREADCRUMB), 'Data Collection HR Module')}
      />

      <Typography
        name="Data Collection HR Module"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
      <Card className="relative">
        <Search
          activeSort={activeSort}
          dateFrom={dateFrom}
          dateTo={dateTo}
          fullName={fullName}
          id={id}
          department={department}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          setFullName={setFullName}
          setId={setId}
          setDepartment={setDepartment}
        />
        <Table
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={hrmodule}
          tableRef={tableRef}
          onScroll={onScroll}
          onSave={handleUpdateRow}
        />
      </Card>
    </Fragment>
  );
};

export default HRModule;
