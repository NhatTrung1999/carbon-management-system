import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../types/table';
import NoData from '../../../assets/images/no-data.png';
import type { RefObject, UIEventHandler } from 'react';
import type { ICat6Data } from '../../../types/cat6';
import { useAppSelector } from '../../../app/hooks';
import { formatDate } from '../../../utils/formatDate';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: ICat6Data[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
};

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  tableRef,
  onScroll,
}: Props) => {
  const { loading } = useAppSelector((state) => state.category);
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
    <div
      className="max-h-[600px] overflow-y-auto relative"
      ref={tableRef}
      onScroll={onScroll}
    >
      <table className="w-full text-left min-w-max">
        <thead className="bg-[#636e61] text-sm sticky top-0 text-white">
          <tr>
            {header.map((item, index) => {
              if (item.children && item.children.length > 0) {
                return (
                  <th
                    className="px-4 py-1 whitespace-break-spaces text-center"
                    key={index}
                    colSpan={item.children.length}
                  >
                    <span>{item.name}</span>
                  </th>
                );
              }
              return (
                <th
                  className="px-4 py-1 whitespace-break-spaces"
                  key={index}
                  rowSpan={2}
                >
                  <div className="flex flex-row gap-6 items-center justify-between">
                    <span>{item.name}</span>
                    {item.sort && (
                      <span className="flex flex-col cursor-pointer">
                        {renderSortIcon(item)}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
          <tr>
            {header.map((item, index) =>
              item.children?.map((child, idx) => (
                <th
                  className="px-4 py-1 whitespace-break-spaces"
                  key={`${index}-${idx}`}
                  rowSpan={2}
                >
                  <div className="flex flex-row gap-6 items-center justify-between">
                    <span>{child.name}</span>
                    {child.sort && (
                      <span className="flex flex-col cursor-pointer">
                        {renderSortIcon(child)}
                      </span>
                    )}
                  </div>
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody className="h-[70px]">
          {data.length > 0 &&
            data.map((item, index) => (
              <tr key={index}>
                <td className="box-border px-3 py-3">
                  {formatDate(item.Document_Date)}
                </td>
                <td className="box-border px-3 py-3">{item.Document_Number}</td>
                <td className="box-border px-3 py-3">{item.Staff_ID}</td>
                <td className="box-border px-3 py-3">
                  {item.Round_trip_One_way}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Business_Trip_Type}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Place_of_Departure}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Departure_Airport}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Land_Transport_Distance_km_A}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Land_Trasportation_Type_A}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Destination_Airport}
                </td>
                <td className="box-border px-3 py-3">{item.Destination_1}</td>
                <td className="box-border px-3 py-3">{item.Destination_2}</td>
                <td className="box-border px-3 py-3">
                  {item.Land_Transport_Distance_km_B}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Land_Trasportation_Type_B}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Air_Transport_Distance_km}
                </td>
                <td className="box-border px-3 py-3">
                  {item.Number_of_nights_stayed}
                </td>
              </tr>
            ))}
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
