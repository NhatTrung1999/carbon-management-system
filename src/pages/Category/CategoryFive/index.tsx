import { useTranslation } from 'react-i18next';
import CategoryPageLayout, {
  type CategoryTab,
} from '../../../components/Category/CategoryPageLayout';
import Cat5 from './Cat5';
import Logging from './Logging';

const CategoryFive = () => {
  const { t } = useTranslation();

  const tabs: CategoryTab[] = [
    { label: t('tabs.wg_in_operations'), render: () => <Cat5 /> },
    { label: t('cat5.logging'), render: () => <Logging /> },
  ];

  return (
    <CategoryPageLayout
      category={t('cat5.cat_5')}
      title={t('cat5.waste_generated_in_operations')}
      tabs={tabs}
    />
  );
};

export default CategoryFive;
