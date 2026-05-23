import Button from '../../../components/common/Button';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import type { TableHeaderProps } from '../../../types/table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import NoData from '../../../assets/images/no-data.png';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteStyleAutoFill,
  getStyleAutoFill,
} from '../../../features/categorySlice';
import { formatDate } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';
import {
  type IStyleAutoFill,
  HEADER_STYLE_AUTO_FILL,
} from '../../../types/cat1andcat4';
import ModalStyleAutoFill from '../../../components/Category/CategoryOneAndCategoryFour/StyleAutoFill/ModalStyleAutoFill';
import Swal from 'sweetalert2';
import { Toast } from '../../../utils/Toast';

type Props = {
  header: TableHeaderProps[];
  data: IStyleAutoFill[];
};

type SortState = { sortField: string; sortOrder: string };
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getHeight = (loading: boolean, rowCount: number) => {
  if (loading && rowCount === 0) return 'min-h-[320px] xl:min-h-0 xl:flex-1';
  if (!loading && rowCount === 0) return 'min-h-[320px] xl:min-h-0 xl:flex-1';
  return 'min-h-[320px] xl:min-h-0 xl:flex-1';
};

const StyleAutoFill = ({ header, data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.category);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER_STYLE_AUTO_FILL[0].state,
    sortOrder: 'asc',
  });
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getStyleAutoFill({
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [activeSort]);

  const handleImportExcel = () => {
    setIsOpen(true);
  };

  const handleDeleteClick = async (item: IStyleAutoFill) => {
    const result = await Swal.fire({
      text: `Do you want to delete prefix "${item.PrefixOfMatCode}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });

    if (result.isConfirmed) {
      setDeletingId(item.Id);
      try {
        const res = await dispatch(deleteStyleAutoFill({ id: item.Id }));
        if (deleteStyleAutoFill.fulfilled.match(res)) {
          Toast.fire({
            title: res.payload.message,
            icon: 'success',
          });
        } else {
          Toast.fire({
            title: res.payload as string,
            icon: 'error',
          });
        }
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleSort = (field: string, order: string) =>
    setActiveSort({ sortField: field, sortOrder: order });

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0">
      <div className="mb-4 sm:mb-5 px-2 sm:px-0">
        <Button
          label={t('main.import_excel_file')}
          type="button"
          className="w-full sm:w-auto bg-green-500/20 border-green-400/40 hover:bg-green-500 text-white"
          imgSrc={ExcelIcon}
          onClick={handleImportExcel}
        />
      </div>

      {/* <div className="mt-4 flex min-h-[320px] min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1">
        <div
          className={`${getTableHeight()} overflow-y-auto relative rounded-lg border border-gray-200 bg-white transition-all duration-300`}
        >
          <table className="w-max min-w-full text-left">
            <thead className="bg-[#636e61] text-xs sm:text-sm sticky top-0 text-white z-10">
              <tr>
                {header.map((item, index) => (
                  <th
                    className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap"
                    key={index}
                  >
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
              {data.length > 0 &&
                data.map((item) => (
                  <tr
                    key={item.Id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Td>
                      {item.No}
                    </td>
                    <Td>
                      {item.PrefixOfMatCode}
                    </td>
                    <Td>
                      {item.Style}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {item.CreatedBy}
                    </td>
                    <Td>
                      {formatDate(item.CreatedAt)}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {item.UpdatedBy}
                    </td>
                    <Td>
                      {formatDate(item.UpdatedAt)}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                        disabled={deletingId === item.Id}
                      >
                        {deletingId === item.Id ? (
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full" />
                        ) : (
                          <FaTrash size={18} color='#316fb5' />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}

              {loading &&
                data.length > 0 &&
                Array.from({ length: 3 }).map((_, i) => (
                  <tr
                    key={`skeleton-${i}`}
                    className="border-b border-gray-200"
                  >
                    {header.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3"
                      >
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                      </td>
                    ))}
                  </tr>
                ))}

              {loading &&
                data.length === 0 &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr
                    key={`skeleton-loading-${i}`}
                    className="border-b border-gray-200"
                  >
                    {header.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3"
                      >
                        <div
                          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))}

              {!loading && data.length === 0 && (
                <tr>
                  <td
                    colSpan={header.length}
                    className="text-center box-border px-4 sm:px-6 py-8 sm:py-12"
                  >
                    <div className="flex justify-center items-center flex-col space-y-3">
                      <img
                        src={NoData}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain"
                        alt="No data"
                      />
                      <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">
                        No data available
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}
      <div
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
                <Td>{item.No}</Td>
                <Td>{item.PrefixOfMatCode}</Td>
                <Td>{item.Style}</Td>
                <Td>{item.CreatedBy}</Td>
                <Td>{formatDate(item.CreatedAt)}</Td>
                <Td>{item.UpdatedBy}</Td>
                <Td>{formatDate(item.UpdatedAt)}</Td>
                <Td>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                    disabled={deletingId === item.Id}
                  >
                    {deletingId === item.Id ? (
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full" />
                    ) : (
                      <FaTrash size={18} color="#316fb5" />
                    )}
                  </button>
                </Td>
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

      {isOpen && <ModalStyleAutoFill setIsOpen={setIsOpen} />}
    </div>
  );
};

export default StyleAutoFill;
