import Button from '../../../components/common/Button';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import type { TableHeaderProps } from '../../../types/table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { FaEdit, FaSave, FaSync, FaTimes, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import NoData from '../../../assets/images/no-data.png';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { formatDate } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';

import {
  type IDefaultAddress,
  HEADER_DEFAULT_ADDRESS,
} from '../../../types/defaultaddress';
import ModalDefaultAddress from '../../../components/Category/CategorySeven/DefaultAddress/ModalDefaultAddress';
import {
  deleteDefaultAddress,
  getDefaultAddress,
  syncDefaultAddress,
  updateDefaultAddress,
} from '../../../features/defaultaddressSlice';
import { Toast } from '../../../utils/Toast';

const DefaultAddress = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { defaultAddress, loading, loadingDelete } = useAppSelector(
    (state) => state.defaultaddress
  );
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER_DEFAULT_ADDRESS[0].state,
    sortOrder: 'asc',
  });
  const { t } = useTranslation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<IDefaultAddress | null>(
    null
  );
  const [syncingId, setSyncingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(
      getDefaultAddress({
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [activeSort]);

  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
  };

  const handleEditClick = (item: IDefaultAddress) => {
    setEditingId(item.ID);
    setEditFormData(item);
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveClick = async () => {
    if (editFormData) {
      await dispatch(
        updateDefaultAddress({
          id: editFormData.ID,
          defaultAddress: editFormData.DefaultAddress,
        })
      );
      setEditingId(null);
      setEditFormData(null);
    }
  };

  const renderSortIcon = (item: TableHeaderProps) =>
    item.state !== 'Action' && (
      <div className="flex flex-col ml-1">
        <TiArrowSortedUp
          size={16}
          className={`cursor-pointer transition-colors ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'asc'
              ? 'text-stone-700'
              : 'text-white/60 hover:text-white'
          }`}
          onClick={() => handleSorting(item.state, 'asc')}
        />
        <TiArrowSortedDown
          size={16}
          className={`cursor-pointer transition-colors ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'desc'
              ? 'text-stone-700'
              : 'text-white/60 hover:text-white'
          }`}
          onClick={() => handleSorting(item.state, 'desc')}
        />
      </div>
    );

  const handleImportExcel = () => {
    setIsOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    const res = await dispatch(deleteDefaultAddress({ id }));
    if (deleteDefaultAddress.fulfilled.match(res)) {
      Toast.fire({
        title: res.payload.message,
        icon: 'success',
      });
    } else {
      Toast.fire({
        title: res.payload as string,
        icon: 'error',
      });
    }
  };

  const getTableHeight = () => {
    if (loading && defaultAddress.length === 0) {
      return 'max-h-[250px]';
    }
    if (defaultAddress.length === 0 && !loading) {
      return 'max-h-[300px]';
    }
    return 'max-h-[400px] sm:max-h-[500px] md:max-h-[600px]';
  };

  const handleSyncClick = async (item: IDefaultAddress) => {
    setSyncingId(item.ID);
    const result = await dispatch(
      syncDefaultAddress({
        factory: item.Factory,
        defaultAddress: item.DefaultAddress,
      })
    );
    setSyncingId(null);
    if (syncDefaultAddress.fulfilled.match(result)) {
      Toast.fire({
        title: result.payload.message,
        icon: 'success',
      });
    } else {
      Toast.fire({
        title: result.payload as string,
        icon: 'error',
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-5 px-2 sm:px-0">
        <Button
          label={t('main.import_excel_file')}
          type="button"
          className="w-full sm:w-auto bg-green-500 hover:bg-green-500/80 cursor-pointer flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors duration-300"
          imgSrc={ExcelIcon}
          onClick={handleImportExcel}
        />
      </div>

      <div className="overflow-x-auto">
        <div
          className={`${getTableHeight()} overflow-y-auto relative rounded-lg border border-gray-200 bg-white transition-all duration-300`}
        >
          <table className="w-full text-left min-w-max">
            <thead className="bg-[#636e61] text-xs sm:text-sm sticky top-0 text-white z-10">
              <tr>
                {HEADER_DEFAULT_ADDRESS.map((item, index) => (
                  <th
                    className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap"
                    key={index}
                  >
                    <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 items-center justify-between">
                      <span className="font-semibold">{t(item.name)}</span>
                      {item.sort && (
                        <span className="flex flex-col cursor-pointer">
                          {renderSortIcon(item)}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {defaultAddress.length > 0 &&
                defaultAddress.map((item, index) => {
                  const isEditing = editingId === item.ID;
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                        {item.No}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                        {item.Factory}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            name="DefaultAddress"
                            value={editFormData?.DefaultAddress}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                          />
                        ) : (
                          item.DefaultAddress
                        )}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        {item.CreatedBy}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                        {formatDate(item.CreatedAt)}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        {item.UpdatedBy}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                        {formatDate(item.UpdatedAt)}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        {isEditing ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={handleSaveClick}
                              className="text-green-600 hover:text-green-800"
                              title="Save"
                            >
                              <FaSave size={18} />
                            </button>
                            <button
                              onClick={handleCancelClick}
                              className="text-red-500 hover:text-red-700"
                              title="Cancel"
                            >
                              <FaTimes size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleSyncClick(item)}
                              className="text-yellow-500 hover:text-yellow-700"
                              title="Sync"
                              disabled={syncingId === item.ID}
                            >
                              {syncingId === item.ID ? (
                                <span className="animate-spin inline-block w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full" />
                              ) : (
                                <FaSync size={18} />
                              )}
                            </button>
                            <button
                              onClick={() => handleEditClick(item)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(item.ID)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
                              disabled={loadingDelete}
                            >
                              {loadingDelete ? (
                                <span className="animate-spin inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full" />
                              ) : (
                                <FaTrash size={18} />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}

              {loading &&
                defaultAddress.length > 0 &&
                Array.from({ length: 3 }).map((_, i) => (
                  <tr
                    key={`skeleton-${i}`}
                    className="border-b border-gray-200"
                  >
                    {HEADER_DEFAULT_ADDRESS.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3"
                      >
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                      </td>
                    ))}
                  </tr>
                ))}

              {loading &&
                defaultAddress.length === 0 &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr
                    key={`skeleton-loading-${i}`}
                    className="border-b border-gray-200"
                  >
                    {HEADER_DEFAULT_ADDRESS.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3"
                      >
                        <div
                          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))}

              {!loading && defaultAddress.length === 0 && (
                <tr>
                  <td
                    colSpan={HEADER_DEFAULT_ADDRESS.length}
                    className="text-center box-border px-4 sm:px-6 py-8 sm:py-12"
                  >
                    <div className="flex justify-center items-center flex-col space-y-3">
                      <img
                        src={NoData}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain"
                        alt="No defaultAddress"
                      />
                      <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">
                        No data available
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && <ModalDefaultAddress setIsOpen={setIsOpen} />}
    </div>
  );
};

export default DefaultAddress;
