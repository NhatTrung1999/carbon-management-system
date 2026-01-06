import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import type { TableHeaderProps } from '../../../types/table';
import type { IFileManagement } from '../../../types/filemanagement';
import { formatDate } from '../../../utils/formatDate';
import fileManagementApi from '../../../api/filemanagement';
import { Toast } from '../../../utils/Toast';
import { FaCircleCheck } from 'react-icons/fa6';
import { useEffect } from 'react';
import { useSocket } from '../../../hooks/useSocket';
import { useAppDispatch } from '../../../app/hooks';
import { getData } from '../../../features/fileSlice';
import { useTranslation } from 'react-i18next';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: IFileManagement[];
};

const Table = ({ header, activeSort, setActiveSort, data }: Props) => {
  const { t } = useTranslation();
  const socketRef = useSocket(import.meta.env.VITE_URLS);
  const dispatch = useAppDispatch();
  
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

  const handleDownloadFile = async (id: string, fileName: string) => {
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
    } catch (error) {
      console.log('Download error: ', error);
      Toast.fire({
        text: 'Error',
        title: 'File not found!',
      });
    }
  };

  const handleStatus = (item: IFileManagement) => {
    if (item.Status) {
      handleDownloadFile(item.ID, item.File_Name);
    } else {
      Toast.fire({
        title: 'File excel is still pending!',
        icon: 'warning',
      });
    }
  };

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on('file-excel-done', (data) => {
      Toast.fire({
        title: data,
        icon: 'success',
      });
      dispatch(
        getData({
          file_name: '',
          module: '',
          sortField: activeSort.sortField,
          sortOrder: activeSort.sortOrder,
        })
      );
    });

    socketRef.current.on('file-excel-error', (data) => {
      Toast.fire({
        title: data,
        icon: 'error',
      });
    });

    return () => {
      socketRef.current?.off('file-excel-done');
      socketRef.current?.off('file-excel-error');
    };
  }, [socketRef]);

  return (
    <div className="overflow-x-auto">
      <div className="max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto relative rounded-lg border border-gray-200">
        <table className="w-full text-left min-w-max">
          <thead className="bg-[#636e61] text-xs sm:text-sm sticky top-0 text-white z-10">
            <tr>
              {header.map((item, index) => (
                <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap" key={index}>
                  <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 items-center justify-between">
                    <span className="font-semibold">{t(item.name)}</span>
                    {item.sort && (
                      <span className="flex flex-col cursor-pointer">
                        {renderSortIcon(item)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={header.length}
                  className="text-center box-border px-4 sm:px-6 py-8 sm:py-12"
                >
                  <div className="text-sm sm:text-base text-gray-600">No data available</div>
                </td>
              </tr>
            ) : (
              <>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => handleStatus(item)}
                    className="cursor-pointer hover:bg-gray-100 border-b border-gray-200 transition-colors"
                  >
                    <td className="box-border px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium">
                      {item.Module}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium">
                      {item.File_Name}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-xs sm:text-sm">
                      {item.Status ? (
                        <div className="text-green-600 flex items-center gap-1.5 sm:gap-2">
                          <FaCircleCheck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="font-medium">Done</span>
                        </div>
                      ) : (
                        <div className="text-blue-600 flex items-center gap-1.5 sm:gap-2">
                          <div className="animate-spin border-2 sm:border-4 border-blue-300 border-t-blue-600 rounded-full w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"></div>
                          <span className="font-medium">Pending...</span>
                        </div>
                      )}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-xs sm:text-sm">
                      {item.CreatedAt}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                      {formatDate(item.CreatedDate)}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;