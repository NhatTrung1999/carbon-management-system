import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getDataCat1AndCat4, resetDataCat1AndCat4 } from '../../../features/categorySlice';
import { generateFileExcel, previewPayload } from '../../../features/fileSlice';
import { fetchDataAutoSendCMSCat1AndCat4 } from '../../../features/autosendcmsSlice';
import { createLogCat1AndCat4 } from '../../../features/logcatSlice';
import cmsApi from '../../../api/cms';
import { Toast } from '../../../utils/Toast';
import Checkbox from '../../common/Checkbox';
import CategorySearchForm from '../CategorySearchForm';

const DOCKEY_OPTIONS = [
  { name: '4.1 (CAT1)', value: '4.1' },
  { name: '3.1 (CAT4)', value: '3.1' },
];

const CMS_TOAST_BASE = {
  confirmButtonText: 'OK',
  toast: false,
  position: 'center' as const,
  showConfirmButton: true,
  timerProgressBar: false,
  timer: undefined,
  allowOutsideClick: false,
  allowEscapeKey: false,
};

type Props = {
  activeSort   : { sortField: string; sortOrder: string };
  dateFrom     : string; setDateFrom : (v: string) => void;
  dateTo       : string; setDateTo   : (v: string) => void;
  factory      : string; setFactory  : (v: string) => void;
  usage        : boolean; setUsage    : (v: boolean) => void;
  unitWeight   : boolean; setUnitWeight: (v: boolean) => void;
  weight       : boolean; setWeight   : (v: boolean) => void;
  departure    : boolean; setDeparture: (v: boolean) => void;
  dockey       : string; setDockey   : (v: string) => void;
  loadingFetch : boolean; setLoadingFetch: (v: boolean) => void;
};

const Search = ({
  activeSort,
  dateFrom, setDateFrom,
  dateTo,   setDateTo,
  factory,  setFactory,
  usage,    setUsage,
  unitWeight, setUnitWeight,
  weight,   setWeight,
  departure, setDeparture,
  dockey,   setDockey,
  loadingFetch, setLoadingFetch,
}: Props) => {
  const { autoSendCMSCat1AndCat4 } = useAppSelector((state) => state.autosendcms);
  const [loadingCMS,     setLoadingCMS]     = useState(false);
  const [loadingExcel,   setLoadingExcel]   = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { dateFrom, dateTo, factory, dockey, usage, unitWeight, weight, departure },
    onSubmit: async (data) => {
      try {
        dispatch(resetDataCat1AndCat4());
        setDateFrom(data.dateFrom);
        setDateTo(data.dateTo);
        setFactory(data.factory);
        setDockey(data.dockey);
        setUsage(data.usage);
        setUnitWeight(data.unitWeight);
        setWeight(data.weight);
        setDeparture(data.departure);
        await dispatch(getDataCat1AndCat4({
          dateFrom: data.dateFrom, dateTo: data.dateTo, factory: data.factory,
          usage: data.usage, unitWeight: data.unitWeight, weight: data.weight, departure: data.departure,
          page: 1, sortField: activeSort.sortField, sortOrder: activeSort.sortOrder,
        }));
        setLoadingFetch(true);
        await dispatch(fetchDataAutoSendCMSCat1AndCat4({
          dateFrom: data.dateFrom, dateTo: data.dateTo, factory: data.factory, dockey: data.dockey,
        }));
        setLoadingFetch(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onExportExcel = async () => {
    setLoadingExcel(true);
    const result = await dispatch(generateFileExcel({
      module: 'Cat1AndCat4',
      dateFrom: formik.values.dateFrom, dateTo: formik.values.dateTo, factory: formik.values.factory,
      usage: formik.values.usage, unitWeight: formik.values.unitWeight,
      weight: formik.values.weight, departure: formik.values.departure,
    }));
    if (generateFileExcel.fulfilled.match(result)) {
      const { statusCode, message } = result.payload as { statusCode: number; message: string };
      Toast.fire({ title: message, icon: statusCode === 200 ? 'success' : 'error' });
    }
    setLoadingExcel(false);
  };

  const onPreviewPayload = async () => {
    setLoadingPreview(true);
    const result = await dispatch(previewPayload({
      module: 'Cat1AndCat4',
      dateFrom: formik.values.dateFrom, dateTo: formik.values.dateTo, factory: formik.values.factory,
      dockeyCMS: formik.values.dockey,
    }));
    if (previewPayload.fulfilled.match(result)) {
      const { statusCode, message } = result.payload as { statusCode: number; message: string };
      Toast.fire({ title: message, icon: statusCode === 200 ? 'success' : 'error' });
    }
    setLoadingPreview(false);
  };

  const onSendToCMS = async () => {
    setLoadingCMS(true);
    const response = await cmsApi.createCMS(autoSendCMSCat1AndCat4);
    if (response.std_data.execution.code === '0') {
      const result = await dispatch(createLogCat1AndCat4(autoSendCMSCat1AndCat4 as any));
      Toast.fire({ title: result.payload.message, icon: result.payload.success ? 'success' : 'error', ...CMS_TOAST_BASE });
    } else {
      Toast.fire({ title: 'Send to CMS failed!', icon: 'error', ...CMS_TOAST_BASE });
    }
    setLoadingCMS(false);
  };

  return (
    <CategorySearchForm
      onSubmit={formik.handleSubmit}
      dateFrom={formik.values.dateFrom}
      dateTo={formik.values.dateTo}
      factory={formik.values.factory}
      handleChange={formik.handleChange}
      dockeyOptions={DOCKEY_OPTIONS}
      dockey={formik.values.dockey}
      cmsCount={autoSendCMSCat1AndCat4?.length ?? 0}
      loadingFetch={loadingFetch}
      loadingCMS={loadingCMS}
      loadingExcel={loadingExcel}
      loadingPreview={loadingPreview}
      onSendToCMS={onSendToCMS}
      onExportExcel={onExportExcel}
      onPreviewPayload={onPreviewPayload}
      extraFilters={
        <>
          <Checkbox title="Qty.(Usage)"       id="usage"       name="usage"       checked={formik.values.usage}       onChange={formik.handleChange} />
          <Checkbox title="Unit Weight"        id="unitweight"  name="unitWeight"  checked={formik.values.unitWeight}  onChange={formik.handleChange} />
          <Checkbox title="Weight (Unit: KG)"  id="weight"      name="weight"      checked={formik.values.weight}      onChange={formik.handleChange} />
          <Checkbox title="Departure"          id="departure"   name="departure"   checked={formik.values.departure}   onChange={formik.handleChange} />
        </>
      }
    />
  );
};

export default Search;
