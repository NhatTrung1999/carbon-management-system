import { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Table from '../../../components/SystemSettings/SystemDecentralization/Table';
import Search from '../../../components/SystemSettings/SystemDecentralization/Search';
import ActionButton from '../../../components/SystemSettings/UserManagement/ActionButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteUser, getSearch } from '../../../features/userSlice';
import ModalUser from '../../../components/SystemSettings/UserManagement/ModalUser';
import { Toast } from '../../../utils/Toast';
import Swal from 'sweetalert2';
import { HEADER, type IUserManagement } from '../../../types/users';
import { useTranslation } from 'react-i18next';
import { BREADCRUMB } from '../../../utils/constanst';

const SystemDecentralization = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [mode, setMode] = useState<string>('add');
  const [item, setItem] = useState<IUserManagement | null>();

  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getSearch({
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [activeSort]);

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

  const handleDeleteUser = () => {
    if (activeRow) {
      Swal.fire({
        text: 'Do you want to delete this data?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUser(item?.ID as string));
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      });
    } else {
      Toast.fire({
        icon: 'warning',
        title: 'Please choose row',
      });
    }
  };

  return (
    <Fragment>
      <div className="px-3 sm:px-4 md:px-6">
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('system_decentral.system_decentralization'))}
        />

        <div className="mb-4 sm:mb-6">
          <Typography
            name={t('system_decentral.system_decentralization')}
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
          />
        </div>

        <Card className="relative">
          <div className="mb-5 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">            
            <div className="w-full">
              <Search activeSort={activeSort} />
            </div>
          
            <div className="w-full flex items-end justify-start lg:justify-end">
              <ActionButton
                handleAddUser={handleAddUser}
                handleEditUser={handleEditUser}
                handleDeleteUser={handleDeleteUser}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table
              header={HEADER}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
              data={users}
              activeRow={activeRow}
              setActiveRow={setActiveRow}
              setItem={setItem}
            />
          </div>
        </Card>

        {/* Modal */}
        <ModalUser
          mode={mode}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          item={item}
        />
      </div>
    </Fragment>
  );
};

export default SystemDecentralization;