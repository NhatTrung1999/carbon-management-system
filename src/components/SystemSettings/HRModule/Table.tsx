import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import type { TableHeaderProps } from '../../../types/table';
import { useTranslation } from 'react-i18next';
import type { IHRModule } from '../../../types/hrmodule';
import { useState, type RefObject, type UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import NoData from '../../../assets/images/no-data.png';

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
      onSave(editFormData); 
      setEditingId(null);
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
    <div
      className="max-h-[600px] overflow-y-auto"
      ref={tableRef}
      onScroll={onScroll}
    >
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
          {/* {data.length === 0 ? (
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
          )} */}

          {data.length > 0 &&
            data.map((item, index) => {
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
                        value={editFormData?.TransportationMethod}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      item.TransportationMethod
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
          {loading &&
            data.length > 0 &&
            Array.from({ length: 1 }).map((_, i) => (
              <tr key={`skeleton-${i}`} className="animate-pulse">
                {header.map((_, colIndex) => (
                  <td key={colIndex} className="box-border px-3 py-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          {!loading && data.length === 0 && (
            <tr>
              <td
                colSpan={header.length}
                className="text-center box-border px-6 py-6"
              >
                <div className="flex justify-center items-center flex-col">
                  <img src={NoData} className="size-30" />
                  <div className="text-2xl font-semibold">
                    No data available
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {loading && data.length === 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center w-full top-22">
          <div className="animate-spin border-4 border-gray-300 border-t-[#636e61] rounded-full w-10 h-10"></div>
        </div>
      )}
    </div>
  );
};

export default Table;
