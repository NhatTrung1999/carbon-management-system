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
};

const Table = ({ header, activeSort, setActiveSort, data }: Props) => {
  const { t } = useTranslation();
  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
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
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-gray-300 "
                >
                  <td className="box-border px-4 py-4">{item.COMID}</td>
                  <td className="box-border px-4 py-4">{item.CompanyName}</td>
                  <td className="box-border px-4 py-4">{item.Address}</td>
                  <td className="box-border px-4 py-4">{item.City}</td>
                  <td className="box-border px-4 py-4">{item.Tel}</td>
                  <td className="box-border px-4 py-4">{item.Fax}</td>
                  <td className="box-border px-4 py-4">{item.AccountNo}</td>
                  <td className="box-border px-4 py-4">{item.YN}</td>
                  <td className="box-border px-4 py-4">{item.NameVN}</td>
                  <td className="box-border px-4 py-4">{item.CreatedUser}</td>
                  <td className="box-border px-4 py-4">
                    {item.CreatedFactory}
                  </td>
                  <td className="box-border px-4 py-4">{formatDate(item.CreatedDate)}</td>
                  <td className="box-border px-4 py-4">{item.UpdatedUser}</td>
                  <td className="box-border px-4 py-4">
                    {item.UpdatedFactory}
                  </td>
                  <td className="box-border px-4 py-4">{formatDate(item.UpdatedDate)}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
