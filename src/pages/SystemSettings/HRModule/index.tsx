import { useCallback, useEffect, useRef, useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Table from '../../../components/SystemSettings/HRModule/Table';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search from '../../../components/SystemSettings/HRModule/Search';
import { HEADER, type IHRModule } from '../../../types/hrmodule';
import { useTranslation } from 'react-i18next';
import { BREADCRUMB } from '../../../utils/constanst';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchHRModule,
  resetDataHRModule,
  updateHRModule,
} from '../../../features/hrmoduleSlice';
import { getInitialDateFrom } from '../../../utils/formatDate';

const HRModule = () => {
  const { t } = useTranslation();
  const tableRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  const [dateFrom, setDateFrom] = useState<string>(getInitialDateFrom());
  const [dateTo, setDateTo] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [fullName, setFullName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [joinDate, setJoinDate] = useState<string>('');

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
        department: department.toLowerCase().trim() === 'all' ? '' : department,
        joinDate,
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
          department:
            department.toLowerCase().trim() === 'all' ? '' : department,
          joinDate,
          page,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        })
      );
    }
  }, [dispatch, loading, hasMore, page, activeSort, dateFrom, dateTo]);

  const handleUpdateRow = async (updatedItem: IHRModule) => {
    try {
      await dispatch(
        updateHRModule({
          id: updatedItem.ID,
          currentAddress: updatedItem.CurrentAddress,
          transportationMethod: updatedItem.TransportationMethod,
        })
      ).unwrap();
      console.log('Update success');
    } catch (error) {
      console.error('Lỗi khi update:', error);
    }
  };

  // console.log(hrmodule, setDateFrom, setDateTo, setFactory);

  return (
    // <Fragment>
    //   <div className="px-3 sm:px-4 md:px-6">
    // <Breadcrumb
    //   items={BreadcrumbData(t(BREADCRUMB), 'Data Collection HR Module')}
    // />

    //     <div className="mb-4 sm:mb-6">
    //       <Typography
    //         name="Data Collection HR Module"
    //         className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
    //       />
    //     </div>

    //     <Card className="relative">
    //       <div className="overflow-hidden">
    // <Search
    //   activeSort={activeSort}
    //   dateFrom={dateFrom}
    //   dateTo={dateTo}
    //   fullName={fullName}
    //   id={id}
    //   department={department}
    //   joinDate={joinDate}
    //   setDateFrom={setDateFrom}
    //   setDateTo={setDateTo}
    //   setFullName={setFullName}
    //   setId={setId}
    //   setDepartment={setDepartment}
    //   setJoinDate={setJoinDate}
    // />
    // <Table
    //   header={HEADER}
    //   activeSort={activeSort}
    //   setActiveSort={setActiveSort}
    //   data={hrmodule}
    //   tableRef={tableRef}
    //   onScroll={onScroll}
    //   onSave={handleUpdateRow}
    // />
    //       </div>
    //     </Card>
    //   </div>
    // </Fragment>
    <div className="flex flex-col gap-5 px-2 sm:px-4">
      {/* Page header */}
      <div>
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), 'Data Collection HR Module')}
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          Data Collection HR Module
        </h1>
      </div>

      {/* Glass panel */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.10]
        bg-white/[0.05] shadow-[0_8px_40px_rgba(0,0,0,0.30)] backdrop-blur-[32px]"
      >
        {/* Top shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="flex flex-col gap-4 p-5">
          <Search
            activeSort={activeSort}
            dateFrom={dateFrom}
            dateTo={dateTo}
            fullName={fullName}
            id={id}
            department={department}
            joinDate={joinDate}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            setFullName={setFullName}
            setId={setId}
            setDepartment={setDepartment}
            setJoinDate={setJoinDate}
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
        </div>
      </div>
    </div>
  );
};

export default HRModule;
