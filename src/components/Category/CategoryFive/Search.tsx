import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';

import ExcelIcon from '../../../assets/images/excel-icon.png';
import {
  getDataCat5,
  resetDataCat5,
  setDate,
} from '../../../features/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { generateFileExcel } from '../../../features/fileSlice';
import { Toast } from '../../../utils/Toast';

type Props = {
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
};

const Search = ({ activeSort }: Props) => {
  const { date } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      Date: new Date().toISOString().slice(0, 10),
    },
    onSubmit: async (data) => {
      try {
        dispatch(resetDataCat5());
        dispatch(setDate(data.Date));
        dispatch(
          getDataCat5({
            date: data.Date,
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

  //Export Excel
  const onExportExcel = async () => {
    const result = await dispatch(
      generateFileExcel({ module: 'Cat5', date })
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
