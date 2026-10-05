import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search, {
  type InfoFactoryFilter,
} from '../../../components/SystemSettings/InfoFactoryManagement/Search';
import Table from '../../../components/SystemSettings/InfoFactoryManagement/Table';
import { HEADER } from '../../../types/infofactorymanagement';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getInfoFactory } from '../../../features/infofactorySlice';
import type { SortState } from '../../../types/table';
import { BREADCRUMB } from '../../../utils/constants';

// ─── Types ───────────────────────────────────────────────────────────────────

// ─── Component ───────────────────────────────────────────────────────────────

const InfoFactoryManagement = () => {
  const { infofactory } = useAppSelector((state) => state.infofactory);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [activeSort, setActiveSort] = useState<SortState>({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  const [filter, setFilter] = useState<InfoFactoryFilter>({
    companyName: '',
    city: '',
  });

  // Search and sort both reload through here, so neither drops the other.
  useEffect(() => {
    dispatch(getInfoFactory({ ...filter, ...activeSort }));
  }, [dispatch, filter, activeSort]);

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0 gap-4 px-2 sm:px-4">
      {/* Page header */}
      <div>
        <Breadcrumb
          items={BreadcrumbData(
            t(BREADCRUMB),
            t('facinfo.info_factory_management'),
          )}
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          {t('facinfo.info_factory_management')}
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
          <Search onSearch={setFilter} />
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
