import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../../types/table';
import NoData from '../../../../assets/images/no-data.png';
import type { RefObject, UIEventHandler } from 'react';
import type { ILoggingCat1AndCat4Data } from '../../../../types/loggingcat1and4';
import { useAppSelector } from '../../../../app/hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { formatDate } from '../../../../utils/formatDate';

type SortState = { sortField: string; sortOrder: string };

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: ILoggingCat1AndCat4Data[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
};

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="whitespace-nowrap px-4 py-3 text-xs text-white/90 sm:text-sm">
    {children ?? '—'}
  </td>
);

const SkeletonRow = ({ cols, delay = 0 }: { cols: number; delay?: number }) => (
  <tr className="border-b border-white/[0.05]">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div
          className="h-3.5 rounded-md bg-white/[0.06] animate-pulse"
          style={{
            animationDelay: `${delay + i * 0.03}s`,
            width: `${60 + (i % 3) * 20}%`,
          }}
        />
      </td>
    ))}
  </tr>
);

const SortIcon = ({
  item,
  activeSort,
  onSort,
}: {
  item: TableHeaderProps;
  activeSort: SortState;
  onSort: (field: string, order: string) => void;
}) => {
  if (item.state === 'Action' || !item.sort) return null;

  const isAsc =
    activeSort.sortField === item.state && activeSort.sortOrder === 'asc';
  const isDesc =
    activeSort.sortField === item.state && activeSort.sortOrder === 'desc';

  return (
    <div className="ml-1.5 flex flex-col gap-px">
      <TiArrowSortedUp
        size={14}
        onClick={() => onSort(item.state, 'asc')}
        className={`cursor-pointer transition-colors duration-150
          ${isAsc ? 'text-emerald-300' : 'text-white/25 hover:text-white/60'}`}
      />
      <TiArrowSortedDown
        size={14}
        onClick={() => onSort(item.state, 'desc')}
        className={`cursor-pointer transition-colors duration-150
          ${isDesc ? 'text-emerald-300' : 'text-white/25 hover:text-white/60'}`}
      />
    </div>
  );
};

const getHeight = (loading: boolean, rowCount: number) => {
  if (loading && rowCount === 0) return 'min-h-[320px] xl:min-h-0 xl:flex-1';
  if (!loading && rowCount === 0) return 'min-h-[320px] xl:min-h-0 xl:flex-1';
  return 'min-h-[320px] xl:min-h-0 xl:flex-1';
};

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  tableRef,
  onScroll,
}: Props) => {
  const { loading } = useAppSelector((state) => state.logcat);
  const { t } = useTranslation();

  const scrollPos = useRef({ top: 0, left: 0 });
  const wasLoading = useRef(false);

  useEffect(() => {
    if (loading && !wasLoading.current) {
      wasLoading.current = true;
      if (tableRef?.current) {
        scrollPos.current = {
          top: tableRef.current.scrollTop,
          left: tableRef.current.scrollLeft,
        };
      }
    }
  }, [loading, tableRef]);

  useEffect(() => {
    if (!loading && wasLoading.current) {
      wasLoading.current = false;
      setTimeout(() => {
        if (tableRef?.current) {
          tableRef.current.scrollTop = scrollPos.current.top;
          tableRef.current.scrollLeft = scrollPos.current.left;
        }
      }, 0);
    }
  }, [loading, tableRef, data.length]);

  const handleSort = (field: string, order: string) =>
    setActiveSort({ sortField: field, sortOrder: order });

  return (
    <div
      ref={tableRef}
      onScroll={onScroll}
      className={`${getHeight(loading, data.length)}
        relative w-full min-w-0 overflow-auto rounded-xl
        border border-white/[0.08] bg-white/[0.03]
        backdrop-blur-sm transition-all duration-300
        [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
        [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar]:w-[3px]
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-emerald-400/20`}
    >
      <table className="w-max min-w-full text-left">
        {/* ── Header ── */}
        <thead className="sticky top-0 z-10">
          {/* Top shimmer */}
          <tr>
            <th
              colSpan={header.length}
              className="h-px p-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </tr>
          <tr className="bg-[#636e61]/90 backdrop-blur-md">
            {header.map((item, i) => (
              <th
                key={i}
                className="whitespace-nowrap px-4 py-3 text-xs font-semibold
                  uppercase tracking-[0.10em] text-white/90"
              >
                <div className="flex items-center gap-1">
                  {t(item.name)}
                  <SortIcon
                    item={item}
                    activeSort={activeSort}
                    onSort={handleSort}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {/* Data rows */}
          {data.map((item, i) => (
            <tr
              key={i}
              className="border-b border-white/[0.05] transition-colors duration-150
                hover:bg-white/[0.04]"
            >
              <Td>{item.System}</Td>
              <Td>{item.Corporation}</Td>
              <Td>{item.Factory}</Td>
              <Td>{item.Department}</Td>
              <Td>{item.DocKey}</Td>
              {/* <td className="box-border px-3 py-3">
                  {Math.ceil(item.Number_of_working_days)}
                </td> */}
              <Td>{item.SPeriodData}</Td>
              <Td>{item.EPeriodData}</Td>
              <Td>{item.ActivityType}</Td>
              <Td>{item.DataType}</Td>
              <Td>{item.DocType}</Td>
              <Td>{item.UndDoc}</Td>
              <Td>{item.DocFlow}</Td>
              <Td>{item.DocDate}</Td>
              <Td>{item.DocDate2}</Td>
              <Td>{item.DocNo}</Td>
              <Td>{item.UndDocNo}</Td>
              <Td>{item.CustVenName}</Td>
              <Td>{item.InvoiceNo}</Td>
              <Td>{item.TransType}</Td>
              <Td>{item.Departure}</Td>
              <Td>{item.Destination}</Td>
              <Td>{item.PortType}</Td>
              <Td>{item.StPort}</Td>
              <Td>{item.ThPort}</Td>
              <Td>{item.EndPort}</Td>
              <Td>{item.Product}</Td>
              <Td>{item.Quity}</Td>
              <Td>{item.Amount}</Td>
              <Td>{item.ActivityData}</Td>
              <Td>{item.ActivityUnit}</Td>
              <Td>{item.Unit}</Td>
              <Td>{item.UnitWeight}</Td>
              <Td>{item.Memo}</Td>
              <Td>{item.CreateDateTime}</Td>
              <Td>{item.Creator}</Td>
              <Td>{item.CreatedUser}</Td>
              <Td>{item.CreatedFactory}</Td>
              <Td>{formatDate(item.CreatedAt)}</Td>
            </tr>
          ))}

          {/* Skeleton — appended below existing data while loading more */}
          {loading &&
            data.length > 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRow
                key={`sk-more-${i}`}
                cols={header.length}
                delay={i * 0.05}
              />
            ))}

          {/* Skeleton — full empty state on first load */}
          {loading &&
            data.length === 0 &&
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRow
                key={`sk-init-${i}`}
                cols={header.length}
                delay={i * 0.08}
              />
            ))}

          {/* No data */}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={header.length} className="px-6 py-14 text-center">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={NoData}
                    alt="No data"
                    className="h-20 w-20 object-contain opacity-40 sm:h-24 sm:w-24"
                  />
                  <p className="text-sm font-medium text-white/30">
                    No data available
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
