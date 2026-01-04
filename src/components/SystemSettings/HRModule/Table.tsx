import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import type { TableHeaderProps } from '../../../types/table';
import { useTranslation } from 'react-i18next';
import type { IHRModule } from '../../../types/hrmodule';
import { useState } from 'react';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: IHRModule[];
  onSave: (item: IHRModule) => void;
};

const Table = ({ header, activeSort, setActiveSort, data, onSave }: Props) => {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<IHRModule | null>(null);
  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
  };

  const handleEditClick = (item: IHRModule) => {
    setEditingId(item.ID);
    setEditFormData(item); // Copy dữ liệu dòng đó vào form tạm
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveClick = () => {
    if (editFormData) {
      onSave(editFormData); // Gửi dữ liệu lên cha
      setEditingId(null); // Thoát chế độ sửa
    }
  };

  const renderSortIcon = (item: TableHeaderProps) =>
    item.state !== 'Action' && (
      <div className="flex flex-col ml-1">
        <TiArrowSortedUp
          className={`cursor-pointer ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'asc'
              ? 'text-stone-700'
              : ''
          }`}
          onClick={() => handleSorting(item.state, 'asc')}
        />
        <TiArrowSortedDown
          className={`cursor-pointer ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'desc'
              ? 'text-stone-700'
              : ''
          }`}
          onClick={() => handleSorting(item.state, 'desc')}
        />
      </div>
    );

  return (
    <div className="max-h-[600px] overflow-y-auto">
      <table className="w-full text-left min-w-max">
        <thead className="bg-[#636e61] text-sm sticky top-0 text-white">
          <tr>
            {header.map((item, index) => (
              <th className="px-4 py-4 whitespace-break-spaces" key={index}>
                <div className="flex flex-row gap-6 items-center justify-between">
                  <span>{t(item.name)}</span>
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
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={header.length}
                className="text-center box-border px-6 py-6"
              >
                No data
              </td>
            </tr>
          ) : (
            <>
              {data.map((item, index) => {
                const isEditing = editingId === item.ID;
                return (
                  <tr key={index} className="cursor-pointer hover:bg-gray-300 ">
                    <td className="box-border px-4 py-4">{item.ID}</td>
                    <td className="box-border px-4 py-4">{item.FullName}</td>
                    <td className="box-border px-4 py-4">{item.Department}</td>
                    <td className="box-border px-4 py-4">
                      {item.PermanentAddress}
                    </td>
                    <td className="px-4 py-4">
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
                    <td className="px-4 py-4">
                      {isEditing ? (
                        <input
                          type="text"
                          name="TransportationMode"
                          value={editFormData?.TransportationMode}
                          onChange={handleInputChange}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        item.TransportationMode
                      )}
                    </td>
                    <td className="box-border px-4 py-4">
                      {item.Number_of_Working_Days}
                    </td>
                    <td className="px-4 py-4 text-center">
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
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
