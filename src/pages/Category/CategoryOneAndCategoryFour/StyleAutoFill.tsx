import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import MasterDataTab from '../../../components/Category/MasterDataTab';
import ModalStyleAutoFill from '../../../components/Category/CategoryOneAndCategoryFour/StyleAutoFill/ModalStyleAutoFill';
import { Td } from '../../../components/common/Table';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteStyleAutoFill,
  getStyleAutoFill,
} from '../../../features/masterDataSlice';
import {
  type IStyleAutoFill,
  HEADER_STYLE_AUTO_FILL,
} from '../../../types/cat1andcat4';
import ConfirmDialog from '../../../utils/ConfirmDialog';
import { formatDate } from '../../../utils/formatDate';
import { toastResult } from '../../../utils/toastResult';

const StyleAutoFill = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.masterData.styleAutoFill);
  const loading = useAppSelector((state) => state.masterData.loading);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IStyleAutoFill | null>(null);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const item = deleteTarget;
    setDeleteTarget(null);
    setDeletingId(item.Id);
    try {
      const res = await dispatch(deleteStyleAutoFill({ id: item.Id }));
      toastResult(res);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <MasterDataTab
      header={HEADER_STYLE_AUTO_FILL}
      data={data}
      loading={loading}
      fetch={(sort) => dispatch(getStyleAutoFill(sort))}
      ImportModal={ModalStyleAutoFill}
      renderRow={(item) => (
        <>
          <Td>{item.No}</Td>
          <Td>{item.PrefixOfMatCode}</Td>
          <Td>{item.Style}</Td>
          <Td>{item.CreatedBy}</Td>
          <Td>{formatDate(item.CreatedAt)}</Td>
          <Td>{item.UpdatedBy}</Td>
          <Td>{formatDate(item.UpdatedAt)}</Td>
          <Td>
            <button
              onClick={() => setDeleteTarget(item)}
              className="text-red-500 hover:text-red-700"
              title={t('common.delete')}
              disabled={deletingId === item.Id}
            >
              {deletingId === item.Id ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full" />
              ) : (
                <FaTrash size={18} color="#316fb5" />
              )}
            </button>
          </Td>
        </>
      )}
    >
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title={t('common.delete_confirm')}
        description={t('common.delete_prefix_confirm', {
          prefix: deleteTarget?.PrefixOfMatCode ?? '',
        })}
        confirmText={t('common.delete')}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </MasterDataTab>
  );
};

export default StyleAutoFill;
