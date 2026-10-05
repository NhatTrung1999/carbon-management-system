import { useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Table from '../../../components/SystemSettings/HRModule/Table';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search from '../../../components/SystemSettings/HRModule/Search';
import { HEADER, type IHRModule } from '../../../types/hrmodule';
import { useTranslation } from 'react-i18next';
import { BREADCRUMB } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchHRModule,
  resetDataHRModule,
  updateHRModule,
} from '../../../features/hrmoduleSlice';
import { getInitialDateFrom, todayLocal } from '../../../utils/formatDate';
import { Toast } from '../../../utils/Toast';
import { useInfiniteList } from '../../../hooks/useInfiniteList';
import i18n from '../../../i18n';

const HRModule = () => {
  const { t } = useTranslation();

  const [dateFrom, setDateFrom] = useState<string>(getInitialDateFrom());
  const [dateTo, setDateTo] = useState<string>(todayLocal());

  const [fullName, setFullName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [joinDateFrom, setJoinDateFrom] = useState<string>('');
  const [joinDateTo, setJoinDateTo] = useState<string>('');

  const {
    items: hrmodule,
    page,
    loading,
    hasMore,
  } = useAppSelector((state) => state.hrmodule.list);

  const dispatch = useAppDispatch();

  const { tableRef, activeSort, setActiveSort, onScroll } = useInfiniteList({
    initialSort: { sortField: HEADER[0].state, sortOrder: 'asc' },
    page,
    loading,
    hasMore,
    reset: () => dispatch(resetDataHRModule()),
    fetchPage: (page, sort) =>
      dispatch(
        fetchHRModule({
          dateFrom,
          dateTo,
          fullName,
          id,
          department:
            department.toLowerCase().trim() === 'all' ? '' : department,
          joinDateFrom,
          joinDateTo,
          page,
          ...sort,
        }),
      ),
  });

  const handleUpdateRow = async (updatedItem: IHRModule) => {
    try {
      await dispatch(
        updateHRModule({
          id: updatedItem.ID,
          currentAddress: updatedItem.CurrentAddress,
          transportationMethod: updatedItem.TransportationMethod,
        }),
      ).unwrap();
    } catch {
      Toast.fire({ icon: 'error', title: i18n.t('common.update_failed') });
    }
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0 gap-4 px-2 sm:px-4">
      {/* Page header */}
      <div className="shrink-0">
        <Breadcrumb
          items={BreadcrumbData(
            t(BREADCRUMB),
            t('dataHRCollecMod.dataCollection_HR_Module'),
          )}
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          {t('dataHRCollecMod.dataCollection_HR_Module')}
        </h1>
      </div>

      {/* Glass panel */}
      <div className="relative flex min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1 glass-panel">
        {/* Top shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-5 xl:min-h-0 xl:flex-1">
          <Search
            activeSort={activeSort}
            dateFrom={dateFrom}
            dateTo={dateTo}
            fullName={fullName}
            id={id}
            department={department}
            joinDateFrom={joinDateFrom}
            joinDateTo={joinDateTo}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            setFullName={setFullName}
            setId={setId}
            setDepartment={setDepartment}
            setJoinDateFrom={setJoinDateFrom}
            setJoinDateTo={setJoinDateTo}
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
