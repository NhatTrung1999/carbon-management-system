import { Fragment, useEffect, useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Card from '../../../components/common/Card';
import Table from '../../../components/SystemSettings/InfoFactoryManagement/Table';
import Typography from '../../../components/common/Typography';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search from '../../../components/SystemSettings/InfoFactoryManagement/Search';
import { HEADER } from '../../../types/infofactorymanagement';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getInfoFactory } from '../../../features/infofactorySlice';

const InfoFactoryManagement = () => {
  const { infofactory } = useAppSelector((state) => state.infofactory);
  const dispatch = useAppDispatch();

  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  useEffect(() => {
    dispatch(
      getInfoFactory({
        companyName: '',
        city: '',
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, []);

  return (
    <Fragment>
      <div className="px-3 sm:px-4 md:px-6">
        <Breadcrumb
          items={BreadcrumbData(
            'Carbon Management System',
            'Info Factory Management'
          )}
        />

        <div className="mb-4 sm:mb-6">
          <Typography
            name="Info Factory Management"
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
          />
        </div>

        <Card className="relative">
          <div className="overflow-hidden">
            <Search activeSort={activeSort} />
            <Table
              header={HEADER}
              data={infofactory}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default InfoFactoryManagement;
