import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';

import ExcelIcon from '../../../assets/images/excel-icon.png';
import SendIcon from '../../../assets/images/send-to-CMS.png';
import Select from '../../common/Select';
import Checkbox from '../../common/Checkbox';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { generateFileExcel, previewPayload } from '../../../features/fileSlice';
import {
  fetchDataAutoSendCMSCat6,
  fetchDataAutoSendCMSCat6Accommodation,
} from '../../../features/autosendcmsSlice';
import {
  createLogCat6BusinessTravel,
  createLogCat6Accommodation,
} from '../../../features/logcatSlice';
import cmsApi from '../../../api/cms';
import { Toast } from '../../../utils/Toast';
import { FACTORIES } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toastStatus, logResultToastOptions } from '../../../utils/toastResult';
import i18n from '../../../i18n';

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

const CAT6_PAYLOAD_TYPES = [
  { name: 'cat6.business_travel', value: 'business_travel' },
  { name: 'cat6.accommodation', value: 'accommodation' },
];

type Props = {
  dateFrom: string;
  setDateFrom: (dateVal: string) => void;
  dateTo: string;
  setDateTo: (dateVal: string) => void;
  factory: string;
  setFactory: (factoryVal: string) => void;
  onSearch: () => void;
  checkedDormShuttle: boolean;
  setCheckedDormShuttle: (value: boolean) => void;
};

const Search = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  factory,
  setFactory,
  onSearch,
  checkedDormShuttle,
  setCheckedDormShuttle,
}: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingCMS, setLoadingCMS] = useState(false);
  const [payloadType, setPayloadType] = useState<
    'business_travel' | 'accommodation'
  >('business_travel');

  const { autoSendCMSCat6, autoSendCMSCat6Accommodation } = useAppSelector(
    (state) => state.autosendcms,
  );
  const cmsPayload =
    payloadType === 'accommodation'
      ? autoSendCMSCat6Accommodation
      : autoSendCMSCat6;

  const formik = useFormik({
    initialValues: {
      dateFrom: dateFrom,
      dateTo: dateTo,
      factory: factory,
    },

    onSubmit: async (data) => {
      setDateFrom(data.dateFrom);
      setDateTo(data.dateTo);
      setFactory(data.factory);
      onSearch();
      if (payloadType === 'accommodation') {
        dispatch(
          fetchDataAutoSendCMSCat6Accommodation({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            factory: data.factory,
          }),
        );
      } else {
        dispatch(
          fetchDataAutoSendCMSCat6({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            factory: data.factory,
          }),
        );
      }
    },
  });

  const onPayloadTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextType = event.target.value as 'business_travel' | 'accommodation';
    setPayloadType(nextType);
    if (nextType === 'accommodation') {
      dispatch(
        fetchDataAutoSendCMSCat6Accommodation({
          dateFrom: formik.values.dateFrom,
          dateTo: formik.values.dateTo,
          factory: formik.values.factory,
        }),
      );
    } else {
      dispatch(
        fetchDataAutoSendCMSCat6({
          dateFrom: formik.values.dateFrom,
          dateTo: formik.values.dateTo,
          factory: formik.values.factory,
        }),
      );
    }
  };

  const onExportExcel = async () => {
    try {
      setLoadingExport(true);
      const result = await dispatch(
        generateFileExcel({
          module:
            payloadType === 'accommodation'
              ? 'Cat6Accommodation'
              : 'Cat6BusinessTravel',
          dateFrom: formik.values.dateFrom,
          dateTo: formik.values.dateTo,
          factory: formik.values.factory,
        }),
      );
      if (generateFileExcel.fulfilled.match(result)) {
        toastStatus(result.payload);
      }
    } finally {
      setLoadingExport(false);
    }
  };

  const onPreviewPayload = async () => {
    try {
      setLoadingPreview(true);
      const result = await dispatch(
        previewPayload({
          module: 'Cat6',
          dateFrom: formik.values.dateFrom,
          dateTo: formik.values.dateTo,
          factory: formik.values.factory,
          dockeyCMS: payloadType === 'accommodation' ? '3.5.5' : '3.5',
        }),
      );
      if (previewPayload.fulfilled.match(result)) {
        toastStatus(result.payload);
      }
    } finally {
      setLoadingPreview(false);
    }
  };

  const onSendToCMS = async () => {
    setLoadingCMS(true);
    try {
      const response = await cmsApi.createCMS(cmsPayload);
      if (response.std_data.execution.code === '0') {
        const logThunk =
          payloadType === 'accommodation'
            ? createLogCat6Accommodation
            : createLogCat6BusinessTravel;
        const result = await dispatch(logThunk(cmsPayload));
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
    } finally {
      setLoadingCMS(false);
    }
  };

  return (
    <form className="mb-4 sm:mb-5 space-y-4" onSubmit={formik.handleSubmit}>
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
        <div>
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
        <div>
          <Select
            label={t('common.type')}
            name="payloadType"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={payloadType}
            onChange={onPayloadTypeChange}
            options={CAT6_PAYLOAD_TYPES.map((o) => ({ ...o, name: t(o.name) }))}
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
        <Checkbox
          id="cat6-dorm-shuttle-check"
          title={t('cat6.dorm_shuttle')}
          checked={checkedDormShuttle}
          onChange={(event) => {
            setDateFrom(formik.values.dateFrom);
            setDateTo(formik.values.dateTo);
            setFactory(formik.values.factory);
            setCheckedDormShuttle(event.target.checked);
            onSearch();
          }}
        />
        <Button
          label={
            loadingCMS
              ? t('common.loading')
              : `${t('main.send_to_CMS')} (${cmsPayload.length})`
          }
          type="button"
          onClick={onSendToCMS}
          variant="cms"
          className="w-full sm:w-auto"
          imgSrc={SendIcon}
          disabled={loadingCMS || cmsPayload.length === 0}
        />
        <Button
          label={
            loadingExport ? t('common.loading') : t('main.export_excel_file')
          }
          type="button"
          onClick={onExportExcel}
          variant="excel"
          className="w-full sm:w-auto"
          imgSrc={ExcelIcon}
          disabled={loadingExport}
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
      </div>
    </form>
  );
};

export default Search;
