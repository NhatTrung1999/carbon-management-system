import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import DataTable from '../common/DataTable';
import ExcelIcon from '../../assets/images/excel-icon.png';
import { useInfiniteList } from '../../hooks/useInfiniteList';
import type { TableHeaderProps } from '../../types/table';
import type { DateFactoryFilter } from '../../types/query';
import type { PagedList } from '../../features/helpers';
import { DEFAULT_FACTORY, FACTORIES } from '../../utils/constants';
import { downloadBlob } from '../../utils/download';
import { todayLocal } from '../../utils/formatDate';
import { Toast } from '../../utils/Toast';
import i18n from '../../i18n';

type LogFilters = DateFactoryFilter;

export type LogQuery = LogFilters & {
  page: number;
  sortField: string;
  sortOrder: string;
};

export type LogExport = {
  request: (filters: LogFilters) => Promise<BlobPart>;
  fileName: (filters: LogFilters) => string;
};

type Props<T> = {
  header: TableHeaderProps[];
  list: PagedList<T>;
  reset: () => void;
  fetch: (query: LogQuery) => void;
  /** Omit to hide the Export Excel button. */
  exportExcel?: LogExport;
};

/** Logging tab: date/factory search, optional Excel export and an infinite-scroll table. */
const LoggingPage = <T extends object>({
  header,
  list,
  reset,
  fetch,
  exportExcel,
}: Props<T>) => {
  const { t } = useTranslation();
  const { items, page, loading, hasMore } = list;

  const [filters, setFilters] = useState<LogFilters>({
    dateFrom: todayLocal(),
    dateTo: todayLocal(),
    factory: DEFAULT_FACTORY,
  });
  const [loadingExcel, setLoadingExcel] = useState(false);

  const { tableRef, activeSort, setActiveSort, onScroll } = useInfiniteList({
    initialSort: { sortField: header[0].state, sortOrder: 'asc' },
    page,
    loading,
    hasMore,
    reset,
    fetchPage: (page, sort) => fetch({ ...filters, page, ...sort }),
  });

  const formik = useFormik<LogFilters>({
    initialValues: filters,
    onSubmit: (values) => {
      setFilters(values);
      reset();
      fetch({ ...values, page: 1, ...activeSort });
    },
  });

  const onExportExcel = async () => {
    if (!exportExcel) return;
    setLoadingExcel(true);
    try {
      const response = await exportExcel.request(formik.values);
      downloadBlob(response, exportExcel.fileName(formik.values));
    } catch {
      Toast.fire({ icon: 'error', title: i18n.t('common.export_failed') });
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0">
      <div className="shrink-0 min-w-0 overflow-x-auto">
        <form className="mb-4 sm:mb-5 space-y-4" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <Input
                label={t('main.date_from')}
                type="date"
                name="dateFrom"
                classNameLabel="mb-2 text-sm sm:text-base"
                value={formik.values.dateFrom}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <Input
                label={t('main.date_to')}
                type="date"
                name="dateTo"
                classNameLabel="mb-2 text-sm sm:text-base"
                value={formik.values.dateTo}
                onChange={formik.handleChange}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <Select
                label={t('main.factory')}
                name="factory"
                classNameLabel="mb-2 text-sm sm:text-base"
                value={formik.values.factory}
                onChange={formik.handleChange}
                isShowAllSelect={true}
                showAllSelect={true}
                options={FACTORIES}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-2 sm:items-center">
            <Button
              label={t('main.search')}
              type="submit"
              variant="search"
              className="w-full sm:w-auto"
            />
            {exportExcel && (
              <Button
                label={
                  loadingExcel
                    ? t('common.loading')
                    : t('main.export_excel_file')
                }
                type="button"
                onClick={onExportExcel}
                variant="excel"
                className="w-full sm:w-auto"
                imgSrc={ExcelIcon}
                disabled={loadingExcel}
              />
            )}
          </div>
        </form>
      </div>
      <div className="mt-4 flex min-h-[320px] min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1">
        <DataTable
          header={header}
          data={items}
          loading={loading}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          tableRef={tableRef}
          onScroll={onScroll}
          dateFields={['CreatedAt']}
        />
      </div>
    </div>
  );
};

export default LoggingPage;
