import type { RefObject, UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import type { ICat7Data } from '../../../types/cat7';
import type { TableHeaderProps } from '../../../types/table';
import CommonTable, { Td } from '../../common/Table';
import type { SortState } from '../../common/Table';

type Props = {
  header       : TableHeaderProps[];
  activeSort   : SortState;
  setActiveSort: (data: SortState) => void;
  data         : ICat7Data[];
  tableRef    ?: RefObject<HTMLDivElement | null>;
  onScroll     : UIEventHandler<HTMLDivElement>;
};

const Table = ({ header, activeSort, setActiveSort, data, tableRef, onScroll }: Props) => {
  const { loading } = useAppSelector((state) => state.category);

  return (
    <CommonTable
      header={header}
      data={data}
      loading={loading}
      renderRow={(item) => (
        <>
          <Td>{item.Staff_ID}</Td>
          <Td>{item.Residential_address}</Td>
          <Td>{item.Main_transportation_type}</Td>
          <Td>{item.km}</Td>
          <Td>{item.Number_of_working_days}</Td>
          <Td>{item.PKT_p_km}</Td>
        </>
      )}
      activeSort={activeSort}
      onSortChange={setActiveSort}
      tableRef={tableRef}
      onScroll={onScroll}
      headerClassName="bg-[#636e61]/90 backdrop-blur-md"
    />
  );
};

export default Table;
