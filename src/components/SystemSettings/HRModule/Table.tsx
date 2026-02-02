import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import type { TableHeaderProps } from '../../../types/table';
import { useTranslation } from 'react-i18next';
import type { IHRModule } from '../../../types/hrmodule';
import { useState, type RefObject, type UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import NoData from '../../../assets/images/no-data.png';
import { formatDate } from '../../../utils/formatDate';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: IHRModule[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  onSave: (item: IHRModule) => void;
};

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  tableRef,
  onScroll,
  onSave,
}: Props) => {
  const { t } = useTranslation();
  const { loading } = useAppSelector((state) => state.hrmodule);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<IHRModule | null>(null);
  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
  };

  const handleEditClick = (item: IHRModule) => {
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

  const handleSaveClick = () => {
    if (editFormData) {
      onSave(editFormData);
      setEditingId(null);
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

  return (
    <div
      className="max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-auto relative rounded-lg border border-gray-200"
      ref={tableRef}
      onScroll={onScroll}
    >
      <table className="w-full text-left min-w-max">
        <thead className="bg-[#636e61] text-xs sm:text-sm sticky top-0 text-white z-10">
          <tr>
            {header.map((item, index) => (
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
        <tbody className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          {data.length > 0 &&
            data.map((item, index) => {
              const isEditing = editingId === item.ID;
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                    {item.ID}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                    {item.FullName}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                    {item.Department}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                    {formatDate(item.JoinDate)}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                    {item.PermanentAddress}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                    {isEditing ? (
                      <input
                        type="text"
                        name="CurrentAddress"
                        value={editFormData?.CurrentAddress}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      item.CurrentAddress
                    )}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                    {isEditing ? (
                      // <input
                      //   type="text"
                      //   name="TransportationMethod"
                      //   value={editFormData?.TransportationMethod}
                      //   onChange={handleInputChange}
                      //   className="border rounded p-1 w-full"
                      // />
                      <select
                        name="TransportationMethod"
                        className="border rounded p-1 w-full"
                        value={editFormData?.TransportationMethod}
                        onChange={handleInputChange}
                      >
                        <option value=""></option>
                        <option value="Walking">Walking</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Electric motorcycle">
                          Electric motorcycle
                        </option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Electric car">Electric car</option>
                        <option value="Car">Car</option>
                        <option value="Bus">Bus</option>
                        <option value="Company shuttle bus">
                          Company shuttle bus
                        </option>
                      </select>
                    ) : (
                      item.TransportationMethod
                    )}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                    {item.Number_of_Working_Days}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap text-center">
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
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

          {loading &&
            data.length > 0 &&
            Array.from({ length: 1 }).map((_, i) => (
              <tr
                key={`skeleton-${i}`}
                className="animate-pulse border-b border-gray-200"
              >
                {header.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3"
                  >
                    <div className="h-3 sm:h-4 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}

          {!loading && data.length === 0 && (
            <tr>
              <td
                colSpan={header.length}
                className="text-center box-border px-4 sm:px-6 py-8 sm:py-12"
              >
                <div className="flex justify-center items-center flex-col space-y-3">
                  <img
                    src={NoData}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain"
                    alt="No data"
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
      {loading && data.length === 0 && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center">
          <div className="animate-spin border-4 border-gray-300 border-t-[#636e61] rounded-full w-8 h-8 sm:w-10 sm:h-10"></div>
        </div>
      )}
    </div>
  );
};

export default Table;
