import type { RefObject, UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import type { ICat5Data } from '../../../types/cat5';
import type { TableHeaderProps } from '../../../types/table';
import CommonTable, { Td } from '../../common/Table';
import type { SortState } from '../../common/Table';

type Props = {
  header       : TableHeaderProps[];
  activeSort   : SortState;
  setActiveSort: (data: SortState) => void;
  data         : ICat5Data[];
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
          <Td>{item.Waste_disposal_date}</Td>
          <Td>{item.Consolidated_Waste}</Td>
          <Td>{item.Waste_Code}</Td>
          <Td>{item.Vendor_Name}</Td>
          <Td>{item.Vendor_ID}</Td>
          <Td>{item.Waste_collection_address}</Td>
          <Td>{item.Location_Code}</Td>
          <Td>{item.Transportation_Distance_km}</Td>
          <Td>{item.The_type_of_waste}</Td>
          <Td>{item.Waste_type}</Td>
          <Td>{item.Waste_Treatment_method}</Td>
          <Td>{item.Treatment_Method_ID}</Td>
          <Td>{item.Weight_of_waste_treated_Unit_kg}</Td>
          <Td>{item.TKT_Ton_km}</Td>
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
