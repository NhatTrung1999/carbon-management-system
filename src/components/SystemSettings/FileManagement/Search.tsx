import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAppDispatch } from '../../../app/hooks';
import { getData } from '../../../features/fileSlice';

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
      module: '',
      file_name: '',
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

  return (
    <form
      className="mb-5 grid grid-cols-8 gap-3"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <Input
          label={'Company Name'}
          type="text"
          name="module"
          classNameLabel={'mb-2'}
          value={formik.values.module}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <Input
          label={'Account No'}
          type="text"
          name="file_name"
          classNameLabel={'mb-2'}
          value={formik.values.file_name}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-row gap-2 mt-[29px]">
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
