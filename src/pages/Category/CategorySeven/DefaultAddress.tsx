import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaEdit, FaSave, FaSync, FaTimes, FaTrash } from 'react-icons/fa';
import MasterDataTab from '../../../components/Category/MasterDataTab';
import ModalDefaultAddress from '../../../components/Category/CategorySeven/DefaultAddress/ModalDefaultAddress';
import { Td } from '../../../components/common/Table';
import {
  ActionBtn,
  EditInput,
  Spinner,
} from '../../../components/common/TableControls';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteDefaultAddress,
  getDefaultAddress,
  syncDefaultAddress,
  updateDefaultAddress,
} from '../../../features/defaultaddressSlice';
import {
  type IDefaultAddress,
  HEADER_DEFAULT_ADDRESS,
} from '../../../types/defaultaddress';
import ConfirmDialog from '../../../utils/ConfirmDialog';
import { formatDate } from '../../../utils/formatDate';
import { toastResult } from '../../../utils/toastResult';

const DefaultAddress = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { defaultAddress, loading, loadingDelete } = useAppSelector(
    (s) => s.defaultaddress,
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<IDefaultAddress | null>(
    null,
  );
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (item: IDefaultAddress) => {
    setEditingId(item.ID);
    setEditFormData(item);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editFormData)
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editFormData) return;
    await dispatch(
      updateDefaultAddress({
        id: editFormData.ID,
        defaultAddress: editFormData.DefaultAddress,
      }),
    );
    handleCancel();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    toastResult(await dispatch(deleteDefaultAddress({ id })));
  };

  const handleSync = async (item: IDefaultAddress) => {
    setSyncingId(item.ID);
    const result = await dispatch(
      syncDefaultAddress({
        factory: item.Factory,
        defaultAddress: item.DefaultAddress,
      }),
    );
    setSyncingId(null);
    toastResult(result);
  };

  return (
    <MasterDataTab
      header={HEADER_DEFAULT_ADDRESS}
      data={defaultAddress}
      loading={loading}
      fetch={(sort) => dispatch(getDefaultAddress(sort))}
      ImportModal={ModalDefaultAddress}
      rowClassName={(item) =>
        editingId === item.ID ? 'bg-emerald-400/[0.04]' : undefined
      }
      renderRow={(item) => {
        const isEditing = editingId === item.ID;
        return (
          <>
            <Td>{item.No}</Td>
            <Td>{item.Factory}</Td>
            <Td>
              {isEditing ? (
                <EditInput
                  name="DefaultAddress"
                  value={editFormData?.DefaultAddress ?? ''}
                  onChange={handleInputChange}
                />
              ) : (
                item.DefaultAddress
              )}
            </Td>
            <Td>{item.CreatedBy}</Td>
            <Td>{formatDate(item.CreatedAt)}</Td>
            <Td>{item.UpdatedBy}</Td>
            <Td>{formatDate(item.UpdatedAt)}</Td>
            <Td>
              <div className="flex items-center justify-center gap-1.5">
                {isEditing ? (
                  <>
                    <ActionBtn
                      title={t('common.save')}
                      tone="emerald"
                      onClick={handleSave}
                    >
                      <FaSave size={14} />
                    </ActionBtn>
                    <ActionBtn
                      title={t('common.cancel')}
                      tone="red"
                      onClick={handleCancel}
                    >
                      <FaTimes size={14} />
                    </ActionBtn>
                  </>
                ) : (
                  <>
                    <ActionBtn
                      title={t('common.sync')}
                      tone="amber"
                      onClick={() => handleSync(item)}
                      disabled={syncingId === item.ID}
                    >
                      {syncingId === item.ID ? (
                        <Spinner className="border-amber-400" />
                      ) : (
                        <FaSync size={13} />
                      )}
                    </ActionBtn>
                    <ActionBtn
                      title={t('common.edit')}
                      tone="blue"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit size={13} />
                    </ActionBtn>
                    <ActionBtn
                      title={t('common.delete')}
                      tone="red"
                      onClick={() => setDeleteId(item.ID)}
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? (
                        <Spinner className="border-red-400" />
                      ) : (
                        <FaTrash size={13} />
                      )}
                    </ActionBtn>
                  </>
                )}
              </div>
            </Td>
          </>
        );
      }}
    >
      <ConfirmDialog
        isOpen={deleteId !== null}
        title={t('common.delete_confirm')}
        confirmText={t('common.delete')}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </MasterDataTab>
  );
};

export default DefaultAddress;
