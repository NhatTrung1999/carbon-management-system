import { useFormik } from 'formik';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useTranslation } from 'react-i18next';

export type UserFilter = { userid: string; name: string };

type Props = {
  /** Called on submit; the page reloads the list with these filters. */
  onSearch: (filter: UserFilter) => void;
};

const Search = ({ onSearch }: Props) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { userid: '', name: '' },
    onSubmit: (data) => onSearch({ ...data }),
  });

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <Input
            label={t('usermmt.userid')}
            type="text"
            name="userid"
            classNameLabel="mb-2 text-sm sm:text-base"
            customClassNameInput="outline-none"
            value={formik.values.userid}
            onChange={formik.handleChange}
            placeholder={t('usermmt.enter_userid')}
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
            placeholder={t('usermmt.enter_name')}
          />
        </div>
      </div>

      <div className="lg:hidden">
        <Button
          label={t('main.search')}
          type="submit"
          variant="search"
          className="w-full"
        />
      </div>

      <div className="hidden lg:block">
        <Button label={t('main.search')} type="submit" variant="search" />
      </div>
    </form>
  );
};

export default Search;
