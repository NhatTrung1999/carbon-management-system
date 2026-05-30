import type { FormEvent, ReactNode, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import ExcelIcon from '../../assets/images/excel-icon.png';
import SendIcon from '../../assets/images/send-to-CMS.png';
import { FACTORIES } from '../../utils/constanst';

type SelectOption = { name: string; value: string };

export type CategorySearchFormProps = {
  onSubmit       : (e: FormEvent<HTMLFormElement>) => void;

  dateFrom       : string;
  dateTo         : string;
  factory        : string;
  handleChange   : (e: ChangeEvent<any>) => void;

  dockeyOptions ?: SelectOption[];
  dockey        ?: string;

  extraFilters  ?: ReactNode;

  cmsCount       : number;
  loadingFetch   : boolean;
  loadingCMS     : boolean;
  loadingExcel   : boolean;
  loadingPreview : boolean;

  onSendToCMS    : () => void;
  onExportExcel  : () => void;
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
  const gridCols  = hasDockey ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <form className="mb-4 sm:mb-5 space-y-4" onSubmit={onSubmit}>

      {/* ── Filters ── */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${gridCols}`}>
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
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-2 sm:items-center">
        <Button
          label={t('main.search')}
          type="submit"
          className="w-full sm:w-auto text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer transition-colors duration-300"
        />
        <Button
          label={
            loadingFetch
              ? 'loading from ERP...'
              : loadingCMS
              ? 'Loading...'
              : `${t('Send to CMS')} (${cmsCount})`
          }
          type="button"
          onClick={onSendToCMS}
          className={`w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg text-white bg-[#FFB619] hover:bg-[#FFB619]/80 transition-colors duration-300 ${
            loadingCMS || loadingFetch ? 'hover:cursor-not-allowed' : ''
          }`}
          imgSrc={SendIcon}
          disabled={loadingCMS || loadingFetch}
        />
        <Button
          label={loadingExcel ? 'Loading...' : t('Export Excel file')}
          type="button"
          onClick={onExportExcel}
          className={`w-full sm:w-auto bg-green-500/20 border-green-400/40 hover:bg-green-500 text-white ${
            loadingExcel ? 'hover:cursor-not-allowed' : ''
          }`}
          imgSrc={ExcelIcon}
          disabled={loadingExcel}
        />
        <Button
          label={loadingPreview ? 'Loading...' : 'Preview Payload'}
          type="button"
          onClick={onPreviewPayload}
          className={`w-full sm:w-auto bg-green-500/20 border-green-400/40 hover:bg-green-500 text-white ${
            loadingPreview ? 'hover:cursor-not-allowed' : ''
          }`}
          imgSrc={ExcelIcon}
          disabled={loadingPreview}
        />
        {extraFilters}
      </div>

    </form>
  );
};

export default CategorySearchForm;
