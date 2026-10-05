import { useTranslation } from 'react-i18next';
import CategoryPageLayout, {
  type CategoryTab,
} from '../../../components/Category/CategoryPageLayout';
import Cat9AndCat12 from './Cat9AndCat12';
import PortCode from './PortCode';
import Logging from './Logging';

const CategoryNineAndCategoryTwelvePage = () => {
  const { t } = useTranslation();

  const tabs: CategoryTab[] = [
    { label: t('cat9andcat12.cat_9_12'), render: () => <Cat9AndCat12 /> },
    { label: t('cat9andcat12.port_code'), render: () => <PortCode /> },
    { label: t('cat9andcat12.logging'), render: () => <Logging /> },
  ];

  return (
    <CategoryPageLayout
      category={t('cat9andcat12.cat_9_12')}
      title={t('cat9andcat12.downstream_and_endoflife')}
      tabs={tabs}
    />
  );
};

export default CategoryNineAndCategoryTwelvePage;
