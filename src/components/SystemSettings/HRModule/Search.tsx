import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAppDispatch } from '../../../app/hooks';
// import { getData } from '../../../features/fileSlice';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import ModalHR from './ModalHR';
import hrModuleAPi from '../../../api/hr';
import {
  fetchDepartmentHRModule,
  fetchHRModule,
  resetDataHRModule,
} from '../../../features/hrmoduleSlice';
// import Select from '../../common/Select';
import Select from 'react-select';

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
  joinDate: string;
  setJoinDate: (val: string) => void;
};

const Search = ({
  activeSort,
  dateFrom,
  dateTo,
  fullName,
  id,
  department,
  joinDate,
  setDateFrom,
  setDateTo,
  setFullName,
  setId,
  setDepartment,
  setJoinDate,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [departmentHR, setDepartmentHR] = useState<
    { label: string; value: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const getDepartment = async () => {
      const res = await dispatch(fetchDepartmentHRModule());
      setDepartmentHR(res.payload);
    };
    getDepartment();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName,
      id,
      department,
      dateFrom,
      dateTo,
      joinDate,
    },
    onSubmit: async (data) => {
      console.log(data);
      try {
        dispatch(resetDataHRModule());
        setDateFrom(data.dateFrom);
        setDateTo(data.dateTo);
        setFullName(data.fullName);
        setId(data.id);
        setDepartment(data.department);
        setJoinDate(data.joinDate);
        dispatch(
          fetchHRModule({
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            fullName: data.fullName,
            id: data.id,
            department:
              data.department.toLowerCase().trim() === 'all'
                ? ''
                : data.department,
            joinDate: data.joinDate,
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
        formik.values.department.toLowerCase().trim() === 'all'
          ? ''
          : formik.values.department,
        formik.values.joinDate
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
      <form className="mb-4 sm:mb-5 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          <div>
            <Input
              label={'Date From'}
              type="date"
              name="dateFrom"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={formik.values.dateFrom}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Input
              label={'Date To'}
              type="date"
              name="dateTo"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={formik.values.dateTo}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Input
              label={'Full Name'}
              type="text"
              name="fullName"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Input
              label={'ID'}
              type="text"
              name="id"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            {/* <Input
              label={'Department'}
              type="text"
              name="department"
              classNameLabel={'mb-2'}
              value={formik.values.department}
              onChange={formik.handleChange}
            /> */}
            {/* <Select
              label={'Department'}
              name="department"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={formik.values.department}
              onChange={formik.handleChange}
              isShowAllSelect={true}
              // showAllSelect={true}
              options={departmentHR}
            /> */}
            <label
              htmlFor="department"
              className="mb-2 text-sm sm:text-base whitespace-nowrap block font-medium"
            >
              Department
            </label>
            <Select
              id="department"
              options={departmentHR}
              placeholder=""
              isClearable={true}
              value={
                departmentHR.find(
                  (opt) => opt.value === formik.values.department
                ) || null
              }
              onChange={(option) =>
                formik.setFieldValue('department', option ? option.value : '')
              }
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#d1d5dc',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f9fafb',
                  fontSize: '0.875rem',
                  minHeight: '42px',
                  height: '42px',
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  fontSize: `14px`,
                }),
              }}
            />
          </div>
          <div>
            <Input
              label={'Join Date'}
              type="date"
              name="joinDate"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={formik.values.joinDate}
              onChange={formik.handleChange}
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
            label={t('Export Excel file')}
            type="button"
            onClick={onExportExcel}
            className="w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-500/80 transition-colors duration-300"
            imgSrc={ExcelIcon}
          />
          <Button
            label={t('Import Excel file')}
            type="button"
            onClick={onImportExcel}
            className="w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-500/80 transition-colors duration-300"
            imgSrc={ExcelIcon}
          />
          {/* <button
            type="button"
            className="w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={onExportExcel}
          >
            <img
              src={ExcelIcon}
              alt="excel-icon"
              className="w-8 sm:w-10 object-contain"
            />
            <span className="whitespace-nowrap text-sm sm:text-base">
              {t('main.export_excel_file')}
            </span>
          </button>
          <button
            type="button"
            className="w-full sm:w-auto flex flex-row gap-2 items-center justify-center sm:justify-start cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={onImportExcel}
          >
            <img
              src={ExcelIcon}
              alt="excel-icon"
              className="w-8 sm:w-10 object-contain"
            />
            <span className="whitespace-nowrap text-sm sm:text-base">{'Import Excel File'}</span>
          </button> */}
        </div>
      </form>
      {isOpen && <ModalHR setIsOpen={setIsOpen} />}
    </>
  );
};

export default Search;
