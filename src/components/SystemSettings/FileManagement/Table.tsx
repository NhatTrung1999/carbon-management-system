import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { FaCircleCheck } from 'react-icons/fa6';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import { useSocket } from '../../../hooks/useSocket';
import fileManagementApi from '../../../api/filemanagement';
import { getData } from '../../../features/fileSlice';
import type { TableHeaderProps } from '../../../types/table';
import type { IFileManagement } from '../../../types/filemanagement';
import { formatDate } from '../../../utils/formatDate';
import { Toast } from '../../../utils/Toast';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: IFileManagement[];
};

// ─── Constants ───────────────────────────────────────────────────────────────

const TH =
  'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-white align-middle';

// ─── Sub-components ──────────────────────────────────────────────────────────

const Td = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <td
    className={`whitespace-nowrap px-4 py-3 text-sm text-white ${
      className ?? ''
    }`}
  >
    {children ?? '—'}
  </td>
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

// Status badge — Done / Pending
const StatusBadge = ({ done }: { done: boolean }) =>
  done ? (
    <span
      className="inline-flex items-center gap-1.5 rounded-full
      bg-emerald-400/15 px-2.5 py-1 text-xs font-medium
      text-emerald-300 ring-1 ring-emerald-400/30"
    >
      <FaCircleCheck className="h-3 w-3 shrink-0" />
      Done
    </span>
  ) : (
    <span
      className="inline-flex items-center gap-1.5 rounded-full
      bg-blue-400/15 px-2.5 py-1 text-xs font-medium
      text-blue-300 ring-1 ring-blue-400/30"
    >
      <span
        className="h-3 w-3 shrink-0 animate-spin rounded-full
        border-2 border-blue-400/30 border-t-blue-400"
      />
      Pending
    </span>
  );

// ─── Component ───────────────────────────────────────────────────────────────

const Table = ({ header, activeSort, setActiveSort, data }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const socketRef = useSocket(import.meta.env.VITE_URLS);

  // ── Socket listeners ──────────────────────────────────────────────────────
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const refreshData = () =>
      dispatch(
        getData({
          file_name: '',
          module: '',
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        })
      );

    socket.on('file-excel-done', (msg: string) => {
      Toast.fire({ title: msg, icon: 'success' });
      refreshData();
    });

    socket.on('file-excel-error', (msg: string) => {
      Toast.fire({ title: msg, icon: 'error' });
    });

    return () => {
      socket.off('file-excel-done');
      socket.off('file-excel-error');
    };
  }, [socketRef]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDownload = async (id: string, fileName: string) => {
    try {
      const res = await fileManagementApi.downloadFile(id);
      const url = window.URL.createObjectURL(new Blob([res]));
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'file.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      Toast.fire({ text: 'Error', title: 'File not found!' });
    }
  };

  const handleRowClick = (item: IFileManagement) => {
    if (item.Status) {
      handleDownload(item.ID, item.File_Name);
    } else {
      Toast.fire({ title: 'File excel is still pending!', icon: 'warning' });
    }
  };

  const handleSort = (field: string, order: string) =>
    setActiveSort({ sortField: field, sortOrder: order });

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
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={header.length}
                className="px-6 py-14 text-center
                text-sm font-medium text-white/30"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr
                key={item.ID ?? i}
                onClick={() => handleRowClick(item)}
                className="cursor-pointer border-b border-white/[0.05]
                  transition-colors duration-150 hover:bg-white/[0.04]"
              >
                <Td>{item.Module}</Td>
                <Td>{item.File_Name}</Td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge done={Boolean(item.Status)} />
                </td>
                <Td>{item.CreatedAt}</Td>
                <Td>{formatDate(item.CreatedDate)}</Td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
