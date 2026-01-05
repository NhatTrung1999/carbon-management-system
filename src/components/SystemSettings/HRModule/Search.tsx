import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAppDispatch } from '../../../app/hooks';
// import { getData } from '../../../features/fileSlice';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ModalHR from './ModalHR';
import hrModuleAPi from '../../../api/hr';
import {
  fetchHRModule,
  resetDataHRModule,
} from '../../../features/hrmoduleSlice';

type Props = {
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
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
};

const Search = ({
  activeSort,
  dateFrom,
  dateTo,
  fullName,
  id,
  department,
  setDateFrom,
  setDateTo,
  setFullName,
  setId,
  setDepartment,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      fullName,
      id,
      department,
      dateFrom,
      dateTo,
    },
    onSubmit: async (data) => {
      try {
        dispatch(resetDataHRModule());
        setDateFrom(data.dateFrom);
        setDateTo(data.dateTo);
        setFullName(data.fullName);
        setId(data.id);
        setDepartment(data.department);
        dispatch(
          fetchHRModule({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            fullName: data.fullName,
            id: data.id,
            department: data.department,
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

  const onExportExcel = async () => {
    try {
      const res = await hrModuleAPi.exportToExcel(
        formik.values.dateFrom,
        formik.values.dateTo,
        formik.values.fullName,
        formik.values.id,
        formik.values.department
      );
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'danh_sach.xlsx');
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log('Loi khi tai Excel: ', error);
      alert('Khong the tai file Excel!');
    }
  };
  const onImportExcel = async () => {
    setIsOpen(true);
    // console.log('import excel');
    console.log(activeSort);
  };

  return (
    <>
      <form
        className="mb-5 flex gap-3 flex-wrap"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <Input
            label={'Date From'}
            type="date"
            name="dateFrom"
            classNameLabel={'mb-2'}
            value={formik.values.dateFrom}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Input
            label={'Date To'}
            type="date"
            name="dateTo"
            classNameLabel={'mb-2'}
            value={formik.values.dateTo}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Input
            label={'Full Name'}
            type="text"
            name="fullName"
            classNameLabel={'mb-2'}
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Input
            label={'ID'}
            type="text"
            name="id"
            classNameLabel={'mb-2'}
            value={formik.values.id}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Input
            label={'Department'}
            type="text"
            name="department"
            classNameLabel={'mb-2'}
            value={formik.values.department}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex mt-[29px] gap-3">
          <Button
            label={t('main.search')}
            type="submit"
            className="block text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer"
          />
          <button
            type="button"
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={onExportExcel}
          >
            <img
              src={ExcelIcon}
              alt="excel-icon"
              className="w-10 object-contain"
            />
            <span className="whitespace-nowrap">
              {t('main.export_excel_file')}
            </span>
          </button>
          <button
            type="button"
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={onImportExcel}
          >
            <img
              src={ExcelIcon}
              alt="excel-icon"
              className="w-10 object-contain"
            />
            <span className="whitespace-nowrap">{'Import Excel File'}</span>
          </button>
        </div>
      </form>
      {isOpen && <ModalHR setIsOpen={setIsOpen} />}
    </>
  );
};

export default Search;
