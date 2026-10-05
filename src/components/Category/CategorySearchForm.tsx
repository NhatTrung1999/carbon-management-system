import type { FormEvent, ReactNode, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import ExcelIcon from '../../assets/images/excel-icon.png';
import SendIcon from '../../assets/images/send-to-CMS.png';
import { FACTORIES } from '../../utils/constants';

type SelectOption = { name: string; value: string };

export type CategorySearchFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;

  dateFrom: string;
  dateTo: string;
  factory: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

  dockeyOptions?: SelectOption[];
  dockey?: string;

  ryOptions?: SelectOption[];
  ry?: string;
  isOpenRY?: boolean;

  extraFilters?: ReactNode;

  cmsCount: number;
  loadingFetch: boolean;
  loadingCMS: boolean;
  loadingExcel: boolean;
  loadingPreview: boolean;

  onSendToCMS: () => void;
  onExportExcel: () => void;
  onPreviewPayload: () => void;
};

const CategorySearchForm = ({
  onSubmit,
  dateFrom,
  dateTo,
  factory,
  handleChange,
  dockeyOptions,
  dockey,
  ryOptions,
  ry,
  isOpenRY = false,
  extraFilters,
  cmsCount,
  loadingFetch,
  loadingCMS,
  loadingExcel,
  loadingPreview,
  onSendToCMS,
  onExportExcel,
  onPreviewPayload,
}: CategorySearchFormProps) => {
  const { t } = useTranslation();

  const hasDockey = Boolean(dockeyOptions?.length);
  const gridCols = hasDockey ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <form className="mb-4 sm:mb-5 space-y-4" onSubmit={onSubmit}>
      {/* ── Filters ── */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${gridCols}`}
      >
        <div>
          <Input
            label={t('main.date_from')}
            type="date"
            name="dateFrom"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={dateFrom}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            label={t('main.date_to')}
            type="date"
            name="dateTo"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={dateTo}
            onChange={handleChange}
          />
        </div>
        <div className={hasDockey ? 'sm:col-span-2 lg:col-span-1' : ''}>
          <Select
            label={t('main.factory')}
            name="factory"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={factory}
            onChange={handleChange}
            isShowAllSelect={true}
            showAllSelect={true}
            options={FACTORIES}
          />
        </div>
        {hasDockey && (
          <div className="sm:col-span-2 lg:col-span-1">
            <Select
              label="Dockey"
              name="dockey"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={dockey ?? ''}
              onChange={handleChange}
              options={dockeyOptions!}
            />
          </div>
        )}
        {isOpenRY && (
          <div className="sm:col-span-2 lg:col-span-1">
            <Select
              label="RY"
              name="ry"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={ry ?? ''}
              onChange={handleChange}
              options={ryOptions!}
            />
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-2 sm:items-center">
        <Button
          label={t('main.search')}
          type="submit"
          variant="search"
          className="w-full sm:w-auto"
        />
        <Button
          label={
            loadingFetch
              ? t('common.loading_erp')
              : loadingCMS
                ? t('common.loading')
                : `${t('main.send_to_CMS')} (${cmsCount})`
          }
          type="button"
          onClick={onSendToCMS}
          variant="cms"
          className="w-full sm:w-auto"
          imgSrc={SendIcon}
          disabled={loadingCMS || loadingFetch || cmsCount === 0}
        />
        <Button
          label={
            loadingExcel ? t('common.loading') : t('main.export_excel_file')
          }
          type="button"
          onClick={onExportExcel}
          variant="excel"
          className="w-full sm:w-auto"
          imgSrc={ExcelIcon}
          disabled={loadingExcel}
        />
        <Button
          label={
            loadingPreview ? t('common.loading') : t('common.preview_payload')
          }
          type="button"
          onClick={onPreviewPayload}
          variant="excel"
          className="w-full sm:w-auto"
          imgSrc={ExcelIcon}
          disabled={loadingPreview}
        />
        {extraFilters}
      </div>
    </form>
  );
};

export default CategorySearchForm;
