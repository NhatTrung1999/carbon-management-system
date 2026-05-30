import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import type { RefObject, UIEventHandler, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import NoData from '../../assets/images/no-data.png';
import type { TableHeaderProps } from '../../types/table';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SortState = { sortField: string; sortOrder: string };

export type TableProps<T> = {
  header: TableHeaderProps[];
  data: T[];
  loading: boolean;
  renderRow: (item: T, index: number) => ReactNode;

  activeSort?: SortState;
  onSortChange?: (sort: SortState) => void;

  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll?: UIEventHandler<HTMLDivElement>;

  maxHeight?: string;
  noDataText?: string;
  className?: string;
  headerClassName?: string;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

export const Td = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <td
    className={`whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-white/90 ${className ?? ''}`}
  >
    {children ?? '—'}
  </td>
);

const SkeletonRow = ({ cols, delay = 0 }: { cols: number; delay?: number }) => (
  <tr className="border-b border-white/[0.05]">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div
          className="h-3.5 animate-pulse rounded-md bg-white/[0.06]"
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

// ─── Shared TH style ─────────────────────────────────────────────────────────

const TH =
  'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-white/90 align-middle';

// ─── Component ───────────────────────────────────────────────────────────────

const Table = <T,>({
  header,
  data,
  loading,
  renderRow,
  activeSort,
  onSortChange,
  tableRef,
  onScroll,
  maxHeight,
  noDataText = 'No data available',
  className,
  headerClassName,
}: TableProps<T>) => {
  const { t } = useTranslation();

  const hasGroups = header.some((h) => h.children?.length);
  const flatColumns = header.flatMap((h) =>
    h.children?.length ? h.children : [h],
  );
  const colCount = flatColumns.length;

  const defaultHeaderCls = 'bg-[#0d1f1b]/90 backdrop-blur-md';
  const hCls = headerClassName ?? defaultHeaderCls;

  // ── Preserve scroll position across loading cycles ────────────────────────
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
    onSortChange?.({ sortField: field, sortOrder: order });

  const heightClass = maxHeight ?? 'min-h-[320px] xl:min-h-0 xl:flex-1';

  return (
    <div
      ref={tableRef}
      onScroll={onScroll}
      className={`${heightClass}
        relative w-full min-w-0 overflow-auto rounded-xl
        border border-white/[0.08] bg-white/[0.03]
        backdrop-blur-sm transition-all duration-300
        [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
        [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar]:w-[3px]
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-emerald-400/20
        ${className ?? ''}`}
    >
      <table className="w-max min-w-full text-left">
        {/* ── Header ── */}
        {hasGroups ? (
          /* Grouped header: 2 rows — parents + children */
          <thead
            className={`sticky top-0 z-10 ${hCls}`}
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
          >
            <tr>
              {header.map((item, i) =>
                item.children?.length ? (
                  <th
                    key={i}
                    colSpan={item.children.length}
                    className={`${TH} text-center`}
                  >
                    {t(item.name)}
                  </th>
                ) : (
                  <th key={i} rowSpan={2} className={TH}>
                    <div className="flex items-center gap-1">
                      {t(item.name)}
                      {activeSort && onSortChange && (
                        <SortIcon
                          item={item}
                          activeSort={activeSort}
                          onSort={handleSort}
                        />
                      )}
                    </div>
                  </th>
                ),
              )}
            </tr>
            <tr>
              {header.flatMap((item) =>
                (item.children ?? []).map((child) => (
                  <th key={child.state} className={TH}>
                    <div className="flex items-center gap-1">
                      {t(child.name)}
                      {activeSort && onSortChange && (
                        <SortIcon
                          item={child}
                          activeSort={activeSort}
                          onSort={handleSort}
                        />
                      )}
                    </div>
                  </th>
                )),
              )}
            </tr>
          </thead>
        ) : (
          /* Flat header: shimmer row + single header row */
          <thead className="sticky top-0 z-10">
            <tr>
              <th
                colSpan={header.length}
                className="h-px p-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </tr>
            <tr className={hCls}>
              {header.map((item, i) => (
                <th key={i} className={TH}>
                  <div className="flex items-center gap-1">
                    {t(item.name)}
                    {activeSort && onSortChange && (
                      <SortIcon
                        item={item}
                        activeSort={activeSort}
                        onSort={handleSort}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        )}

        {/* ── Body ── */}
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="border-b border-white/[0.05] transition-colors duration-150
                hover:bg-white/[0.04]"
            >
              {renderRow(item, i)}
            </tr>
          ))}

          {loading &&
            data.length > 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRow
                key={`sk-more-${i}`}
                cols={colCount}
                delay={i * 0.05}
              />
            ))}

          {loading &&
            data.length === 0 &&
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRow
                key={`sk-init-${i}`}
                cols={colCount}
                delay={i * 0.08}
              />
            ))}

          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={colCount} className="px-6 py-14 text-center">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={NoData}
                    alt="No data"
                    className="h-20 w-20 object-contain opacity-40 sm:h-24 sm:w-24"
                  />
                  <p className="text-sm font-medium text-white/30">
                    {noDataText}
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
