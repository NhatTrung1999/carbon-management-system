import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import type {
  Dispatch,
  RefObject,
  SetStateAction,
  UIEventHandler,
} from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../app/hooks';
import type { ICustomExportData } from '../../../../types/customexport';
import type { TableHeaderProps } from '../../../../types/table';
import NoData from '../../../../assets/images/no-data.png';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: ICustomExportData[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  setField?: Dispatch<SetStateAction<string[]>>;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const TH =
  'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-white align-middle';

const getMaxHeight = (loading: boolean, rowCount: number) => {
  if (loading && rowCount === 0) return 'max-h-[250px]';
  if (!loading && rowCount === 0) return 'max-h-[300px]';
  return 'max-h-[400px] sm:max-h-[500px] md:max-h-[600px]';
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const Td = ({ children }: { children?: React.ReactNode }) => (
  <td className="whitespace-nowrap px-4 py-3 text-sm text-white">
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
  onSort: (f: string, o: string) => void;
}) => {
  if (item.state === 'Action' || !item.sort) return null;
  const isAsc =
    activeSort.sortField === item.state && activeSort.sortOrder === 'asc';
  const isDesc =
    activeSort.sortField === item.state && activeSort.sortOrder === 'desc';
  return (
    <div className="flex flex-col gap-px">
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

// Glass checkbox — đồng bộ với Checkbox.tsx đã tối ưu
const GlassCheckbox = ({
  state,
  onChange,
}: {
  state: string;
  onChange: (value: string, checked: boolean) => void;
}) => (
  <label className="group flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="peer sr-only"
      onClick={(e) => onChange(state, e.currentTarget.checked)}
    />
    <span
      className="relative flex h-4 w-4 shrink-0 items-center justify-center
      rounded-md border border-white/[0.25] bg-white/[0.06]
      transition-all duration-200
      peer-checked:border-emerald-400/60 peer-checked:bg-emerald-400/20
      peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400/50
      group-hover:border-white/40"
    >
      <svg
        viewBox="0 0 10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-2.5 w-2.5 text-emerald-300
          scale-0 opacity-0 transition-all duration-150
          peer-checked:[&]:scale-100
          [.peer:checked~span>&]:scale-100 [.peer:checked~span>&]:opacity-100"
        aria-hidden="true"
      >
        <polyline points="1,5 3.5,8 9,2" />
      </svg>
    </span>
  </label>
);

// ─── Component ───────────────────────────────────────────────────────────────

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  tableRef,
  onScroll,
  setField,
}: Props) => {
  const { loading } = useAppSelector((state) => state.category);
  const { t } = useTranslation();

  // ── Preserve scroll position ──────────────────────────────────────────────
  const scrollPos = useRef({ top: 0, left: 0 });
  const wasLoading = useRef(false);

  useEffect(() => {
    if (loading && !wasLoading.current) {
      wasLoading.current = true;
      if (tableRef?.current)
        scrollPos.current = {
          top: tableRef.current.scrollTop,
          left: tableRef.current.scrollLeft,
        };
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

  const handleCheckbox = (value: string, checked: boolean) => {
    setField?.((prev) =>
      checked
        ? prev.includes(value)
          ? prev
          : [...prev, value]
        : prev.filter((v) => v !== value)
    );
  };

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
        <thead
          className="sticky top-0 z-10 bg-[#636e61]/90 backdrop-blur-md"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <tr>
            {header.map((item, i) => (
              <th key={i} className={TH}>
                <div className="flex items-center justify-between gap-3">
                  <span>{t(item.name)}</span>

                  {/* Checkbox + sort grouped on the right */}
                  <div className="flex items-center gap-2 shrink-0">
                    {setField && (
                      <GlassCheckbox
                        state={item.state}
                        onChange={handleCheckbox}
                      />
                    )}
                    <SortIcon
                      item={item}
                      activeSort={activeSort}
                      onSort={handleSort}
                    />
                  </div>
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
              <Td>{item.No}</Td>
              <Td>{item.Factory}</Td>
              <Td>{item.Department}</Td>
              <Td>{item.ID}</Td>
              <Td>{item.Full_Name}</Td>
              <Td>{item.Current_Address}</Td>
              <Td>{item.Transportation_Mode}</Td>
              <Td>{item.Bus_Route}</Td>
              <Td>{item.Pickup_Point}</Td>
              <Td>{item.Number_of_Working_Days}</Td>
            </tr>
          ))}

          {/* Skeleton — loading more */}
          {loading &&
            data.length > 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRow
                key={`sk-more-${i}`}
                cols={header.length}
                delay={i * 0.05}
              />
            ))}

          {/* Skeleton — initial empty */}
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
