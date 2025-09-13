import { Fragment } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import { BreadcrumbData } from '../../../types/breadcrumb';

const CategoryFour = () => {
  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'Category four')}
      />

      <Typography
        name="Category four"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Upstream transportation & distribution"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
    </Fragment>
  );
};

export default CategoryFour;
