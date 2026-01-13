import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../types/table';
import NoData from '../../../assets/images/no-data.png';
import type { RefObject, UIEventHandler } from 'react';
import type { ICat6Data } from '../../../types/cat6';
import { useAppSelector } from '../../../app/hooks';
import { formatDate } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

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

  const getTableHeight = () => {
    if (loading && data.length === 0) {
      return 'max-h-[250px]'; 
    }
    if (data.length === 0 && !loading) {
      return 'max-h-[300px]';
    }
    return 'max-h-[400px] sm:max-h-[500px] md:max-h-[600px]';
  };

  const getTotalColumns = () => {
    let count = 0;
    header.forEach(item => {
      if (item.children && item.children.length > 0) {
        count += item.children.length;
      } else {
        count += 1;
      }
    });
    return count;
  };

  return (
    <div className='overflow-x-auto'>
      <div
        className={`${getTableHeight()} overflow-y-auto relative rounded-lg border border-gray-200 bg-white transition-all duration-300`}
        ref={tableRef}
        onScroll={onScroll}
      >
        <table className="w-full text-left min-w-max">
          <thead className="bg-[#636e61] text-xs sm:text-sm sticky top-0 text-white z-10">
            <tr>
              {header.map((item, index) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <th
                      className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap text-center"
                      key={index}
                      colSpan={item.children.length}
                    >
                      <span>{t(item.name)}</span>
                    </th>
                  );
                }
                return (
                  <th
                    className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap"
                    key={index}
                    rowSpan={2}
                  >
                    <div className="flex flex-row gap-6 items-center justify-between">
                      <span>{t(item.name)}</span>
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
                      <span>{t(child.name)}</span>
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
          <tbody>
            {data.length > 0 &&
              data.map((item, index) => (
                <tr 
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {formatDate(item.Document_Date)}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.Document_Number}</td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.Staff_ID}</td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Round_trip_One_way}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Business_Trip_Type}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Place_of_Departure}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Departure_Airport}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Land_Transport_Distance_km_A}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Land_Trasportation_Type_A}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Destination_Airport}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.Destination_1}</td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{item.Destination_2}</td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Land_Transport_Distance_km_B}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Land_Trasportation_Type_B}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Air_Transport_Distance_km}
                  </td>
                  <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                    {item.Number_of_nights_stayed}
                  </td>
                </tr>
              ))}

            {loading &&
              data.length > 0 &&
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-gray-200">
                  {Array.from({ length: getTotalColumns() }).map((_, colIndex) => (
                    <td key={colIndex} className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                    </td>
                  ))}
                </tr>
              ))}

            {/* {loading && data.length === 0 && (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-loading-${i}`} className="border-b border-gray-200">
                  {Array.from({ length: getTotalColumns() }).map((_, colIndex) => (
                    <td key={colIndex} className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                      <div 
                        className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"
                        style={{
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    </td>
                  ))}
                </tr>
              ))
            )} */}

            {!loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={getTotalColumns()}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;