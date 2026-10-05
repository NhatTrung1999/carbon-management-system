import CommonTable, { Td } from '../../common/Table';
import type { TableHeaderProps, SortState } from '../../../types/table';
import type { InfoFactoryData } from '../../../types/infofactorymanagement';
import { formatDate } from '../../../utils/formatDate';

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: InfoFactoryData[];
  activeRow?: string | null;
  setActiveRow?: (value: string | null) => void;
  setItem?: (value: InfoFactoryData) => void;
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
  const handleRowClick = (item: InfoFactoryData) => {
    setActiveRow?.(item.ID === activeRow ? null : item.ID);
    setItem?.(item);
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
      rowClassName={(item) =>
        `${setActiveRow ? 'cursor-pointer' : ''} ${
          activeRow === item.ID
            ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
            : 'hover:bg-white/[0.04]'
        }`
      }
      renderRow={(item) => (
        <>
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
        </>
      )}
    />
  );
};

export default Table;
