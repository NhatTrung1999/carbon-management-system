import { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Table from '../../../components/SystemSettings/UserManagement/Table';
import Search from '../../../components/SystemSettings/UserManagement/Search';
import ActionButton from '../../../components/SystemSettings/UserManagement/ActionButton';
import { useAppDispatch } from '../../../app/hooks';
import { getSearch } from '../../../features/userSlice';
import ModalUser from '../../../components/SystemSettings/UserManagement/ModalUser';
import { Toast } from '../../../utils/Toast';
import type { Item } from '../../../types/users';



const UserManagement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [mode, setMode] = useState<string>('add');
  const [item, setItem] = useState<Item | null>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSearch({}));
  }, []);

  const handleAddUser = () => {
    setIsOpen(true);
    setActiveRow(null);
    setItem(null);
    setMode('add');
  };

  const handleEditUser = () => {
    if (activeRow) {
      setIsOpen(true);
      setMode('edit');
    } else {
      Toast.fire({
        icon: 'warning',
        title: 'Please choose row',
      });
    }
  };

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'User Management')}
      />

      <Typography
        name="User Management"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card className="relative">
        <div className="mb-5 grid grid-cols-2">
          <Search />
          <ActionButton
            handleAddUser={handleAddUser}
            handleEditUser={handleEditUser}
          />
        </div>
        <Table
          activeRow={activeRow}
          setActiveRow={setActiveRow}
          setItem={setItem}
        />
      </Card>
      <ModalUser
        mode={mode}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        item={item}
      />
    </Fragment>
  );
};

export default UserManagement;
