import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useState, type RefObject, type UIEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import type { TableHeaderProps } from '../../../types/table';
import type { IHRModule } from '../../../types/hrmodule';
import { formatDate } from '../../../utils/formatDate';
import NoData from '../../../assets/images/no-data.png';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: IHRModule[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  onSave: (item: IHRModule) => void;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const TH =
  'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-white align-middle';

const TRANSPORT_OPTIONS = [
  'Walking',
  'Bicycle',
  'Electric motorcycle',
  'Motorcycle',
  'Electric car',
  'Car',
  'Bus',
  'Company shuttle bus',
];

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

// Glass inline text input
const EditInput = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    autoFocus
    className="min-w-[160px] w-full rounded-lg border border-emerald-400/40
      bg-white/[0.08] px-3 py-1.5 text-sm text-white placeholder:text-white/30
      outline-none transition-all duration-200
      focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15"
  />
);

// Glass inline select
const EditSelect = ({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="relative min-w-[180px]">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full appearance-none rounded-lg border border-emerald-400/40
        bg-white/[0.08] px-3 py-1.5 pr-8 text-sm text-white outline-none
        cursor-pointer transition-all duration-200
        focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15
        [&>option]:bg-[#0a1f18] [&>option]:text-white"
    >
      <option value="" className="bg-[#0a1f18]" />
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#0a1f18]">
          {opt}
        </option>
      ))}
    </select>
    {/* Chevron */}
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-2.5 top-1/2 h-2.5 w-2.5
        -translate-y-1/2 text-white/50"
    >
      <polyline points="1,3 5,7 9,3" />
    </svg>
  </div>
);

// Action icon button
const ActionBtn = ({
  onClick,
  title,
  className,
  children,
}: {
  onClick: () => void;
  title: string;
  className: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`flex h-8 w-8 items-center justify-center rounded-lg
      border border-transparent transition-all duration-150 ${className}`}
  >
    {children}
  </button>
);

// ─── Component ───────────────────────────────────────────────────────────────

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  tableRef,
  onScroll,
  onSave,
}: Props) => {
  const { t } = useTranslation();
  const { loading } = useAppSelector((state) => state.hrmodule);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<IHRModule | null>(null);

  const handleSort = (field: string, order: string) =>
    setActiveSort({ sortField: field, sortOrder: order });
  const handleEdit = (item: IHRModule) => {
    setEditingId(item.ID);
    setEditFormData(item);
  };
  const handleCancel = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editFormData)
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!editFormData) return;
    onSave(editFormData);
    setEditingId(null);
    setEditFormData(null);
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
          className="sticky top-0 z-10 bg-[#636e61] backdrop-blur-md"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <tr>
            {header.map((item, i) => (
              <th key={i} className={TH}>
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
          {data.map((item, i) => {
            const isEditing = editingId === item.ID;
            return (
              <tr
                key={item.ID ?? i}
                className={`border-b border-white/[0.05] transition-colors duration-150
                  ${
                    isEditing
                      ? 'bg-emerald-400/[0.04]'
                      : 'hover:bg-white/[0.04]'
                  }`}
              >
                <Td>{item.ID}</Td>
                <Td>{item.FullName}</Td>
                <Td>{item.Department}</Td>
                <Td>{formatDate(item.JoinDate)}</Td>
                <Td>{item.PermanentAddress}</Td>

                {/* Editable: CurrentAddress */}
                <td className="px-4 py-2.5 text-sm text-white">
                  {isEditing ? (
                    <EditInput
                      name="CurrentAddress"
                      value={editFormData?.CurrentAddress ?? ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.CurrentAddress ?? '—'
                  )}
                </td>

                {/* Editable: TransportationMethod */}
                <td className="px-4 py-2.5 text-sm text-white">
                  {isEditing ? (
                    <EditSelect
                      name="TransportationMethod"
                      value={editFormData?.TransportationMethod ?? ''}
                      options={TRANSPORT_OPTIONS}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.TransportationMethod ?? '—'
                  )}
                </td>

                <Td>{item.Number_of_Working_Days}</Td>

                {/* Actions */}
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-center gap-1.5">
                    {isEditing ? (
                      <>
                        <ActionBtn
                          title="Save"
                          onClick={handleSave}
                          className="border-emerald-400/20 bg-emerald-400/10 text-emerald-400
                            hover:bg-emerald-400/20 hover:border-emerald-400/40"
                        >
                          <FaSave size={13} />
                        </ActionBtn>
                        <ActionBtn
                          title="Cancel"
                          onClick={handleCancel}
                          className="border-red-400/20 bg-red-400/10 text-red-400
                            hover:bg-red-400/20 hover:border-red-400/40"
                        >
                          <FaTimes size={13} />
                        </ActionBtn>
                      </>
                    ) : (
                      <ActionBtn
                        title="Edit"
                        onClick={() => handleEdit(item)}
                        className="border-blue-400/20 bg-blue-400/10 text-blue-400
                          hover:bg-blue-400/20 hover:border-blue-400/40"
                      >
                        <FaEdit size={13} />
                      </ActionBtn>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}

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
