import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import MasterDataTab from '../../../components/Category/MasterDataTab';
import ModalTaxFreeZoneAddress from '../../../components/Category/CategoryOneAndCategoryFour/TaxFreeZoneAddress/ModalTaxFreeZoneAddress';
import { Td } from '../../../components/common/Table';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getTaxFreeZoneAddress,
  updateTaxFreeZoneAddress,
} from '../../../features/masterDataSlice';
import {
  type ITaxFreeZoneAddress,
  HEADER_TAX_FREE_ZONE_ADDRESS,
} from '../../../types/cat1andcat4';
import { formatDate } from '../../../utils/formatDate';
import { Toast } from '../../../utils/Toast';
import i18n from '../../../i18n';

const TaxFreeZoneAddress = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.masterData.taxFreeZoneAddress);
  const loading = useAppSelector((state) => state.masterData.loading);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<ITaxFreeZoneAddress | null>(
    null,
  );

  const handleEditClick = (item: ITaxFreeZoneAddress) => {
    setEditingId(item.ID);
    setEditFormData(item);
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    }
  };

  const handleSaveClick = async () => {
    if (!editFormData) return;
    const { ID, TaxFreeZoneAddress } = editFormData;
    handleCancelClick();
    try {
      await dispatch(
        updateTaxFreeZoneAddress({
          id: ID,
          taxFreeZoneAddress: TaxFreeZoneAddress,
        }),
      ).unwrap();
    } catch {
      Toast.fire({ icon: 'error', title: i18n.t('common.update_failed') });
    }
  };

  return (
    <MasterDataTab
      header={HEADER_TAX_FREE_ZONE_ADDRESS}
      data={data}
      loading={loading}
      fetch={(sort) => dispatch(getTaxFreeZoneAddress(sort))}
      ImportModal={ModalTaxFreeZoneAddress}
      renderRow={(item) => {
        const isEditing = editingId === item.ID;
        return (
          <>
            <Td>{item.No}</Td>
            <Td>{item.Factory}</Td>
            <Td>{item.SupplierID}</Td>
            <Td>{item.Country}</Td>
            <Td>
              {isEditing ? (
                <input
                  type="text"
                  name="TaxFreeZoneAddress"
                  value={editFormData?.TaxFreeZoneAddress}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                item.TaxFreeZoneAddress
              )}
            </Td>
            <Td>{item.CreatedBy}</Td>
            <Td>{formatDate(item.CreatedAt)}</Td>
            <Td>{item.UpdatedBy}</Td>
            <Td>{formatDate(item.UpdatedAt)}</Td>
            <Td>
              {isEditing ? (
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleSaveClick}
                    className="text-green-600 hover:text-green-800"
                    title={t('common.save')}
                  >
                    <FaSave size={18} />
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="text-red-500 hover:text-red-700"
                    title={t('common.cancel')}
                  >
                    <FaTimes size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-blue-600 hover:text-blue-800"
                  title={t('common.edit')}
                >
                  <FaEdit size={18} />
                </button>
              )}
            </Td>
          </>
        );
      }}
    />
  );
};

export default TaxFreeZoneAddress;
