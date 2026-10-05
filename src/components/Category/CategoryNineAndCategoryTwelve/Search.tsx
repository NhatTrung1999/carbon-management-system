import { useFormik } from 'formik';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getDataCat9AndCat12,
  resetDataCat9AndCat12,
} from '../../../features/categorySlice';
import { generateFileExcel, previewPayload } from '../../../features/fileSlice';
import { fetchDataAutoSendCMSCat9AndCat12 } from '../../../features/autosendcmsSlice';
import { createLogCat9AndCat12 } from '../../../features/logcatSlice';
import cmsApi from '../../../api/cms';
import { Toast } from '../../../utils/Toast';
import CategorySearchForm from '../CategorySearchForm';
import { toastStatus, logResultToastOptions } from '../../../utils/toastResult';
import i18n from '../../../i18n';

const DOCKEY_OPTIONS = [
  { name: '3.2 (CAT9)', value: '3.2' },
  { name: '5.3 (CAT12)', value: '5.3' },
];

const RY_OPTIONS = [
  { name: 'ALL', value: 'ALL' },
  { name: 'Product', value: 'Product' },
  { name: 'Component', value: 'Component' },
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
  activeSort: { sortField: string; sortOrder: string };
  dateFrom: string;
  setDateFrom: (v: string) => void;
  dateTo: string;
  setDateTo: (v: string) => void;
  factory: string;
  setFactory: (v: string) => void;
  dockey: string;
  setDockey: (v: string) => void;
  ry: string;
  setRY: (v: string) => void;
  loadingFetch: boolean;
  setLoadingFetch: (v: boolean) => void;
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
  ry,
  setRY,
  loadingFetch,
  setLoadingFetch,
}: Props) => {
  const { autoSendCMSCat9AndCat12 } = useAppSelector(
    (state) => state.autosendcms,
  );
  const [loadingCMS, setLoadingCMS] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { dateFrom, dateTo, factory, dockey, ry },
    onSubmit: async (data) => {
      dispatch(resetDataCat9AndCat12());
      setDateFrom(data.dateFrom);
      setDateTo(data.dateTo);
      setFactory(data.factory);
      setDockey(data.dockey);
      setRY(data.ry);
      dispatch(
        getDataCat9AndCat12({
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          factory: data.factory,
          ry: data.ry,
          page: 1,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        }),
      );
      setLoadingFetch(true);
      await dispatch(
        fetchDataAutoSendCMSCat9AndCat12({
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          factory: data.factory,
          ry: data.ry,
          dockey: data.dockey,
        }),
      );
      setLoadingFetch(false);
    },
  });

  const onExportExcel = async () => {
    setLoadingExcel(true);
    const result = await dispatch(
      generateFileExcel({
        module: 'Cat9AndCat12',
        dateFrom: formik.values.dateFrom,
        dateTo: formik.values.dateTo,
        factory: formik.values.factory,
        ry: formik.values.ry,
      }),
    );
    if (generateFileExcel.fulfilled.match(result)) {
      toastStatus(result.payload);
    }
    setLoadingExcel(false);
  };

  const onPreviewPayload = async () => {
    setLoadingPreview(true);
    const result = await dispatch(
      previewPayload({
        module: 'Cat9AndCat12',
        dateFrom: formik.values.dateFrom,
        dateTo: formik.values.dateTo,
        factory: formik.values.factory,
        ry: formik.values.ry,
        dockeyCMS: formik.values.dockey,
      }),
    );
    if (previewPayload.fulfilled.match(result)) {
      toastStatus(result.payload);
    }
    setLoadingPreview(false);
  };

  const onSendToCMS = async () => {
    setLoadingCMS(true);
    const response = await cmsApi.createCMS(autoSendCMSCat9AndCat12);
    if (response.std_data.execution.code === '0') {
      const result = await dispatch(
        createLogCat9AndCat12(autoSendCMSCat9AndCat12),
      );
      Toast.fire({
        ...logResultToastOptions(result),
        ...CMS_TOAST_BASE,
      });
    } else {
      Toast.fire({
        title: i18n.t('common.send_cms_failed'),
        icon: 'error',
        ...CMS_TOAST_BASE,
      });
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
      ryOptions={RY_OPTIONS}
      ry={formik.values.ry}
      cmsCount={autoSendCMSCat9AndCat12?.length ?? 0}
      loadingFetch={loadingFetch}
      loadingCMS={loadingCMS}
      loadingExcel={loadingExcel}
      loadingPreview={loadingPreview}
      onSendToCMS={onSendToCMS}
      onExportExcel={onExportExcel}
      onPreviewPayload={onPreviewPayload}
      isOpenRY={true}
    />
  );
};

export default Search;
