import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useTranslation } from 'react-i18next';

export type InfoFactoryFilter = { companyName: string; city: string };

type Props = {
  /** Called on submit; the page reloads the list with these filters. */
  onSearch: (filter: InfoFactoryFilter) => void;
};

const Search = ({ onSearch }: Props) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { companyName: '', city: '' },
    onSubmit: (data) => onSearch({ ...data }),
  });

  return (
    <form className="mb-4 sm:mb-5 space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        <div>
          <Input
            label={t('facinfo.com_name')}
            type="text"
            name="companyName"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            placeholder={t('facinfo.enter_company_name')}
          />
        </div>
        <div>
          <Input
            label={t('facinfo.city')}
            type="text"
            name="city"
            classNameLabel="mb-2 text-sm sm:text-base"
            value={formik.values.city}
            onChange={formik.handleChange}
            placeholder={t('facinfo.enter_city')}
          />
        </div>
      </div>

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
