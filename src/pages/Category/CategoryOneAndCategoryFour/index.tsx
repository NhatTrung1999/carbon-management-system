import { useTranslation } from 'react-i18next';
import CategoryPageLayout, {
  type CategoryTab,
} from '../../../components/Category/CategoryPageLayout';
import Cat1AndCat4 from './Cat1AndCat4';
import PortCode from './PortCode';
import Logging from './Logging';
import TaxFreeZoneAddress from './TaxFreeZoneAddress';
import VerificationReport from './VerificationReport';
import StyleAutoFill from './StyleAutoFill';

const CategoryOneAndCategoryFour = () => {
  const { t } = useTranslation();

  const tabs: CategoryTab[] = [
    { label: t('cat1andcat4.cat_1_4'), render: () => <Cat1AndCat4 /> },
    { label: t('cat1andcat4.port_code'), render: () => <PortCode /> },
    { label: t('cat1andcat4.logging'), render: () => <Logging /> },
    {
      label: t('tabs.tax_free_zone_address'),
      render: () => <TaxFreeZoneAddress />,
    },
    {
      label: t('tabs.verification_report'),
      render: () => <VerificationReport />,
    },
    { label: t('tabs.style_auto_fill'), render: () => <StyleAutoFill /> },
  ];

  return (
    <CategoryPageLayout
      category={t('cat1andcat4.cat_1_4')}
      title={t('cat1andcat4.purchase_and_upstream')}
      tabs={tabs}
    />
  );
};

export default CategoryOneAndCategoryFour;
