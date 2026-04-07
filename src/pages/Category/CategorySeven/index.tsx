import { Fragment } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import { BREADCRUMB } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';
import Tabs from '../../../components/common/Tabs';
import Cat7 from './Cat7';
import CustomExport from './CustomExport';
import Logging from './Logging';
import DefaultAddress from './DefaultAddress';

const CategorySeven = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="px-3 sm:px-4 md:px-6">
        <Breadcrumb items={BreadcrumbData(t(BREADCRUMB), t('cat7.cat_7'))} />

        <div className="mb-4 sm:mb-6">
          <Typography
            name={t('cat7.cat_7')}
            className="block text-xs sm:text-sm font-semibold text-[#081c1b] mb-1 sm:mb-2"
          />
          <Typography
            name={t('cat7.employee_commuting')}
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
          />
        </div>

        <Card>
          <div className="overflow-hidden">
            <Tabs
              tabs={[
                {
                  label: 'GHG Inventory Template',
                  content: <Cat7 />,
                },
                {
                  label: 'Custom Export',
                  content: <CustomExport />,
                },
                {
                  label: 'Logging',
                  content: <Logging />,
                },
                {
                  label: 'Default Address',
                  content: <DefaultAddress />,
                },
              ]}
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default CategorySeven;
