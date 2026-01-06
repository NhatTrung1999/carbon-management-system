import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAppDispatch } from '../../../app/hooks';
import { getData } from '../../../features/fileSlice';
import { useTranslation } from 'react-i18next';

type Props = {
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
};

const Search = ({ activeSort }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const formik = useFormik({
    initialValues: {
      module: '',
      file_name: '',
    },
    onSubmit: async (data) => {
      try {
        dispatch(
          getData({
            module: data.module,
            file_name: data.file_name,
            sortField: activeSort.sortField,
            sortOrder: activeSort.sortOrder,
          })
        );
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  return (
    <form
      className="mb-4 sm:mb-5 space-y-4"
      onSubmit={formik.handleSubmit}
    >
      {/* Search Inputs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        <div>
          <Input
            label={t('filemmt.module')}
            type="text"
            name="module"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={formik.values.module}
            onChange={formik.handleChange}
            placeholder="Enter module..."
          />
        </div>
        <div>
          <Input
            label={t('filemmt.file_name')}
            type="text"
            name="file_name"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={formik.values.file_name}
            onChange={formik.handleChange}
            placeholder="Enter file name..."
          />
        </div>
      </div>

      {/* Action Button Section */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          label={t('main.search')}
          type="submit"
          className="w-full sm:w-auto text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer transition-colors duration-300"
        />
      </div>
    </form>
  );
};

export default Search;