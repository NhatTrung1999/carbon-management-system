import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../types/table';
import NoData from '../../../assets/images/no-data.png';
import type { ICat9AndCat12 } from '../../../types/cat9andcat12';
import type { RefObject } from 'react';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: ICat9AndCat12[];
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
                <div className="flex flex-row gap-6 items-center">
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
                  <td className="box-border px-3 py-3">{item.No}</td>
                  <td className="box-border px-3 py-3">{item.Date}</td>
                  <td className="box-border px-3 py-3">
                    {item.Invoice_Number}
                  </td>
                  <td className="box-border px-3 py-3">{item.Article_Name}</td>
                  <td className="box-border px-3 py-3">{item.Quantity}</td>
                  <td className="box-border px-3 py-3">{item.Gross_Weight}</td>
                  <td className="box-border px-3 py-3">{item.Customer_ID}</td>
                  <td className="box-border px-3 py-3">
                    {item.Local_Land_Transportation}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Port_Of_Departure}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Port_Of_Arrival}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Land_Transport_Distance}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Sea_Transport_Distance}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Air_Transport_Distance}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Transport_Method}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Land_Transport_Ton_Kilometers}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Sea_Transport_Ton_Kilometers}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Air_Transport_Ton_Kilometers}
                  </td>
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
