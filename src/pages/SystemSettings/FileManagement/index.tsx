import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Table from '../../../components/SystemSettings/FileManagement/Table';
import Search, {
  type FileFilter,
} from '../../../components/SystemSettings/FileManagement/Search';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getData } from '../../../features/fileSlice';
import { HEADER } from '../../../types/filemanagement';
import { BREADCRUMB } from '../../../utils/constants';
import type { SortState } from '../../../types/table';

// ─── Types ───────────────────────────────────────────────────────────────────

// ─── Component ───────────────────────────────────────────────────────────────

const FileManagement = () => {
  const { file } = useAppSelector((state) => state.file);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [activeSort, setActiveSort] = useState<SortState>({
    sortField: HEADER[4].state,
    sortOrder: 'desc',
  });

  const [filter, setFilter] = useState<FileFilter>({
    module: '',
    file_name: '',
  });

  // Search, sort and the "file ready" socket event all reload through here.
  const reload = useCallback(() => {
    dispatch(getData({ ...filter, ...activeSort }));
  }, [dispatch, filter, activeSort]);

  useEffect(reload, [reload]);

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0 gap-4 px-2 sm:px-4">
      {/* Page header */}
      <div>
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('filemmt.file_management'))}
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          {t('filemmt.file_management')}
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
            data={file}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            onReload={reload}
          />
        </div>
      </div>
    </div>
  );
};

export default FileManagement;
