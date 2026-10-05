import { useFormik } from 'formik';

import ExcelIcon from '../../../../assets/images/excel-icon.png';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../app/hooks';
import {
  getCustomExport,
  resetDataCustomExport,
} from '../../../../features/categorySlice';
import { generateFileExcel } from '../../../../features/fileSlice';
import Input from '../../../common/Input';
import Select from '../../../common/Select';
import { FACTORIES } from '../../../../utils/constants';
import Button from '../../../common/Button';
import { toastStatus } from '../../../../utils/toastResult';

type Props = {
  field: string[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  dateFrom: string;
  setDateFrom: (dateVal: string) => void;
  dateTo: string;
  setDateTo: (dateVal: string) => void;
  factory: string;
  setFactory: (factoryVal: string) => void;
};

const Search = ({
  field,
  activeSort,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  factory,
  setFactory,
}: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loadingExcel, setLoadingExcel] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      dateFrom: dateFrom,
      dateTo: dateTo,
      factory: factory,
    },
    onSubmit: async (data) => {
      dispatch(resetDataCustomExport());
      setDateFrom(data.dateFrom);
      setDateTo(data.dateTo);
      setFactory(data.factory);
      dispatch(
        getCustomExport({
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          factory: data.factory,
          page: 1,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        }),
      );
    },
  });

  useEffect(() => {}, []);

  const onExportExcel = async () => {
    setLoadingExcel(true);
    const result = await dispatch(
      generateFileExcel({
        module: 'CustomExport',
        dateFrom: formik.values.dateFrom,
        dateTo: formik.values.dateTo,
        factory: formik.values.factory,
        field: field,
      }),
    );
    setLoadingExcel(false);
    if (generateFileExcel.fulfilled.match(result)) {
      toastStatus(result.payload);
    }
  };

  return (
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
      </div>
    </form>
  );
};

export default Search;
