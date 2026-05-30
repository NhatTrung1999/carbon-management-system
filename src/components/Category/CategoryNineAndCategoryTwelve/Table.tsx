import type { RefObject, UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import type { ICat9AndCat12Data } from '../../../types/cat9andcat12';
import type { TableHeaderProps } from '../../../types/table';
import { formatDate } from '../../../utils/formatDate';
import CommonTable, { Td } from '../../common/Table';
import type { SortState } from '../../common/Table';

type Props = {
  header       : TableHeaderProps[];
  activeSort   : SortState;
  setActiveSort: (data: SortState) => void;
  data         : ICat9AndCat12Data[];
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
          <Td>{item.No}</Td>
          <Td>{formatDate(item.Date)}</Td>
          <Td>{formatDate(item.Shipment_Date)}</Td>
          <Td>{item.Booking_No}</Td>
          <Td>{item.Invoice_Number}</Td>
          <Td>{item.Article_Name}</Td>
          <Td>{item.Article_ID}</Td>
          <Td>{item.Quantity}</Td>
          <Td>{item.Gross_Weight ? item.Gross_Weight.toFixed(2) : 0}</Td>
          <Td>{item.Customer_ID}</Td>
          <Td>{item.Local_Land_Transportation}</Td>
          <Td>{item.Port_Of_Departure}</Td>
          <Td>{item.Port_Of_Arrival}</Td>
          <Td>{item.Land_Transport_Distance}</Td>
          <Td>{item.Sea_Transport_Distance}</Td>
          <Td>{item.Air_Transport_Distance}</Td>
          <Td>{item.Transport_Method}</Td>
          <Td>{item.Land_Transport_Ton_Kilometers}</Td>
          <Td>{item.Sea_Transport_Ton_Kilometers}</Td>
          <Td>{item.Air_Transport_Ton_Kilometers}</Td>
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
