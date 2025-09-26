import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../types/table';
import NoData from '../../../assets/images/no-data.png';
import type { RefObject } from 'react';
import type { ICat7Data } from '../../../types/cat7';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: ICat7Data[];
  tableRef?: RefObject<HTMLDivElement | null>;
};

const Table = ({ header, activeSort, setActiveSort, data }: Props) => {
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
                  <span>{item.name}</span>
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
                <div className="flex justify-center items-center flex-col">
                  <img src={NoData} className="size-30" />
                  <div className="text-2xl font-semibold">
                    No data available
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            <>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="box-border px-3 py-3">{item.Staff_ID}</td>
                  <td className="box-border px-3 py-3">
                    {item.Residential_address}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Main_transportation_type}
                  </td>
                  <td className="box-border px-3 py-3">{item.km}</td>
                  <td className="box-border px-3 py-3">
                    {item.Number_of_working_days}
                  </td>
                  <td className="box-border px-3 py-3">{item.PKT_p_km}</td>
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
