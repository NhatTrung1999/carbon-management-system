import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../types/table';
import { useTranslation } from 'react-i18next';
import type { InfoFactoryData } from '../../../types/infofactorymanagement';
import { formatDate } from '../../../utils/formatDate';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: InfoFactoryData[];
  activeRow: string | null;
  setActiveRow: (value: string | null) => void;
  setItem: (value: InfoFactoryData) => void;
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
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.COMID}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.CompanyName}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.Address}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.City}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.Tel}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.Fax}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.AccountNo}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.YN}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.NameVN}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.CreatedUser}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                      {item.CreatedFactory}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{formatDate(item.CreatedDate)}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.UpdatedUser}</td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                      {item.UpdatedFactory}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{formatDate(item.UpdatedDate)}</td>
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
