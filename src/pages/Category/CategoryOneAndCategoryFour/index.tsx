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
import Logging from './Logging';
import { HEADER_PORTCODE } from '../../../types/cat1andcat4';
import { useAppSelector } from '../../../app/hooks';

const CategoryOneAndCategoryFour = () => {
  const { portCodeCat1AndCat4 } = useAppSelector((state) => state.category);
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="px-3 sm:px-4 md:px-6">
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('cat1andcat4.cat_1_4'))}
        />

        <div className="mb-4 sm:mb-6">
          <Typography
            name={t('cat1andcat4.cat_1_4')}
            className="block text-xs sm:text-sm font-semibold text-[#081c1b] mb-1 sm:mb-2"
          />
          <Typography
            name={t('cat1andcat4.purchase_and_upstream')}
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
          />
        </div>

        <Card>
          <div className="overflow-hidden">
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
                {
                  label: 'Logging',
                  content: <Logging />,
                }
              ]}
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default CategoryOneAndCategoryFour;
