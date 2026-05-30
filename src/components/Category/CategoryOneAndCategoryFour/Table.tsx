import type { RefObject, UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import type { ICat1AndCat4Data } from '../../../types/cat1andcat4';
import type { TableHeaderProps } from '../../../types/table';
import { formatDate } from '../../../utils/formatDate';
import CommonTable, { Td } from '../../common/Table';
import type { SortState } from '../../common/Table';

type Props = {
  header       : TableHeaderProps[];
  activeSort   : SortState;
  setActiveSort: (data: SortState) => void;
  data         : ICat1AndCat4Data[];
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
          <Td>{item.FactoryCode}</Td>
          <Td>{formatDate(item.PurDate)}</Td>
          <Td>{formatDate(item.RKDate)}</Td>
          <Td>{item.PurNo}</Td>
          <Td>{item.ReceivedNo}</Td>
          <Td>{item.MatID}</Td>
          <Td>{item.QtyReceive}</Td>
          <Td>{item.UnitWeight}</Td>
          <Td>{item.WeightUnitkg}</Td>
          <Td>{item.SupplierCode}</Td>
          <Td>{item.Style}</Td>
          <Td>{item.TransportationMethod}</Td>
          <Td>{item.Departure}</Td>
          <Td>{item.ThirdCountryLandTransport}</Td>
          <Td>{item.PortOfDeparture}</Td>
          <Td>{item.PortOfArrival}</Td>
          <Td>{item.FactoryDomesticLandTransport}</Td>
          <Td>{item.Destination}</Td>
          <Td>{item.LandTransportDistance}</Td>
          <Td>{item.SeaTransportDistance}</Td>
          <Td>{item.AirTransportDistance}</Td>
          <Td>{item.LandTransportTonKilometers}</Td>
          <Td>{item.SeaTransportTonKilometers}</Td>
          <Td>{item.AirTransportTonKilometers}</Td>
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
