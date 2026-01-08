import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../types/table';
import NoData from '../../../assets/images/no-data.png';
import type { ICat9AndCat12Data } from '../../../types/cat9andcat12';
import type { RefObject, UIEventHandler } from 'react';
import { formatDate } from '../../../utils/formatDate';
import { useAppSelector } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: ICat9AndCat12Data[];
  tableRef: RefObject<HTMLDivElement | null>;
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

  const {t} = useTranslation()

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
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.No}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {formatDate(item.Date)}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {formatDate(item.Shipment_Date)}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Booking_No}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Invoice_Number}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Article_Name}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Article_ID}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Quantity}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Gross_Weight ? item.Gross_Weight.toFixed(2) : ''}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Customer_ID}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Local_Land_Transportation}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Port_Of_Departure}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.Port_Of_Arrival}</td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Land_Transport_Distance}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Sea_Transport_Distance}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Air_Transport_Distance}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Transport_Method}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Land_Transport_Ton_Kilometers}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Sea_Transport_Ton_Kilometers}
                </td>
                <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {item.Air_Transport_Ton_Kilometers}
                </td>
              </tr>
            ))}

          {loading &&
            data.length > 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <tr key={`skeleton-${i}`} className="border-b border-gray-200">
                {header.map((_, colIndex) => (
                  <td key={colIndex} className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
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
                    alt="No data"
                  />
                  <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">
                    No data available
                  </div>
                </div>
              </td>
            </tr>
          )}

          {/* {data.length === 0 && !loading ? (
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
                  <td className="box-border px-3 py-3">
                    {formatDate(item.Date)}
                  </td>
                  <td className="box-border px-3 py-3">
                    {item.Invoice_Number}
                  </td>
                  <td className="box-border px-3 py-3">{item.Article_Name}</td>
                  <td className="box-border px-3 py-3">{item.Quantity}</td>
                  <td className="box-border px-3 py-3">
                    {item.Gross_Weight ? item.Gross_Weight.toFixed(2) : ''}
                  </td>
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
            </>
          )} */}
        </tbody>
      </table>

      {loading && data.length === 0 && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#636e61] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-sm sm:text-base font-medium text-gray-600 animate-pulse">
              Loading data...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
