import { Fragment, useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import Search from '../../../components/Category/CategoryOneAndCategoryFour/Search';
import Table from '../../../components/Category/CategoryOneAndCategoryFour/Table';
import { HEADER } from '../../../types/cat1andcat4';

const CategoryOneAndCategoryFour = () => {

  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });
  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'Cat1 & Cat4')}
      />

      <Typography
        name="Cat1 & Cat4"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Purchased & Upstream"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card>
        <Search />
        <Table
          //   tableRef={tableRef}
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={[]}
        />
      </Card>
    </Fragment>
  );
};

export default CategoryOneAndCategoryFour;
