import type { TableHeaderProps } from '../../../types/table';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { formatDate } from '../../../utils/formatDate';
import type { IUserManagement } from '../../../types/users';
import { useTranslation } from 'react-i18next';

type SortState = { sortField: string; sortOrder: string };

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: IUserManagement[];
  activeRow?: string | null;
  setActiveRow?: (value: string | null) => void;
  setItem?: (value: IUserManagement) => void;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const TH =
  'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-white align-middle';

// ─── Sub-components ──────────────────────────────────────────────────────────

const Td = ({ children }: { children?: React.ReactNode }) => (
  <td className="whitespace-nowrap px-4 py-3 text-sm text-white">
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

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  activeRow,
  setActiveRow,
  setItem,
}: Props) => {
  const { t } = useTranslation();

  const handleSort = (field: string, order: string) =>
    setActiveSort({ sortField: field, sortOrder: order });

  const handleRowClick = (item: IUserManagement) => {
    setActiveRow?.(item.ID === activeRow ? null : item.ID);
    setItem?.(item);
  };

  return (
    // <div className="overflow-x-auto">
    //   <div className="min-h-[320px] xl:min-h-0 xl:flex-1 overflow-y-auto relative rounded-lg border border-gray-200">
    //     <table className="w-max min-w-full text-left">
    //       <thead className="bg-[#636e61] text-xs sm:text-sm sticky top-0 text-white z-10">
    //         <tr>
    //           {header.map((item, index) => (
    //             <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap" key={index}>
    //               <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 items-center">
    //                 <span className="font-semibold">{t(item.name)}</span>
    //                 {item.sort && (
    //                   <span className="flex flex-col cursor-pointer">
    //                     {renderSortIcon(item)}
    //                   </span>
    //                 )}
    //               </div>
    //             </th>
    //           ))}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.length === 0 ? (
    //           <tr>
    //             <td
    //               colSpan={header.length}
    //               className="text-center box-border px-4 sm:px-6 py-8 sm:py-12"
    //             >
    //               <div className="text-sm sm:text-base text-gray-600">No data available</div>
    //             </td>
    //           </tr>
    //         ) : (
    //           <>
    //             {data.map((item, index) => (
    //               <tr
    //                 key={index}
    //                 className={`cursor-pointer border-b border-gray-200 transition-colors ${
    //                   activeRow === item.ID
    //                     ? 'bg-[#a7baa4] text-white hover:bg-[#96a993]'
    //                     : 'hover:bg-gray-100'
    //                 }`}
    //                 onClick={() => {
    //                   setActiveRow(item.ID === activeRow ? null : item.ID);
    //                   setItem(item);
    //                 }}
    //               >
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm whitespace-nowrap">
    //   {item.UserID}
    // </td>
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
    //   {item.Name}
    // </td>
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
    //   {item.Email}
    // </td>
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
    //   <span
    //   // className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
    //   //   item.Role === 'Admin'
    //   //     ? 'bg-purple-100 text-purple-800'
    //   //     : 'bg-blue-100 text-blue-800'
    //   // }`}
    //   >
    //     {item.Role}
    //   </span>
    // </td>
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
    //   <span
    //   // className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
    //   //   item.Status === 'Active'
    //   //     ? 'bg-green-100 text-green-800'
    //   //     : 'bg-red-100 text-red-800'
    //   // }`}
    //   >
    //     {item.Status}
    //   </span>
    // </td>
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
    //   {item.CreatedAt}
    // </td>
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm whitespace-nowrap">
    //   {formatDate(item.CreatedDate)}
    // </td>
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
    //   {item.UpdatedAt}
    // </td>
    // <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm whitespace-nowrap">
    //   {formatDate(item.UpdatedDate)}
    // </td>
    //               </tr>
    //             ))}
    //           </>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div
      className="min-h-[320px] xl:min-h-0 xl:flex-1
            relative w-full min-w-0 overflow-auto rounded-xl
            border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm
            [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
            [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar]:w-[3px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-emerald-400/20"
    >
      <table className="w-max min-w-full text-left">
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
            data.map((item, i) => {
              const isActive = activeRow === item.ID;
              return (
                <tr
                  key={item.ID ?? i}
                  onClick={() => handleRowClick(item)}
                  className={`border-b border-white/[0.05] transition-colors duration-150
                        ${setActiveRow ? 'cursor-pointer' : ''}
                        ${
                          isActive
                            ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
                            : 'hover:bg-white/[0.04]'
                        }`}
                >
                  <Td>{item.UserID}</Td>
                  <Td>{item.Name}</Td>
                  <Td>{item.Email}</Td>
                  <Td>
                    <span>{item.Role}</span>
                  </Td>
                  <Td>
                    <span>{item.Status}</span>
                  </Td>
                  <Td>{item.CreatedAt}</Td>
                  <Td>{formatDate(item.CreatedDate)}</Td>
                  <Td>{item.UpdatedAt}</Td>
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
