import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
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

type Cat6Row = ICat6Data & Record<string, string | number | undefined>;

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

  const getColumns = () =>
    header.flatMap((item) =>
      item.children && item.children.length > 0 ? item.children : [item]
    );

  const columns = getColumns();

  const getCellValue = (row: Cat6Row, state: string) => {
    const value = row[state];
    if (state === 'Document_Date' || state === 'Start_Time' || state === 'End_Time') {
      return formatDate(value as string);
    }
    return value ?? '';
  };

  return (
    <div className="overflow-x-auto">
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
              {header.flatMap((item) =>
                item.children?.map((child) => (
                  <th
                    className="px-4 py-1 whitespace-nowrap"
                    key={child.state}
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
                )) ?? []
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
                  {columns.map((column) => (
                    <td
                      key={`${index}-${column.state}`}
                      className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm"
                    >
                      {String(getCellValue(item as Cat6Row, column.state))}
                    </td>
                  ))}
                </tr>
              ))}

            {loading &&
              data.length > 0 &&
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-gray-200">
                  {Array.from({ length: columns.length }).map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3"
                    >
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
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
