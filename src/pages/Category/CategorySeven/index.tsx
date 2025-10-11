import { Fragment, useState } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import Search from '../../../components/Category/CategorySeven/Search';
import Table from '../../../components/Category/CategorySeven/Table';
import { HEADER } from '../../../types/cat7';

const CategorySeven = () => {
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  const [dateFrom, setDateFrom] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [factory, setFactory] = useState<string>('LYV');

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'Category seven')}
      />

      <Typography
        name="Category seven"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Upstream transportation & distribution"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
      <Card>
        <Search
          activeSort={activeSort}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          factory={factory}
          setFactory={setFactory}
        />
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

export default CategorySeven;
