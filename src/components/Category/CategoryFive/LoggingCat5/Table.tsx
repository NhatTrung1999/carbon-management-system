import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../../types/table';
import NoData from '../../../../assets/images/no-data.png';
import type { RefObject, UIEventHandler } from 'react';
import type { ILoggingCat5Data } from '../../../../types/loggingcat5';
import { useAppSelector } from '../../../../app/hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: ILoggingCat5Data[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
};

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data ,
  tableRef,
  onScroll,
}: Props) => {
  const { loading } = useAppSelector((state) => state.category);

  const scrollPositionRef = useRef({ top: 0, left: 0 });
    const isRefLoading = useRef(false);
  
    useEffect(() => {
      if (loading && !isRefLoading.current) {
        isRefLoading.current = true;
        if (tableRef?.current) {
          scrollPositionRef.current = {
            top: tableRef.current.scrollTop,
            left: tableRef.current.scrollLeft,
          };
        }
      }
    }, [loading, tableRef]);
  
    useEffect(() => {
      if (!loading && isRefLoading.current) {
        isRefLoading.current = false;
        if (tableRef?.current) {
          setTimeout(() => {
            if (tableRef?.current) {
              tableRef.current.scrollTop = scrollPositionRef.current.top;
              tableRef.current.scrollLeft = scrollPositionRef.current.left;
            }
          }, 0);
        }
      }
    }, [loading, tableRef, data.length]);

  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
  };
  const { t } = useTranslation();

  const renderSortIcon = (item: TableHeaderProps) =>
    item.state !== 'Action' && (
      <div className="flex flex-col ml-1">
        <TiArrowSortedUp
          className={`cursor-pointer transition-clors ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'asc'
              ? 'text-stone-700'
              : 'text-white/60 hover:text-white'
          }`}
          onClick={() => handleSorting(item.state, 'asc')}
        />
        <TiArrowSortedDown
          className={`cursor-pointer transition-colors${
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
            data.map((item, index) => (
              <tr 
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.System}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Corporation}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Factory}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Department}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.DocKey}
                </td>
                {/* <td className="box-border px-3 py-3">
                  {Math.ceil(item.Number_of_working_days)}
                </td> */}
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.SPeriodData}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.EPeriodData}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.ActivityType}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.DataType}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.DocType}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.UndDoc}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.DocFlow}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.DocDate}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.DocDate2}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.DocNo}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.UndDocNo}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.CustVenName}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.InvoiceNo}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.TransType}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Departure}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Destination}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.PortType}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.StPort}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.ThPort}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.EndPort}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Product}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Quity}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Amount}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.ActivityData}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.ActivityUnit}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Unit}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.UnitWeight}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Memo}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.CreateDateTime}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Creator}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.CreatedUser}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.CreatedFactory}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.CreatedAt}</td>
              </tr>
            ))}
          {loading &&
            data.length > 0 &&
            Array.from({ length: 1 }).map((_, i) => (
              <tr key={`skeleton-${i}`} className="animate-pulse border-b border-gray-200">
                {header.map((_, colIndex) => (
                  <td key={colIndex} className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3">
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
                    alt='No data'  
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
