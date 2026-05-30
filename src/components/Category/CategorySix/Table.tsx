import type { RefObject, UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import type { ICat6Data } from '../../../types/cat6';
import type { TableHeaderProps } from '../../../types/table';
import { formatDate } from '../../../utils/formatDate';
import CommonTable from '../../common/Table';
import type { SortState } from '../../common/Table';

type Props = {
  header        : TableHeaderProps[];
  activeSort    : SortState;
  setActiveSort : (data: SortState) => void;
  data          : ICat6Data[];
  tableRef     ?: RefObject<HTMLDivElement | null>;
  onScroll      : UIEventHandler<HTMLDivElement>;
};

type Cat6Row = ICat6Data & Record<string, string | number | undefined>;

const DATE_FIELDS = new Set(['Document_Date', 'Start_Time', 'End_Time']);

const getCellValue = (row: Cat6Row, state: string): string => {
  const value = row[state];
  if (DATE_FIELDS.has(state)) return formatDate(value as string);
  return value !== undefined && value !== null ? String(value) : '—';
};

const Table = ({ header, activeSort, setActiveSort, data, tableRef, onScroll }: Props) => {
  const { loading } = useAppSelector((state) => state.category);

  const columns = header.flatMap((h) => h.children?.length ? h.children : [h]);

  return (
    <CommonTable
      header={header}
      data={data}
      loading={loading}
      renderRow={(item) => (
        <>
          {columns.map((col) => (
            <td
              key={col.state}
              className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-white/90"
            >
              {getCellValue(item as Cat6Row, col.state)}
            </td>
          ))}
        </>
      )}
      activeSort={activeSort}
      onSortChange={setActiveSort}
      tableRef={tableRef}
      onScroll={onScroll}
      headerClassName="bg-[#636e61] backdrop-blur-md"
    />
  );
};

export default Table;
