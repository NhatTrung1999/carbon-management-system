import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAppDispatch } from '../../../app/hooks';
import { getSearch } from '../../../features/userSlice';
import { useTranslation } from 'react-i18next';
import Select from '../../common/Select';

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
      userid: '',
      name: '',
      role: '',
    },
    onSubmit: (data) => {
      const { userid, name } = data;
      dispatch(
        getSearch({
          userid,
          name,
        //   role,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        })
      );
    },
  });

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <Input
            label={t('usermmt.userid')}
            type="text"
            name="userid"
            classNameLabel="mb-2 text-sm sm:text-base"
            customClassNameInput="outline-none"
            value={formik.values.userid}
            onChange={formik.handleChange}
            placeholder="Enter user ID..."
          />
        </div>

        <div>
          <Input
            label={t('usermmt.name')}
            type="text"
            name="name"
            classNameLabel="mb-2 text-sm sm:text-base"
            customClassNameInput="outline-none"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter name..."
          />
        </div>

        <div>
            <Select
              label={t('usermmt.role')}
              name="role"
              classNameLabel="mb-2 text-sm sm:text-base"
              value={formik.values.role}
              onChange={formik.handleChange}
              isShowAllSelect={true}
              // showAllSelect={true}
              options={[]}
            />
        </div>
      </div>

    
      <div className="lg:hidden">
        <Button
          label={t('main.search')}
          type="submit"
          className="w-full text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer transition-colors duration-300"
        />
      </div>

      <div className="hidden lg:block">
        <Button
          label={t('main.search')}
          type="submit"
          className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer transition-colors duration-300"
        />
      </div>
    </form>
  );
};

export default Search;