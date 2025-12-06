import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { RefObject, UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import type { ICat1AndCat4Data } from '../../../types/cat1andcat4';
import type { TableHeaderProps } from '../../../types/table';
import { useTranslation } from 'react-i18next';
import NoData from '../../../assets/images/no-data.png';
import { formatDate } from '../../../utils/formatDate';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: ICat1AndCat4Data[];
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
  const { t } = useTranslation();

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
        <tbody className="h-[70px]">
          {data.length > 0 &&
            data.map((item, index) => (
              <tr key={index}>
                <td className="box-border px-3 py-3">{item.No}</td>
                <td className="box-border px-3 py-3">{formatDate(item.PurDate)}</td>
                <td className="box-border px-3 py-3">{formatDate(item.RKDate)}</td>
                <td className="box-border px-3 py-3">{item.PurNo}</td>
                <td className="box-border px-3 py-3">{item.ReceivedNo}</td>
                <td className="box-border px-3 py-3">{item.MatID}</td>
                <td className="box-border px-3 py-3">{item.QtyUsage}</td>
                <td className="box-border px-3 py-3">{item.QtyReceive}</td>
                <td className="box-border px-3 py-3">{item.UnitWeight}</td>
                <td className="box-border px-3 py-3">{item.WeightUnitKG}</td>
                <td className="box-border px-3 py-3">{item.SupplierCode}</td>
                <td className="box-border px-3 py-3">{item.Style}</td>
                <td className="box-border px-3 py-3">
                  {item.TransportationMethod}
                </td>
                <td className="box-border px-3 py-3">{item.Departure}</td>
                <td className="box-border px-3 py-3">
                  {item.ThirdCountryLandTransport}
                </td>
                <td className="box-border px-3 py-3">{item.PortOfDeparture}</td>
                <td className="box-border px-3 py-3">{item.PortOfArrival}</td>
                <td className="box-border px-3 py-3">
                  {item.FactoryDomesticLandTransport}
                </td>
                <td className="box-border px-3 py-3">{item.Destination}</td>
                <td className="box-border px-3 py-3">
                  {item.LandTransportDistance}
                </td>
                <td className="box-border px-3 py-3">
                  {item.SeaTransportDistance}
                </td>
                <td className="box-border px-3 py-3">
                  {item.AirTransportDistance}
                </td>
                <td className="box-border px-3 py-3">
                  {item.LandTransortTonKilometers}
                </td>
                <td className="box-border px-3 py-3">
                  {item.SeaTransortTonKilometers}
                </td>
                <td className="box-border px-3 py-3">
                  {item.AirTransortTonKilometers}
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
