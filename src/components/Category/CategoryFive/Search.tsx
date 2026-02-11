import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';

import ExcelIcon from '../../../assets/images/excel-icon.png';
import SendIcon from '../../../assets/images/send-to-CMS.png';
import { getDataCat5, resetDataCat5 } from '../../../features/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { generateFileExcel } from '../../../features/fileSlice';
import { Toast } from '../../../utils/Toast';
import Select from '../../common/Select';
import { FACTORIES } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';
import { fetchDataAutoSendCMSCat5 } from '../../../features/autosendcmsSlice';
import { useState } from 'react';
import { createLogCat5 } from '../../../features/logcatSlice';
import cmsApi from '../../../api/cms';
// import axios from 'axios';

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
  dockey: string;
  setDockey: (factoryVal: string) => void;
};

const Search = ({
  activeSort,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  factory,
  setFactory,
  dockey,
  setDockey,
}: Props) => {
  const { autoSendCMSCat5 } = useAppSelector((state) => state.autosendcms);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      dateFrom: dateFrom,
      dateTo: dateTo,
      factory: factory,
      dockey: dockey,
    },
    onSubmit: async (data) => {
      try {
        dispatch(resetDataCat5());
        setDateFrom(data.dateFrom);
        setDateTo(data.dateTo);
        setFactory(data.factory);
        setDockey(data.dockey);
        await dispatch(
          getDataCat5({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            factory: data.factory,
            page: 1,
            sortField: activeSort.sortField,
            sortOrder: activeSort.sortOrder,
          })
        );
        await dispatch(
          fetchDataAutoSendCMSCat5({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            factory: data.factory,
            dockey: data.dockey,
          })
        );
        // console.log(res);
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  const onExportExcel = async () => {
    const result = await dispatch(
      generateFileExcel({
        module: 'Cat5',
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

  const onSendToCMS = async () => {
    // setLoading(true);
    // const response = await axios.post(
    //   '/api/dataIntegrate/create',
    //   autoSendCMSCat5
    // );
    // if (response.data.std_data.execution.code === '0') {
    //   let result = await dispatch(createLogCat5(autoSendCMSCat5 as any));
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
    const response = await cmsApi.createCMS(autoSendCMSCat5);
    if (response.std_data.execution.code === '0') {
      let result = await dispatch(createLogCat5(autoSendCMSCat5 as any));
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

  return (
    <form className="mb-4 sm:mb-5 space-y-4" onSubmit={formik.handleSubmit}>
      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
        <div className="sm:col-span-2 lg:col-span-1">
          <Select
            label={'Dockey'}
            name="dockey"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={formik.values.dockey}
            onChange={formik.handleChange}
            // isShowAllSelect={true}
            // showAllSelect={true}
            options={[
              { name: '3.6 (CAT4)', value: '3.6' },
              { name: '4.4 (CAT5)', value: '4.4' },
            ]}
          />
        </div>
      </div>

      {/* Action Buttons */}
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
          label={t('Export Excel file')}
          type="button"
          onClick={onExportExcel}
          className="w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-500/80 transition-colors duration-300"
          imgSrc={ExcelIcon}
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
          onClick={onSendToCMS}
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
