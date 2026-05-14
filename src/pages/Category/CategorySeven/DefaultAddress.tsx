import { useEffect, useState } from 'react';
import { FaEdit, FaSave, FaSync, FaTimes, FaTrash } from 'react-icons/fa';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Button from '../../../components/common/Button';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import NoData from '../../../assets/images/no-data.png';
import ModalDefaultAddress from '../../../components/Category/CategorySeven/DefaultAddress/ModalDefaultAddress';
import {
  deleteDefaultAddress,
  getDefaultAddress,
  syncDefaultAddress,
  updateDefaultAddress,
} from '../../../features/defaultaddressSlice';
import {
  type IDefaultAddress,
  HEADER_DEFAULT_ADDRESS,
} from '../../../types/defaultaddress';
import type { TableHeaderProps } from '../../../types/table';
import { formatDate } from '../../../utils/formatDate';
import { Toast } from '../../../utils/Toast';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortState = { sortField: string; sortOrder: string };

// ─── Constants ───────────────────────────────────────────────────────────────

const TH =
  'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-white align-middle';

const getMaxHeight = (loading: boolean, rowCount: number) => {
  if (loading && rowCount === 0) return 'max-h-[250px]';
  if (!loading && rowCount === 0) return 'max-h-[300px]';
  return 'max-h-[400px] sm:max-h-[500px] md:max-h-[600px]';
};

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
        className={`cursor-pointer transition-colors duration-150 ${
          isAsc ? 'text-emerald-300' : 'text-white/25 hover:text-white/60'
        }`}
      />
      <TiArrowSortedDown
        size={14}
        onClick={() => onSort(item.state, 'desc')}
        className={`cursor-pointer transition-colors duration-150 ${
          isDesc ? 'text-emerald-300' : 'text-white/25 hover:text-white/60'
        }`}
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
          style={{
            animationDelay: `${delay + i * 0.03}s`,
            width: `${60 + (i % 3) * 20}%`,
          }}
        />
      </td>
    ))}
  </tr>
);

// Inline edit input — glass style
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
    className="w-full min-w-[160px] rounded-lg border border-emerald-400/40
      bg-white/[0.08] px-3 py-1.5 text-sm text-white placeholder:text-white/30
      outline-none transition-all duration-200
      focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15"
  />
);

// Action icon button
const ActionBtn = ({
  onClick,
  title,
  disabled,
  className,
  children,
}: {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  className: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={`flex h-8 w-8 items-center justify-center rounded-lg
      border border-transparent transition-all duration-150
      disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
  >
    {children}
  </button>
);

const Spinner = ({ className }: { className: string }) => (
  <span
    className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-transparent ${className}`}
  />
);

// ─── Component ───────────────────────────────────────────────────────────────

const DefaultAddress = () => {
  const dispatch = useAppDispatch();
  const { defaultAddress, loading, loadingDelete } = useAppSelector(
    (s) => s.defaultaddress
  );
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<SortState>({
    sortField: HEADER_DEFAULT_ADDRESS[0].state,
    sortOrder: 'asc',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<IDefaultAddress | null>(
    null
  );
  const [syncingId, setSyncingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(
      getDefaultAddress({
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [activeSort]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleSort = (sortField: string, sortOrder: string) =>
    setActiveSort({ sortField, sortOrder });
  const handleEdit = (item: IDefaultAddress) => {
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

  const handleSave = async () => {
    if (!editFormData) return;
    await dispatch(
      updateDefaultAddress({
        id: editFormData.ID,
        defaultAddress: editFormData.DefaultAddress,
      })
    );
    handleCancel();
  };

  const handleDelete = async (id: string) => {
    const res = await dispatch(deleteDefaultAddress({ id }));
    Toast.fire({
      icon: deleteDefaultAddress.fulfilled.match(res) ? 'success' : 'error',
      title: deleteDefaultAddress.fulfilled.match(res)
        ? (res.payload as { message: string }).message
        : (res.payload as string),
    });
  };

  const handleSync = async (item: IDefaultAddress) => {
    setSyncingId(item.ID);
    const result = await dispatch(
      syncDefaultAddress({
        factory: item.Factory,
        defaultAddress: item.DefaultAddress,
      })
    );
    setSyncingId(null);
    Toast.fire({
      icon: syncDefaultAddress.fulfilled.match(result) ? 'success' : 'error',
      title: syncDefaultAddress.fulfilled.match(result)
        ? (result.payload as { message: string }).message
        : (result.payload as string),
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div>
        <Button
          label={t('main.import_excel_file')}
          type="button"
          variant="primary"
          imgSrc={ExcelIcon}
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto"
        />
      </div>

      {/* Table */}
      <div
        className={`${getMaxHeight(loading, defaultAddress.length)}
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
          {/* Header */}
          <thead
            className="sticky top-0 z-10  bg-[#636e61]/90 backdrop-blur-md"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
          >
            <tr>
              {HEADER_DEFAULT_ADDRESS.map((item, i) => (
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

          {/* Body */}
          <tbody>
            {/* Data rows */}
            {defaultAddress.map((item, i) => {
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
                  <Td>{item.No}</Td>
                  <Td>{item.Factory}</Td>

                  {/* Editable cell */}
                  <td className="px-4 py-2.5 text-sm text-white">
                    {isEditing ? (
                      <EditInput
                        name="DefaultAddress"
                        value={editFormData?.DefaultAddress ?? ''}
                        onChange={handleInputChange}
                      />
                    ) : (
                      item.DefaultAddress ?? '—'
                    )}
                  </td>

                  <Td>{item.CreatedBy}</Td>
                  <Td>{formatDate(item.CreatedAt)}</Td>
                  <Td>{item.UpdatedBy}</Td>
                  <Td>{formatDate(item.UpdatedAt)}</Td>

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
                            <FaSave size={14} />
                          </ActionBtn>
                          <ActionBtn
                            title="Cancel"
                            onClick={handleCancel}
                            className="border-red-400/20 bg-red-400/10 text-red-400
                              hover:bg-red-400/20 hover:border-red-400/40"
                          >
                            <FaTimes size={14} />
                          </ActionBtn>
                        </>
                      ) : (
                        <>
                          <ActionBtn
                            title="Sync"
                            onClick={() => handleSync(item)}
                            disabled={syncingId === item.ID}
                            className="border-amber-400/20 bg-amber-400/10 text-amber-400
                              hover:bg-amber-400/20 hover:border-amber-400/40"
                          >
                            {syncingId === item.ID ? (
                              <Spinner className="border-amber-400" />
                            ) : (
                              <FaSync size={13} />
                            )}
                          </ActionBtn>
                          <ActionBtn
                            title="Edit"
                            onClick={() => handleEdit(item)}
                            className="border-blue-400/20 bg-blue-400/10 text-blue-400
                              hover:bg-blue-400/20 hover:border-blue-400/40"
                          >
                            <FaEdit size={13} />
                          </ActionBtn>
                          <ActionBtn
                            title="Delete"
                            onClick={() => handleDelete(item.ID)}
                            disabled={loadingDelete}
                            className="border-red-400/20 bg-red-400/10 text-red-400
                              hover:bg-red-400/20 hover:border-red-400/40"
                          >
                            {loadingDelete ? (
                              <Spinner className="border-red-400" />
                            ) : (
                              <FaTrash size={13} />
                            )}
                          </ActionBtn>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* Skeleton — loading more */}
            {loading &&
              defaultAddress.length > 0 &&
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonRow
                  key={`sk-more-${i}`}
                  cols={HEADER_DEFAULT_ADDRESS.length}
                  delay={i * 0.05}
                />
              ))}

            {/* Skeleton — initial empty */}
            {loading &&
              defaultAddress.length === 0 &&
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow
                  key={`sk-init-${i}`}
                  cols={HEADER_DEFAULT_ADDRESS.length}
                  delay={i * 0.08}
                />
              ))}

            {/* No data */}
            {!loading && defaultAddress.length === 0 && (
              <tr>
                <td
                  colSpan={HEADER_DEFAULT_ADDRESS.length}
                  className="px-6 py-14 text-center"
                >
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

      {isOpen && <ModalDefaultAddress setIsOpen={setIsOpen} />}
    </div>
  );
};

export default DefaultAddress;
