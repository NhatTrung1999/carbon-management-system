import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../../common/Select';
import ModalHR from './ModalHR';
import hrApi from '../../../api/hr';
import {
  fetchDepartmentHRModule,
  fetchHRModule,
  resetDataHRModule,
} from '../../../features/hrmoduleSlice';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import type { SortState } from '../../../types/table';
import { downloadBlob } from '../../../utils/download';
import { Toast } from '../../../utils/Toast';
import i18n from '../../../i18n';

// ─── Types ───────────────────────────────────────────────────────────────────

type Props = {
  activeSort: SortState;
  dateFrom: string;
  setDateFrom: (val: string) => void;
  dateTo: string;
  setDateTo: (val: string) => void;
  fullName: string;
  setFullName: (val: string) => void;
  id: string;
  setId: (val: string) => void;
  department: string;
  setDepartment: (val: string) => void;
  joinDateFrom: string;
  setJoinDateFrom: (val: string) => void;
  joinDateTo: string;
  setJoinDateTo: (val: string) => void;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const normalizeDepartment = (val: string) =>
  val.toLowerCase().trim() === 'all' ? '' : val;

// ─── Component ───────────────────────────────────────────────────────────────

const Search = ({
  activeSort,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  fullName,
  setFullName,
  id,
  setId,
  department,
  setDepartment,
  joinDateFrom,
  setJoinDateFrom,
  joinDateTo,
  setJoinDateTo,
}: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [departmentOpts, setDepartmentOpts] = useState<
    { name: string; value: string }[]
  >([]);

  // ── Fetch department options ───────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const res = await dispatch(fetchDepartmentHRModule());
      if (!fetchDepartmentHRModule.fulfilled.match(res)) return;
      // API returns { label, value }[] — remap to { name, value }[] for our Select
      setDepartmentOpts(
        res.payload.map((o) => ({ name: o.label, value: o.value })),
      );
    };
    load();
  }, [dispatch]);

  // ── Formik ────────────────────────────────────────────────────────────────
  const formik = useFormik({
    initialValues: {
      fullName,
      id,
      department,
      dateFrom,
      dateTo,
      joinDateFrom,
      joinDateTo,
    },
    onSubmit: (data) => {
      dispatch(resetDataHRModule());
      setDateFrom(data.dateFrom);
      setDateTo(data.dateTo);
      setFullName(data.fullName);
      setId(data.id);
      setDepartment(data.department);
      setJoinDateFrom(data.joinDateFrom);
      setJoinDateTo(data.joinDateTo);
      dispatch(
        fetchHRModule({
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          fullName: data.fullName,
          id: data.id,
          department: normalizeDepartment(data.department),
          joinDateFrom: data.joinDateFrom,
          joinDateTo: data.joinDateTo,
          page: 1,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        }),
      );
    },
  });

  // ── Export ────────────────────────────────────────────────────────────────
  const handleExport = async () => {
    try {
      const res = await hrApi.exportToExcel({
        ...formik.values,
        department: normalizeDepartment(formik.values.department),
      });
      downloadBlob(res, 'danh_sach.xlsx');
    } catch {
      Toast.fire({ icon: 'error', title: i18n.t('common.export_failed') });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        {/* Filter grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <Input
            label={t('main.date_from')}
            type="date"
            name="dateFrom"
            value={formik.values.dateFrom}
            onChange={formik.handleChange}
          />
          <Input
            label={t('main.date_to')}
            type="date"
            name="dateTo"
            value={formik.values.dateTo}
            onChange={formik.handleChange}
          />
          <Input
            label={t('dataHRCollecMod.fullname')}
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          <Input
            label={t('dataHRCollecMod.id')}
            type="text"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
          />

          {/* Department — custom Select thay react-select */}
          <Select
            label={t('dataHRCollecMod.department')}
            name="department"
            value={formik.values.department}
            onChange={(e) => formik.setFieldValue('department', e.target.value)}
            options={departmentOpts}
            isShowAllSelect
            showAllSelect
          />

          <Input
            label={t('dataHRCollecMod.join_date_from')}
            type="date"
            name="joinDateFrom"
            value={formik.values.joinDateFrom}
            onChange={formik.handleChange}
          />
          <Input
            label={t('dataHRCollecMod.join_date_to')}
            type="date"
            name="joinDateTo"
            value={formik.values.joinDateTo}
            onChange={formik.handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button label={t('main.search')} type="submit" variant="primary" />
          <Button
            label={t('main.export_excel_file')}
            type="button"
            variant="primary"
            imgSrc={ExcelIcon}
            onClick={handleExport}
          />
          <Button
            label={t('main.import_excel_file')}
            type="button"
            variant="primary"
            imgSrc={ExcelIcon}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </form>

      {isOpen && <ModalHR setIsOpen={setIsOpen} />}
    </>
  );
};

export default Search;
