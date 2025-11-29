import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAppDispatch } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';
import { getInfoFactory } from '../../../features/infofactorySlice';

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
      companyName: '',
      city: '',
    },
    onSubmit: async (data) => {
      try {
        dispatch(
          getInfoFactory({
            companyName: data.companyName,
            city: data.city,
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
      className="mb-5 grid grid-cols-8 gap-3"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <Input
          label={'Company Name'}
          type="text"
          name="companyName"
          classNameLabel={'mb-2'}
          value={formik.values.companyName}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <Input
          label={'City'}
          type="text"
          name="city"
          classNameLabel={'mb-2'}
          value={formik.values.city}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-row gap-2 mt-[29px]">
        <Button
          label={t('main.search')}
          type="submit"
          className="block text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer"
        />
      </div>
    </form>
  );
};

export default Search;
