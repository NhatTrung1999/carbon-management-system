import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';

import ExcelIcon from '../../../assets/images/excel-icon.png';
import { useEffect } from 'react';

const Search = () => {
  const formik = useFormik({
    initialValues: {
      Date: new Date().toISOString().slice(0, 10),
    },
    onSubmit: async (data) => {
      console.log(data);
      try {
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  useEffect(() => {}, []);

  //Export Excel
  const onExportExcel = async () => {};
  //Export Excel

  return (
    <form
      className="mb-5 grid grid-cols-8 gap-3"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <Input
          label={'Date'}
          type="date"
          name="Date"
          classNameLabel={'mb-2'}
          value={formik.values.Date}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-row gap-2 mt-[29px]">
        <Button
          label="Search"
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
          <span className="whitespace-nowrap">Import Excel</span>
        </button>
      </div>
    </form>
  );
};

export default Search;
