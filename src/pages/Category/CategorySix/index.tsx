import { useTranslation } from 'react-i18next';
import CategoryPageLayout, {
  type CategoryTab,
} from '../../../components/Category/CategoryPageLayout';
import Cat6 from './Cat6';
import LoggingBusinessTravel from './LoggingBusinessTravel';
import LoggingAccommodation from './LoggingAccommodation';

const CategorySix = () => {
  const { t } = useTranslation();

  const tabs: CategoryTab[] = [
    { label: t('cat6.business_travel'), render: () => <Cat6 /> },
    {
      label: t('tabs.logging_business_travel'),
      render: () => <LoggingBusinessTravel />,
    },
    {
      label: t('tabs.logging_accommodation'),
      render: () => <LoggingAccommodation />,
    },
  ];

  return (
    <CategoryPageLayout
      category={t('cat6.cat_6')}
      title={t('cat6.business_travel')}
      tabs={tabs}
    />
  );
};

export default CategorySix;
