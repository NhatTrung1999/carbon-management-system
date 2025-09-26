import { Fragment } from 'react/jsx-runtime';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Card from '../../../components/common/Card';
import Search from '../../../components/Category/CategoryFive/Search';
import Table from '../../../components/Category/CategoryFive/Table';
import { useState } from 'react';
import { HEADER } from '../../../types/cat5';

const CategoryFive = () => {
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });
  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'Category five')}
      />

      <Typography
        name="Category five"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Waste generated in operations"
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

export default CategoryFive;
