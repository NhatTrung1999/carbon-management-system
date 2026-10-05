import { useAppSelector } from '../../../app/hooks';
import CommonTable, { Td } from '../../common/Table';
import type { TableHeaderProps, SortState } from '../../../types/table';
import type { IUserManagement } from '../../../types/users';
import { formatDate } from '../../../utils/formatDate';

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: IUserManagement[];
  activeRow?: string | null;
  setActiveRow?: (value: string | null) => void;
  setItem?: (value: IUserManagement) => void;
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
  const { loading } = useAppSelector((state) => state.user);

  const handleRowClick = (item: IUserManagement) => {
    setActiveRow?.(item.ID === activeRow ? null : item.ID);
    setItem?.(item);
  };

  return (
    <CommonTable
      header={header}
      data={data}
      loading={loading}
      activeSort={activeSort}
      onSortChange={setActiveSort}
      headerClassName="bg-[#636e61]/90 backdrop-blur-md"
      onRowClick={handleRowClick}
      rowClassName={(item) =>
        `${setActiveRow ? 'cursor-pointer' : ''} ${
          activeRow === item.ID
            ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
            : 'hover:bg-white/[0.04]'
        }`
      }
      renderRow={(item) => (
        <>
          <Td>{item.UserID}</Td>
          <Td>{item.Name}</Td>
          <Td>{item.Email}</Td>
          <Td>{item.Role}</Td>
          <Td>{item.Status}</Td>
          <Td>{item.CreatedAt}</Td>
          <Td>{formatDate(item.CreatedDate)}</Td>
          <Td>{item.UpdatedAt}</Td>
          <Td>{formatDate(item.UpdatedDate)}</Td>
        </>
      )}
    />
  );
};

export default Table;
