import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAppDispatch } from '../../../app/hooks';
import { getData } from '../../../features/fileSlice';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ModalHR from './ModalHR';

type Props = {
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
};

const Search = ({ activeSort }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      fullname: '',
      id: '',
      department: '',
    },
    onSubmit: async (data) => {
      try {
        // const response = await fileManagementApi.getData({
        //   module: data.module,
        //   file_name: data.file_name,
        // });
        // if (response.data.statusCode === 200) {
        //   setGetFileManagementData(response.data.data);
        // }
        // dispatch(
        //   getData({
        //     module: data.module,
        //     file_name: data.file_name,
        //     sortField: activeSort.sortField,
        //     sortOrder: activeSort.sortOrder,
        //   })
        // );
        console.log(data);
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  // const getData = async () => {
  //   try {
  //     const response = await fileManagementApi.getData({
  //       module: formik.values.module,
  //       file_name: formik.values.file_name,
  //     });

  //     if (response.data.statusCode === 200) {
  //       setGetFileManagementData(response.data.data);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const onExportExcel = async () => {
    console.log('export excel');
  };
  const onImportExcel = async () => {
    setIsOpen(true);
    // console.log('import excel');
  };

  return (
    <>
      <form
        className="mb-5 flex gap-3 flex-wrap"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <Input
            label={'Full Name'}
            type="text"
            name="fullname"
            classNameLabel={'mb-2'}
            value={formik.values.fullname}
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
