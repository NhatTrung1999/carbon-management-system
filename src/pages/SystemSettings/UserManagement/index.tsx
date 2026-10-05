import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Table from '../../../components/SystemSettings/UserManagement/Table';
import Search, {
  type UserFilter,
} from '../../../components/SystemSettings/UserManagement/Search';
import ActionButton from '../../../components/SystemSettings/UserManagement/ActionButton';
import ModalUser from '../../../components/SystemSettings/UserManagement/ModalUser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteUser, getSearch } from '../../../features/userSlice';
import { HEADER, type IUserManagement } from '../../../types/users';
import { BREADCRUMB } from '../../../utils/constants';
import { Toast } from '../../../utils/Toast';
import ConfirmDialog from '../../../utils/ConfirmDialog';
import type { SortState } from '../../../types/table';
import i18n from '../../../i18n';

// ─── Types ───────────────────────────────────────────────────────────────────

type Mode = 'add' | 'edit';

// ─── Component ───────────────────────────────────────────────────────────────

const UserManagement = () => {
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('add');
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [item, setItem] = useState<IUserManagement | null>(null);
  const [activeSort, setActiveSort] = useState<SortState>({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [filter, setFilter] = useState<UserFilter>({ userid: '', name: '' });

  // Search and sort both reload through here, so neither drops the other.
  useEffect(() => {
    dispatch(getSearch({ ...filter, ...activeSort }));
  }, [dispatch, filter, activeSort]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleAdd = () => {
    setItem(null);
    setActiveRow(null);
    setMode('add');
    setIsOpen(true);
  };

  const handleEdit = () => {
    if (!activeRow)
      return Toast.fire({
        icon: 'warning',
        title: i18n.t('common.choose_row'),
      });
    setMode('edit');
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (!activeRow)
      return Toast.fire({
        icon: 'warning',
        title: i18n.t('common.choose_row'),
      });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmOpen(false);
    await dispatch(deleteUser(item?.ID as string));
    Toast.fire({ icon: 'success', title: i18n.t('common.deleted_success') });
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0 gap-4 px-2 sm:px-4">
      {/* Page header */}
      <div>
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('usermmt.user_management'))}
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          {t('usermmt.user_management')}
        </h1>
      </div>

      {/* Glass panel */}
      <div className="relative flex min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1 glass-panel">
        {/* Top shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-5 xl:min-h-0 xl:flex-1">
          {/* Toolbar row */}
          <div className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-lg">
              <Search onSearch={setFilter} />
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

      <ModalUser
        mode={mode}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        item={item}
      />
      <ConfirmDialog
        isOpen={confirmOpen}
        title={t('common.delete_confirm')}
        confirmText={t('common.delete')}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default UserManagement;
