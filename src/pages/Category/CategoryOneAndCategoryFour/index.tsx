import { Fragment } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import { BREADCRUMB } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';
import Tabs from '../../../components/common/Tabs';
import Cat1AndCat4 from './Cat1AndCat4';
import PortCode from './PortCode';
import { HEADER_PORTCODE } from '../../../types/cat1andcat4';
import { useAppSelector } from '../../../app/hooks';

const CategoryOneAndCategoryFour = () => {
  const { portCodeCat1AndCat4 } = useAppSelector((state) => state.category);
  const { t } = useTranslation();

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData(t(BREADCRUMB), t('cat1andcat4.cat_1_4'))}
      />

      <Typography
        name={t('cat1andcat4.cat_1_4')}
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name={t('cat1andcat4.purchase_and_upstream')}
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card>
        <Tabs
          tabs={[
            {
              label: t('cat1andcat4.cat_1_4'),
              content: <Cat1AndCat4 />,
            },
            {
              label: 'Port Code',
              content: (
                <PortCode header={HEADER_PORTCODE} data={portCodeCat1AndCat4} />
              ),
            },
          ]}
        />
      </Card>
    </Fragment>
  );
};

export default CategoryOneAndCategoryFour;
