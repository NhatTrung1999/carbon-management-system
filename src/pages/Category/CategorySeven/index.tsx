import { useTranslation } from 'react-i18next';
import CategoryPageLayout, {
  type CategoryTab,
} from '../../../components/Category/CategoryPageLayout';
import Cat7 from './Cat7';
import CustomExport from './CustomExport';
import Logging from './Logging';
import DefaultAddress from './DefaultAddress';

const CategorySeven = () => {
  const { t } = useTranslation();

  const tabs: CategoryTab[] = [
    { label: t('cat7.GHG_inventory_template'), render: () => <Cat7 /> },
    { label: t('cat7.custom_export'), render: () => <CustomExport /> },
    { label: t('cat7.logging'), render: () => <Logging /> },
    { label: t('tabs.default_address'), render: () => <DefaultAddress /> },
  ];

  return (
    <CategoryPageLayout
      category={t('cat7.cat_7')}
      title={t('cat7.employee_commuting')}
      tabs={tabs}
    />
  );
};

export default CategorySeven;
