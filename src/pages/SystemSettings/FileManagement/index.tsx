import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Table from '../../../components/SystemSettings/FileManagement/Table';
import Search from '../../../components/SystemSettings/FileManagement/Search';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getData } from '../../../features/fileSlice';
import { HEADER } from '../../../types/filemanagement';
import { BREADCRUMB } from '../../../utils/constanst';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };

// ─── Component ───────────────────────────────────────────────────────────────

const FileManagement = () => {
  const { file } = useAppSelector((state) => state.file);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [activeSort, setActiveSort] = useState<SortState>({
    sortField: HEADER[4].state,
    sortOrder: 'desc',
  });

  useEffect(() => {
    dispatch(
      getData({
        module: '',
        file_name: '',
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [activeSort]);

  return (
    <div className="flex flex-col gap-5 px-2 sm:px-4">
      {/* Page header */}
      <div>
        <Breadcrumb items={BreadcrumbData(t(BREADCRUMB), 'File Management')} />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          {t('File Management')}
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
            data={file}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
          />
        </div>
      </div>
    </div>
  );
};

export default FileManagement;
