import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Table from '../../../components/SystemSettings/SystemDecentralization/Table';
import Search from '../../../components/SystemSettings/SystemDecentralization/Search';
import ActionButton from '../../../components/SystemSettings/UserManagement/ActionButton';
import ModalUser from '../../../components/SystemSettings/UserManagement/ModalUser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteUser, getSearch } from '../../../features/userSlice';
import { HEADER, type IUserManagement } from '../../../types/users';
import { BREADCRUMB } from '../../../utils/constanst';
import { Toast } from '../../../utils/Toast';
import Swal from 'sweetalert2';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };
type Mode      = 'add' | 'edit';

// ─── Component ───────────────────────────────────────────────────────────────

const SystemDecentralization = () => {
  const { users } = useAppSelector((state) => state.user);
  const dispatch  = useAppDispatch();
  const { t }     = useTranslation();

  const [isOpen,     setIsOpen]     = useState(false);
  const [mode,       setMode]       = useState<Mode>('add');
  const [activeRow,  setActiveRow]  = useState<string | null>(null);
  const [item,       setItem]       = useState<IUserManagement | null>(null);
  const [activeSort, setActiveSort] = useState<SortState>({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  useEffect(() => {
    dispatch(getSearch({ sortField: activeSort.sortField, sortOrder: activeSort.sortOrder }));
  }, [activeSort]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleAdd = () => {
    setItem(null);
    setActiveRow(null);
    setMode('add');
    setIsOpen(true);
  };

  const handleEdit = () => {
    if (!activeRow) return Toast.fire({ icon: 'warning', title: 'Please choose row' });
    setMode('edit');
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (!activeRow) return Toast.fire({ icon: 'warning', title: 'Please choose row' });
    Swal.fire({
      text             : 'Do you want to delete this data?',
      icon             : 'warning',
      showCancelButton : true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Yes',
    }).then((result) => {
      if (!result.isConfirmed) return;
      dispatch(deleteUser(item?.ID as string));
      Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success' });
    });
  };

  return (
    <div className="flex flex-col gap-5 px-2 sm:px-4">

      {/* Page header */}
      <div>
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('system_decentral.system_decentralization'))}
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          {t('system_decentral.system_decentralization')}
        </h1>
      </div>

      {/* Glass panel */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.10]
        bg-white/[0.05] shadow-[0_8px_40px_rgba(0,0,0,0.30)] backdrop-blur-[32px]">

        {/* Top shimmer */}
        <div className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="flex flex-col gap-4 p-5">

          {/* Toolbar */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-lg">
              <Search activeSort={activeSort} />
            </div>
            <ActionButton
              handleAddUser={handleAdd}
              handleEditUser={handleEdit}
              handleDeleteUser={handleDelete}
            />
          </div>

          {/* Table */}
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
      </div>

      <ModalUser mode={mode} isOpen={isOpen} setIsOpen={setIsOpen} item={item} />
    </div>
  );
};

export default SystemDecentralization;