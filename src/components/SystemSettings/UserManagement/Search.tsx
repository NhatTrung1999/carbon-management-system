import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAppDispatch } from '../../../app/hooks';
import { getSearch } from '../../../features/userSlice';

type Props = {
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
};

const Search = ({ activeSort }: Props) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      userid: '',
      name: '',
    },
    onSubmit: (data) => {
      const { userid, name } = data;
      dispatch(
        getSearch({
          userid,
          name,
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        })
      );
    },
  });

  return (
    <form className="grid grid-cols-3 gap-3" onSubmit={formik.handleSubmit}>
      <div>
        <Input
          label="UserID"
          type="text"
          name="userid"
          customClassNameInput="outline-none"
          value={formik.values.userid}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        <Input
          label="Name"
          type="text"
          name="name"
          customClassNameInput="outline-none"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        <div className="block whitespace-nowrap text-sm font-medium invisible">
          dfgg
        </div>
        <Button
          label="Search"
          type="submit"
          className="block text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer"
        />
      </div>
    </form>
  );
};

export default Search;
