import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import type { RefObject, UIEventHandler } from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import type { ICat6Data } from '../../../types/cat6';
import type { TableHeaderProps } from '../../../types/table';
import { formatDate } from '../../../utils/formatDate';
import NoData from '../../../assets/images/no-data.png';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };

type Props = {
  header        : TableHeaderProps[];
  activeSort    : SortState;
  setActiveSort : (data: SortState) => void;
  data          : ICat6Data[];
  tableRef     ?: RefObject<HTMLDivElement | null>;
  onScroll      : UIEventHandler<HTMLDivElement>;
};

type Cat6Row = ICat6Data & Record<string, string | number | undefined>;

const DATE_FIELDS = new Set(['Document_Date', 'Start_Time', 'End_Time']);

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Flatten grouped header → leaf columns for body rendering */
const flattenColumns = (header: TableHeaderProps[]): TableHeaderProps[] =>
  header.flatMap((item) =>
    item.children?.length ? item.children : [item]
  );

const getCellValue = (row: Cat6Row, state: string): string => {
  const value = row[state];
  if (DATE_FIELDS.has(state)) return formatDate(value as string);
  return value !== undefined && value !== null ? String(value) : '—';
};

const getMaxHeight = (loading: boolean, rowCount: number) => {
  if (loading && rowCount === 0) return 'max-h-[250px]';
  if (!loading && rowCount === 0) return 'max-h-[300px]';
  return 'max-h-[400px] sm:max-h-[500px] md:max-h-[600px]';
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const SortIcon = ({
  item,
  activeSort,
  onSort,
}: {
  item      : TableHeaderProps;
  activeSort: SortState;
  onSort    : (field: string, order: string) => void;
}) => {
  if (item.state === 'Action' || !item.sort) return null;

  const isAsc  = activeSort.sortField === item.state && activeSort.sortOrder === 'asc';
  const isDesc = activeSort.sortField === item.state && activeSort.sortOrder === 'desc';

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

const SkeletonRow = ({ cols, delay = 0 }: { cols: number; delay?: number }) => (
  <tr className="border-b border-white/[0.05]">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div
          className="h-3.5 animate-pulse rounded-md bg-white/[0.06]"
          style={{ animationDelay: `${delay + i * 0.03}s`, width: `${60 + (i % 3) * 20}%` }}
        />
      </td>
    ))}
  </tr>
);

// ─── Shared th style ─────────────────────────────────────────────────────────

const TH = 'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-white align-middle';

// ─── Component ───────────────────────────────────────────────────────────────

const Table = ({ header, activeSort, setActiveSort, data, tableRef, onScroll }: Props) => {
  const { loading } = useAppSelector((state) => state.category);
  const { t }       = useTranslation();

  const columns    = flattenColumns(header);
  const hasGroups  = header.some((h) => h.children?.length);

  // ── Preserve scroll position ──────────────────────────────────────────────
  const scrollPos  = useRef({ top: 0, left: 0 });
  const wasLoading = useRef(false);

  useEffect(() => {
    if (loading && !wasLoading.current) {
      wasLoading.current = true;
      if (tableRef?.current)
        scrollPos.current = { top: tableRef.current.scrollTop, left: tableRef.current.scrollLeft };
    }
  }, [loading, tableRef]);

  useEffect(() => {
    if (!loading && wasLoading.current) {
      wasLoading.current = false;
      setTimeout(() => {
        if (tableRef?.current) {
          tableRef.current.scrollTop  = scrollPos.current.top;
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
      className={`${getMaxHeight(loading, data.length)}
        relative overflow-auto rounded-xl
        border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm
        transition-all duration-300
        [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
        [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar]:w-[3px]
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-emerald-400/20`}
    >
      <table className="w-full min-w-max text-left">

        {/* ── Header ── */}
        {/*
          bg + backdrop-blur đặt trên <thead> — không đặt trên từng <tr>.
          Nếu đặt trên <tr>, các ô có rowSpan sẽ bị row khác đè backdrop lên.
          box-shadow thay shimmer row — tránh thêm <tr> làm lệch layout.
        */}
        <thead
          className="sticky top-0 z-10 bg-[#636e61] backdrop-blur-md"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          {/* Row 1 — parent group labels + leaf headers (rowSpan=2) */}
          <tr>
            {header.map((item, i) =>
              item.children?.length ? (
                /*
                  Group parent — colSpan = số con, không rowSpan.
                  border-b ngăn cách với child row bên dưới.
                  text-white/35 mờ hơn child để tạo hierarchy rõ ràng.
                */
                <th
                  key={i}
                  colSpan={item.children.length}
                  className="whitespace-nowrap
                    px-4 py-3 text-center text-xs font-semibold
                    uppercase tracking-[0.10em] text-white align-middle"
                >
                  {t(item.name)}
                </th>
              ) : (
                /*
                  Leaf header không có group — rowSpan=2 để chiếm cả 2 dòng.
                  align-bottom căn chữ xuống đáy, đồng hàng với child row.
                */
                <th
                  key={i}
                  rowSpan={hasGroups ? 2 : 1}
                  className={TH}
                >
                  <div className="flex items-center gap-1">
                    {t(item.name)}
                    <SortIcon item={item} activeSort={activeSort} onSort={handleSort} />
                  </div>
                </th>
              )
            )}
          </tr>

          {/* Row 2 — child headers (only when groups exist) */}
          {hasGroups && (
            <tr>
              {header.flatMap((item) =>
                (item.children ?? []).map((child) => (
                  <th
                    key={child.state}
                    className={TH}
                  >
                    <div className="flex items-center gap-1">
                      {t(child.name)}
                      <SortIcon item={child} activeSort={activeSort} onSort={handleSort} />
                    </div>
                  </th>
                ))
              )}
            </tr>
          )}
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
              {columns.map((col) => (
                <td
                  key={`${i}-${col.state}`}
                  className="whitespace-nowrap px-4 py-3 text-xs text-white sm:text-sm"
                >
                  {getCellValue(item as Cat6Row, col.state)}
                </td>
              ))}
            </tr>
          ))}

          {/* Skeleton — loading more */}
          {loading && data.length > 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRow key={`sk-more-${i}`} cols={columns.length} delay={i * 0.05} />
            ))}

          {/* Skeleton — initial empty */}
          {loading && data.length === 0 &&
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRow key={`sk-init-${i}`} cols={columns.length} delay={i * 0.08} />
            ))}

          {/* No data */}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-14 text-center">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={NoData}
                    alt="No data"
                    className="h-20 w-20 object-contain opacity-40 sm:h-24 sm:w-24"
                  />
                  <p className="text-sm font-medium text-white/30">No data available</p>
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