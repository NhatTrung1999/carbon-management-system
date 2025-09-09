import { Fragment } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Table from '../../../components/SystemSettings/UserManagement/Table';
import Search from '../../../components/SystemSettings/UserManagement/Search';
import ActionButton from '../../../components/SystemSettings/UserManagement/ActionButton';

const UserManagement = () => {
  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'User Management')}
      />

      <Typography
        name="User Management"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card className='relative'>
        <div className='mb-5 grid grid-cols-2'>
          <Search />
          <ActionButton />
        </div>
        <Table />
      </Card>
    </Fragment>
  );
};

export default UserManagement;
