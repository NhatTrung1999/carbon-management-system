import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useTranslation } from 'react-i18next';

export type FileFilter = { module: string; file_name: string };

type Props = {
  /** Called on submit; the page reloads the list with these filters. */
  onSearch: (filter: FileFilter) => void;
};

const Search = ({ onSearch }: Props) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { module: '', file_name: '' },
    onSubmit: (data) => onSearch({ ...data }),
  });

  return (
    <form className="mb-4 sm:mb-5 space-y-4" onSubmit={formik.handleSubmit}>
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
            placeholder={t('filemmt.enter_module')}
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
            placeholder={t('filemmt.enter_file_name')}
          />
        </div>
      </div>

      {/* Action Button Section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
        <Button
          label={t('main.search')}
          type="submit"
          variant="search"
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
};

export default Search;
