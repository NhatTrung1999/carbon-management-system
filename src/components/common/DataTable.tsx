import type { ReactNode, RefObject, UIEventHandler } from 'react';
import CommonTable, { Td } from './Table';
import type { SortState, TableHeaderProps } from '../../types/table';
import { formatDate } from '../../utils/formatDate';

type Props<T> = {
  header: TableHeaderProps[];
  data: T[];
  loading: boolean;
  activeSort: SortState;
  onSortChange: (sort: SortState) => void;
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll?: UIEventHandler<HTMLDivElement>;
  /** Columns rendered through formatDate (YYYY-MM-DD). */
  dateFields?: string[];
};

/** CommonTable whose cells are generated from header[].state, in header order. */
const DataTable = <T extends object>({
  header,
  data,
  loading,
  activeSort,
  onSortChange,
  tableRef,
  onScroll,
  dateFields = [],
}: Props<T>) => (
  <CommonTable
    header={header}
    data={data}
    loading={loading}
    activeSort={activeSort}
    onSortChange={onSortChange}
    tableRef={tableRef}
    onScroll={onScroll}
    headerClassName="bg-[#636e61]/90 backdrop-blur-md"
    renderRow={(item) =>
      header.map((col) => {
        const value = (item as Record<string, unknown>)[col.state];
        return (
          <Td key={col.state}>
            {dateFields.includes(col.state)
              ? formatDate(value as string | null)
              : (value as ReactNode)}
          </Td>
        );
      })
    }
  />
);

export default DataTable;
