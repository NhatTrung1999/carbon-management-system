import { type RefObject, type UIEventHandler } from 'react';
import type { TableHeaderProps } from '../../../types/table';
import type { ICat9AndCat12Data } from '../../../types/cat9andcat12';
import Search from '../../../components/Category/CategoryNineAndCategoryTwelve/Search';
import Table from '../../../components/Category/CategoryNineAndCategoryTwelve/Table';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  dateFrom: string;
  setDateFrom: (dateVal: string) => void;
  dateTo: string;
  setDateTo: (dateVal: string) => void;
  factory: string;
  setFactory: (factoryVal: string) => void;
  setActiveSort: (data: any) => void;
  data: ICat9AndCat12Data[];
  tableRef: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
};

const Cat9AndCat12 = ({
  activeSort,
  onScroll,
  tableRef,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  factory,
  setFactory,
  setActiveSort,
  data,
  header,
}: Props) => {
  return (
    <>
      <Search
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        factory={factory}
        setFactory={setFactory}
        activeSort={activeSort}
      />
      <Table
        onScroll={onScroll}
        tableRef={tableRef}
        header={header}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        data={data}
      />
    </>
  );
};

export default Cat9AndCat12;
