import { useFormik } from 'formik';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import ExcelIcon from '../../../../assets/images/excel-icon.png';
import { useEffect } from 'react';
import Select from '../../../common/Select';
import { useAppDispatch } from '../../../../app/hooks';
import { getLoggingCat5, resetLoggingCat5 } from '../../../../features/categorySlice';
import { generateFileExcel } from '../../../../features/fileSlice';
import { Toast } from '../../../../utils/Toast';
import { FACTORIES } from '../../../../utils/constanst';
import { useTranslation } from 'react-i18next';

type Props = {
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

  const formik = useFormik({
    initialValues: {
      dateFrom: dateFrom,
      dateTo: dateTo,
      factory: factory,
    },
    onSubmit: async (data) => {
      try {
        dispatch(resetLoggingCat5());
        setDateFrom(data.dateFrom);
        setDateTo(data.dateTo);
        setFactory(data.factory);
        dispatch(
          getLoggingCat5({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            factory: data.factory,
            page: 1,
            sortField: activeSort.sortField,
            sortOrder: activeSort.sortOrder,
          })
        );
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  useEffect(() => {}, []);

  //Export Excel
  const onExportExcel = async () => {
    const result = await dispatch(
      generateFileExcel({
        module: 'Cat7',
        dateFrom: formik.values.dateFrom,
        dateTo: formik.values.dateTo,
        factory: formik.values.factory,
      })
    );
    if (generateFileExcel.fulfilled.match(result)) {
      const { statusCode, message } = result.payload as {
        statusCode: number;
        message: string;
      };
      Toast.fire({
        title: message,
        icon: statusCode === 200 ? 'success' : 'error',
      });
    }
  };
  //Export Excel

  return (
    <form
      className="mb-5 grid grid-cols-4 gap-3"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center gap-1">
        <div>
          <Input
            label={t('main.date_from')}
            type="date"
            name="dateFrom"
            classNameLabel={'mb-2'}
            value={formik.values.dateFrom}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Input
            label={t('main.date_to')}
            type="date"
            name="dateTo"
            classNameLabel={'mb-2'}
            value={formik.values.dateTo}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Select
            label={t('main.factory')}
            name={'factory'}
            classNameLabel="mb-2"
            value={formik.values.factory}
            onChange={formik.handleChange}
            isShowAllSelect={true}
            showAllSelect={true}
            options={FACTORIES}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 mt-[29px]">
        <Button
          label={t('main.search')}
          type="submit"
          className="block text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer"
        />
        <button
          type="button"
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => onExportExcel()}
        >
          <img
            src={ExcelIcon}
            alt="excel-icon"
            className="w-10 object-contain"
          />
          <span className="whitespace-nowrap">{t('main.export_excel_file')}</span>
        </button>
      </div>
    </form>
  );
};

export default Search;
