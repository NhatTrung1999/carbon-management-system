import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { useTranslation } from 'react-i18next';
import type { TableHeaderProps } from '../../../types/table';
import type { InfoFactoryData } from '../../../types/infofactorymanagement';
import { formatDate } from '../../../utils/formatDate';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };

type Props = {
  header       : TableHeaderProps[];
  activeSort   : SortState;
  setActiveSort: (data: SortState) => void;
  data         : InfoFactoryData[];
  activeRow   ?: string | null;
  setActiveRow?: (value: string | null) => void;
  setItem     ?: (value: InfoFactoryData) => void;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const TH = 'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-white align-middle';

// ─── Sub-components ──────────────────────────────────────────────────────────

const Td = ({ children }: { children?: React.ReactNode }) => (
  <td className="whitespace-nowrap px-4 py-3 text-sm text-white">
    {children ?? '—'}
  </td>
);

const SortIcon = ({
  item, activeSort, onSort,
}: {
  item: TableHeaderProps; activeSort: SortState; onSort: (f: string, o: string) => void;
}) => {
  if (item.state === 'Action' || !item.sort) return null;
  const isAsc  = activeSort.sortField === item.state && activeSort.sortOrder === 'asc';
  const isDesc = activeSort.sortField === item.state && activeSort.sortOrder === 'desc';
  return (
    <div className="ml-1.5 flex flex-col gap-px">
      <TiArrowSortedUp size={14} onClick={() => onSort(item.state, 'asc')}
        className={`cursor-pointer transition-colors duration-150
          ${isAsc ? 'text-emerald-300' : 'text-white/25 hover:text-white/60'}`} />
      <TiArrowSortedDown size={14} onClick={() => onSort(item.state, 'desc')}
        className={`cursor-pointer transition-colors duration-150
          ${isDesc ? 'text-emerald-300' : 'text-white/25 hover:text-white/60'}`} />
    </div>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

const Table = ({ header, activeSort, setActiveSort, data, activeRow, setActiveRow, setItem }: Props) => {
  const { t } = useTranslation();

  const handleSort = (field: string, order: string) =>
    setActiveSort({ sortField: field, sortOrder: order });

  const handleRowClick = (item: InfoFactoryData) => {
    setActiveRow?.(item.ID === activeRow ? null : item.ID);
    setItem?.(item);
  };

  return (
    <div
      className="max-h-[400px] sm:max-h-[500px] md:max-h-[600px]
        relative overflow-auto rounded-xl
        border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm
        [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
        [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar]:w-[3px]
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-emerald-400/20"
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
                <div className="flex items-center gap-1">
                  {t(item.name)}
                  <SortIcon item={item} activeSort={activeSort} onSort={handleSort} />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={header.length} className="px-6 py-14 text-center
                text-sm font-medium text-white/30">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, i) => {
              const isActive = activeRow === item.ID;
              return (
                <tr
                  key={item.ID ?? i}
                  onClick={() => handleRowClick(item)}
                  className={`border-b border-white/[0.05] transition-colors duration-150
                    ${setActiveRow ? 'cursor-pointer' : ''}
                    ${isActive
                      ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
                      : 'hover:bg-white/[0.04]'
                    }`}
                >
                  <Td>{item.COMID}</Td>
                  <Td>{item.CompanyName}</Td>
                  <Td>{item.Address}</Td>
                  <Td>{item.City}</Td>
                  <Td>{item.Tel}</Td>
                  <Td>{item.Fax}</Td>
                  <Td>{item.AccountNo}</Td>
                  <Td>{item.YN}</Td>
                  <Td>{item.NameVN}</Td>
                  <Td>{item.CreatedUser}</Td>
                  <Td>{item.CreatedFactory}</Td>
                  <Td>{formatDate(item.CreatedDate)}</Td>
                  <Td>{item.UpdatedUser}</Td>
                  <Td>{item.UpdatedFactory}</Td>
                  <Td>{formatDate(item.UpdatedDate)}</Td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;