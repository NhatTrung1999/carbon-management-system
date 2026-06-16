import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import type { RefObject, UIEventHandler, ReactNode } from 'react';
import { useEffect, useRef, useState, useMemo } from 'react';
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

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

const FilterDropdown = ({
  field,
  values,
  active,
  onApply,
  onClose,
}: {
  field: string;
  values: string[];
  active: Set<string> | undefined;
  onApply: (field: string, selected: Set<string>) => void;
  onClose: () => void;
}) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(
    active ?? new Set(values),
  );
  const ref = useRef<HTMLDivElement>(null);

  const filtered = values.filter((v) =>
    v.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (v: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(values));
  const clearAll = () => setSelected(new Set());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1 w-48 rounded-lg border border-white/10 bg-[#0d1f1b] shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div className="p-2">
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm..."
          className="w-full rounded-md border border-white/10 bg-white/5 px-2 py-1.5
            text-xs text-white/80 placeholder-white/30 outline-none
            focus:border-emerald-400/40 focus:ring-0"
        />
      </div>

      {/* Select all / Clear */}
      <div className="flex gap-1 border-b border-white/[0.06] px-2 pb-2">
        <button
          onClick={selectAll}
          className="flex-1 rounded px-2 py-1 text-[11px] text-white/40
            hover:bg-white/5 hover:text-white/70 transition-colors"
        >
          Tất cả
        </button>
        <button
          onClick={clearAll}
          className="flex-1 rounded px-2 py-1 text-[11px] text-white/40
            hover:bg-white/5 hover:text-white/70 transition-colors"
        >
          Bỏ chọn
        </button>
      </div>

      {/* Checkbox list */}
      <div className="max-h-44 overflow-y-auto py-1 [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]">
        {filtered.length === 0 ? (
          <p className="px-3 py-2 text-[11px] text-white/30">Không tìm thấy</p>
        ) : (
          filtered.map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5
                hover:bg-white/[0.04] transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.has(v)}
                onChange={() => toggle(v)}
                className="h-3 w-3 accent-emerald-400"
              />
              <span className="truncate text-[11px] text-white/70">{v}</span>
            </label>
          ))
        )}
      </div>

      {/* Apply */}
      <div className="border-t border-white/[0.06] p-2">
        <button
          onClick={() => { onApply(field, selected); onClose(); }}
          className="w-full rounded-md bg-emerald-500/20 py-1.5 text-[11px]
            font-medium text-emerald-300 transition-colors hover:bg-emerald-500/30"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

const FilterIcon = ({
  item,
  filters,
  allValues,
  openFilter,
  onOpen,
  onClose,
  onApply,
}: {
  item: TableHeaderProps & { filterable?: boolean };
  filters: Record<string, Set<string>>;
  allValues: Record<string, string[]>;
  openFilter: string | null;
  onOpen: (field: string) => void;
  onClose: () => void;
  onApply: (field: string, selected: Set<string>) => void;
}) => {
  if (!item.filterable) return null;

  const isActive =
    filters[item.state] !== undefined &&
    filters[item.state].size !== (allValues[item.state]?.length ?? 0);
  const isOpen = openFilter === item.state;

  return (
    <div className="relative ml-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          isOpen ? onClose() : onOpen(item.state);
        }}
        className={`flex h-4 w-4 items-center justify-center rounded transition-colors
          ${isActive
            ? 'text-emerald-300'
            : 'text-white/25 hover:text-white/60'
          }`}
        title="Filter"
      >
        {/* Funnel icon */}
        <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
          <path d="M1.5 2h13l-5 6v5l-3-1.5V8L1.5 2z" />
        </svg>
      </button>

      {isOpen && (
        <FilterDropdown
          field={item.state}
          values={allValues[item.state] ?? []}
          active={filters[item.state]}
          onApply={onApply}
          onClose={onClose}
        />
      )}
    </div>
  );
};

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

  // ── Filter state ──────────────────────────────────────────────────────────
  const [filters, setFilters] = useState<Record<string, Set<string>>>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // Tính unique values cho mỗi cột filterable từ data gốc
  const allValues = useMemo(() => {
    const smartSort = (a: string, b: string) => {
      const numA = Number(a);
      const numB = Number(b);
      // Nếu cả 2 đều là số thì sort theo số
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      // Ngược lại sort theo string
      return a.localeCompare(b);
    };
    // Tự động trim ISO date string (2026-06-03T00:00:00.000Z → 2026-06-03)
    const formatValue = (val: string) =>
      /^\d{4}-\d{2}-\d{2}T/.test(val) ? val.slice(0, 10) : val;
    const result: Record<string, string[]> = {};
    flatColumns.forEach((col) => {
      if ((col as any).filterable) {
        result[col.state] = [
          ...new Set(
            data.map((item) => formatValue(String((item as any)[col.state] ?? '')))
          ),
        ].sort(smartSort);
      }
    });
    return result;
  }, [data, flatColumns]);

  // Reset filter khi data gốc thay đổi (đổi page, đổi dateFrom...)
  useEffect(() => {
    setFilters({});
  }, [data]);

  const handleApplyFilter = (field: string, selected: Set<string>) => {
    setFilters((prev) => {
      const next = { ...prev };
      // Nếu chọn hết thì xóa filter đó đi (= không filter)
      if (selected.size === (allValues[field]?.length ?? 0)) {
        delete next[field];
      } else {
        next[field] = selected;
      }
      return next;
    });
  };

  // Filter data trước khi render
  const filteredData = useMemo(() => {
    const trimDate = (val: string) =>
      /^\d{4}-\d{2}-\d{2}T/.test(val) ? val.slice(0, 10) : val;
    return data.filter((item) =>
      flatColumns.every((col) => {
        const active = filters[col.state];
        if (!active) return true;
        // trim date khi so sánh để khớp với giá trị hiển thị trong dropdown
        const val = trimDate(String((item as any)[col.state] ?? ''));
        return active.has(val);
      }),
    );
  }, [data, filters, flatColumns]);

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
      {loading && data.length === 0 && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="flex h-full flex-col">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="flex shrink-0 gap-4 border-b border-white/[0.05] px-4 py-3"
              >
                {Array.from({ length: colCount }).map((_, j) => (
                  <div
                    key={j}
                    className="h-3.5 flex-1 animate-pulse rounded-md bg-white/[0.06]"
                    style={{ animationDelay: `${i * 0.08 + j * 0.03}s` }}
                  />
                ))}
              </div>
            ))}
            <div className="flex-1" />
          </div>
        </div>
      )}

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
                      <FilterIcon
                        item={item as any}
                        filters={filters}
                        allValues={allValues}
                        openFilter={openFilter}
                        onOpen={setOpenFilter}
                        onClose={() => setOpenFilter(null)}
                        onApply={handleApplyFilter}
                      />
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
                      <FilterIcon
                        item={child as any}
                        filters={filters}
                        allValues={allValues}
                        openFilter={openFilter}
                        onOpen={setOpenFilter}
                        onClose={() => setOpenFilter(null)}
                        onApply={handleApplyFilter}
                      />
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
                    <FilterIcon
                      item={item as any}
                      filters={filters}
                      allValues={allValues}
                      openFilter={openFilter}
                      onOpen={setOpenFilter}
                      onClose={() => setOpenFilter(null)}
                      onApply={handleApplyFilter}
                    />
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
          {filteredData.map((item, i) => (
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

          {!loading && filteredData.length === 0 && (
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