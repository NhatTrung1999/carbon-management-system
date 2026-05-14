import { useEffect, useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search from '../../../components/SystemSettings/InfoFactoryManagement/Search';
import Table from '../../../components/SystemSettings/InfoFactoryManagement/Table';
import { HEADER } from '../../../types/infofactorymanagement';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getInfoFactory } from '../../../features/infofactorySlice';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };

// ─── Component ───────────────────────────────────────────────────────────────

const InfoFactoryManagement = () => {
  const { infofactory } = useAppSelector((state) => state.infofactory);
  const dispatch = useAppDispatch();

  const [activeSort, setActiveSort] = useState<SortState>({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  useEffect(() => {
    dispatch(
      getInfoFactory({
        companyName: '',
        city: '',
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, []);

  return (
    <div className="flex flex-col gap-5 px-2 sm:px-4">
      {/* Page header */}
      <div>
        <Breadcrumb
          items={BreadcrumbData(
            'Carbon Management System',
            'Info Factory Management'
          )}
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          Info Factory Management
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
          <Search activeSort={activeSort} />
          <Table
            header={HEADER}
            data={infofactory}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoFactoryManagement;
