import { useTranslation } from 'react-i18next';
import { FaCircleCheck } from 'react-icons/fa6';
import { useSocket } from '../../../hooks/useSocket';
import CommonTable, { Td } from '../../common/Table';
import fileManagementApi from '../../../api/filemanagement';
import type { TableHeaderProps, SortState } from '../../../types/table';
import type { IFileManagement } from '../../../types/filemanagement';
import { formatDate } from '../../../utils/formatDate';
import { Toast } from '../../../utils/Toast';
import { downloadBlob } from '../../../utils/download';
import i18n from '../../../i18n';

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: IFileManagement[];
  /** Reloads the list with the page's current search and sort. */
  onReload: () => void;
};

// Status badge — Done / Pending
const StatusBadge = ({ done }: { done: boolean }) => {
  const { t } = useTranslation();
  return done ? (
    <span
      className="inline-flex items-center gap-1.5 rounded-full
      bg-emerald-400/15 px-2.5 py-1 text-xs font-medium
      text-emerald-300 ring-1 ring-emerald-400/30"
    >
      <FaCircleCheck className="h-3 w-3 shrink-0" />
      {t('common.done')}
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
      {t('common.pending')}
    </span>
  );
};

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  onReload,
}: Props) => {
  // ── Socket listeners ──────────────────────────────────────────────────────
  useSocket(import.meta.env.VITE_URLS, {
    'file-excel-done': (msg) => {
      Toast.fire({ title: msg, icon: 'success' });
      onReload();
    },
    'file-excel-error': (msg) => {
      Toast.fire({ title: msg, icon: 'error' });
    },
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDownload = async (id: string, fileName: string) => {
    try {
      const res = await fileManagementApi.downloadFile(id);
      downloadBlob(res, fileName || 'file.xlsx');
    } catch {
      Toast.fire({ icon: 'error', title: i18n.t('common.file_not_found') });
    }
  };

  const handleRowClick = (item: IFileManagement) => {
    if (item.Status) {
      handleDownload(item.ID, item.File_Name);
    } else {
      Toast.fire({ title: i18n.t('common.file_pending'), icon: 'warning' });
    }
  };

  return (
    <CommonTable
      header={header}
      data={data}
      loading={false}
      activeSort={activeSort}
      onSortChange={setActiveSort}
      headerClassName="bg-[#636e61]/90 backdrop-blur-md"
      onRowClick={handleRowClick}
      rowClassName={() => 'cursor-pointer hover:bg-white/[0.04]'}
      renderRow={(item) => (
        <>
          <Td>{item.Module}</Td>
          <Td>{item.File_Name}</Td>
          <Td>
            <StatusBadge done={Boolean(item.Status)} />
          </Td>
          <Td>{item.CreatedAt}</Td>
          <Td>{formatDate(item.CreatedDate)}</Td>
        </>
      )}
    />
  );
};

export default Table;
