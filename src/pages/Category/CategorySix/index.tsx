import { Fragment, useState } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import Search from '../../../components/Category/CategorySix/Search';
import Table from '../../../components/Category/CategorySix/Table';
import { HEADER } from '../../../types/cat6';

const CategorySix = () => {
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'Category six')}
      />

      <Typography
        name="Category six"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Business travel"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card>
        <Search />
        <Table
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={[]}
        />
      </Card>
    </Fragment>
  );
};

export default CategorySix;
