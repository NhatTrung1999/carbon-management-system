import type { TableHeaderProps } from '../../../types/table';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { formatDate } from '../../../utils/formatDate';
import type { IUserManagement } from '../../../types/users';
import { useTranslation } from 'react-i18next';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: IUserManagement[];
  activeRow: string | null;
  setActiveRow: (value: string | null) => void;
  setItem: (value: IUserManagement) => void;
};

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  activeRow,
  setActiveRow,
  setItem,
}: Props) => {
  const { t } = useTranslation();
  
  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
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
    <div className="overflow-x-auto">
      <div className="max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto relative rounded-lg border border-gray-200">
        <table className="w-full text-left min-w-max">
          <thead className="bg-[#636e61] text-xs sm:text-sm sticky top-0 text-white z-10">
            <tr>
              {header.map((item, index) => (
                <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap" key={index}>
                  <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 items-center">
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
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={header.length}
                  className="text-center box-border px-4 sm:px-6 py-8 sm:py-12"
                >
                  <div className="text-sm sm:text-base text-gray-600">No data available</div>
                </td>
              </tr>
            ) : (
              <>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer border-b border-gray-200 transition-colors ${
                      activeRow === item.ID 
                        ? 'bg-[#a7baa4] text-white hover:bg-[#96a993]' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setActiveRow(item.ID === activeRow ? null : item.ID);
                      setItem(item);
                    }}
                  >
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm whitespace-nowrap">
                      {item.UserID}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                      {item.Name}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                      {item.Email}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                      <span 
                      // className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      //   item.Role === 'Admin' 
                      //     ? 'bg-purple-100 text-purple-800' 
                      //     : 'bg-blue-100 text-blue-800'
                      // }`}
                      >
                        {item.Role}
                      </span>
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                      <span 
                      // className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      //   item.Status === 'Active' 
                      //     ? 'bg-green-100 text-green-800' 
                      //     : 'bg-red-100 text-red-800'
                      // }`}
                      >
                        {item.Status}
                      </span>
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                      {item.CreatedAt}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm whitespace-nowrap">
                      {formatDate(item.CreatedDate)}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                      {item.UpdatedAt}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm whitespace-nowrap">
                      {formatDate(item.UpdatedDate)}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;