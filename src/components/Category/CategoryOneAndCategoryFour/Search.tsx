import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';

import ExcelIcon from '../../../assets/images/excel-icon.png';
import SendIcon from '../../../assets/images/send-to-CMS.png';
import Select from '../../common/Select';
import {
  getDataCat1AndCat4,
  resetDataCat1AndCat4,
} from '../../../features/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { generateFileExcel } from '../../../features/fileSlice';
import { Toast } from '../../../utils/Toast';
import { FACTORIES } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { fetchDataAutoSendCMSCat1AndCat4 } from '../../../features/autosendcmsSlice';
import { createLogCat1AndCat4 } from '../../../features/logcatSlice';
import cmsApi from '../../../api/cms';
import Checkbox from '../../common/Checkbox';

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
  usage: boolean;
  setUsage: (data: boolean) => void;
  unitWeight: boolean;
  setUnitWeight: (data: boolean) => void;
  weight: boolean;
  setWeight: (data: boolean) => void;
  departure: boolean;
  setDeparture: (data: boolean) => void;
};

const Search = ({
  activeSort,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  factory,
  setFactory,
  usage,
  setUsage,
  unitWeight,
  setUnitWeight,
  weight,
  setWeight,
  departure,
  setDeparture,
}: Props) => {
  const { autoSendCMSCat1AndCat4 } = useAppSelector(
    (state) => state.autosendcms
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExcel, setLoadingExcel] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      dateFrom: dateFrom,
      dateTo: dateTo,
      factory: factory,
      usage,
      unitWeight,
      weight,
      departure,
    },
    onSubmit: async (data) => {
      try {
        dispatch(resetDataCat1AndCat4());
        setDateFrom(data.dateFrom);
        setDateTo(data.dateTo);
        setFactory(data.factory);
        setUsage(data.usage);
        setUnitWeight(data.unitWeight);
        setWeight(data.weight);
        setDeparture(data.departure);
        await dispatch(
          getDataCat1AndCat4({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            factory: data.factory,
            usage: data.usage,
            unitWeight: data.unitWeight,
            weight: data.weight,
            departure: data.departure,
            page: 1,
            sortField: activeSort.sortField,
            sortOrder: activeSort.sortOrder,
          })
        );
        await dispatch(
          fetchDataAutoSendCMSCat1AndCat4({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            factory: data.factory,
          })
        );
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  //Export Excel
  const onExportExcel = async () => {
    setLoadingExcel(true);
    const result = await dispatch(
      generateFileExcel({
        module: 'Cat1AndCat4',
        dateFrom: formik.values.dateFrom,
        dateTo: formik.values.dateTo,
        factory: formik.values.factory,
        usage: formik.values.usage,
        unitWeight: formik.values.unitWeight,
        weight: formik.values.weight,
        departure: formik.values.departure,
      })
    );
    if (generateFileExcel.fulfilled.match(result)) {
      const { statusCode, message } = result.payload as {
        statusCode: number;
        message: string;
      };
      setLoadingExcel(false);
      Toast.fire({
        title: message,
        icon: statusCode === 200 ? 'success' : 'error',
      });
    }
  };
  //Export Excel

  //Send to CMS
  const onSendToCMS = async () => {
    // console.log(autoSendCMSCat1AndCat4);
    // setLoading(true);
    // const response = await axios.post(
    //   '/api/dataIntegrate/create',
    //   autoSendCMSCat1AndCat4
    // );
    // if (response.data.std_data.execution.code === '0') {
    //   let result = await dispatch(
    //     createLogCat1AndCat4(autoSendCMSCat1AndCat4 as any)
    //   );
    //   Toast.fire({
    //     title: result.payload.message,
    //     icon: result.payload.success ? 'success' : 'error',
    //   });
    //   setLoading(false);
    //   return;
    // } else {
    //   Toast.fire({
    //     title: 'Send to CMS failed!',
    //     icon: 'error',
    //   });
    //   setLoading(false);
    // }
    setLoading(true);
    const response = await cmsApi.createCMS(autoSendCMSCat1AndCat4);
    if (response.std_data.execution.code === '0') {
      let result = await dispatch(
        createLogCat1AndCat4(autoSendCMSCat1AndCat4 as any)
      );
      setLoading(false);
      Toast.fire({
        title: result.payload.message,
        icon: result.payload.success ? 'success' : 'error',
      });
      return;
    } else {
      setLoading(false);
      Toast.fire({
        title: 'Send to CMS failed!',
        icon: 'error',
      });
      return;
    }
  };
  //Send to CMS

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

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center">
        <Button
          label={t('main.search')}
          type="submit"
          className="w-full sm:w-auto text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer transition-colors duration-300"
        />
        <Button
          label={loading ? 'Loading...' : t('Send to CMS')}
          type="button"
          onClick={onSendToCMS}
          className={`w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg text-white bg-[#FFB619] hover:bg-[#FFB619]/80 transition-colors duration-300 ${
            loading ? 'hover:cursor-not-allowed' : ''
          }`}
          imgSrc={SendIcon}
          disabled={loading}
        />
        <Button
          label={loadingExcel ? 'Loading...' : t('Export Excel file')}
          type="button"
          onClick={onExportExcel}
          className={`w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-500/80 transition-colors duration-300 ${
            loadingExcel ? 'hover:cursor-not-allowed' : ''
          }`}
          imgSrc={ExcelIcon}
          disabled={loadingExcel}
        />
        <Checkbox
          title="Qty.(Usage)"
          id="usage"
          name="usage"
          checked={formik.values.usage}
          onChange={formik.handleChange}
        />
        <Checkbox
          title="Unit Weight"
          id="unitweight"
          name="unitWeight"
          checked={formik.values.unitWeight}
          onChange={formik.handleChange}
        />
        <Checkbox
          title="Weight (Unit: KG)"
          id="weight"
          name="weight"
          checked={formik.values.weight}
          onChange={formik.handleChange}
        />
        <Checkbox
          title="Departure"
          id="departure"
          name="departure"
          checked={formik.values.departure}
          onChange={formik.handleChange}
        />
        {/* <button
          type="button"
          className="w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          onClick={() => onExportExcel()}
        >
          <img
            src={ExcelIcon}
            alt="excel-icon"
            className="w-8 sm:w-10 object-contain"
          />
          <span className="whitespace-nowrap text-sm sm:text-base">
            {t('main.export_excel_file')}
          </span>
        </button> */}
        {/* <button
          type="button"
          className="w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg text-white bg-[#FFB619] hover:bg-[#FFB619]/80 transition-colors duration-300"
          onClick={() => onSendToCMS}
        >
          <img
            src={SendIcon}
            alt="excel-icon"
            className="w-8 sm:w-10 object-contain"
          />
          <span className="whitespace-nowrap text-sm sm:text-base">
            {t('Send to CMS')}
          </span>
        </button> */}
      </div>
    </form>
  );
};

export default Search;
