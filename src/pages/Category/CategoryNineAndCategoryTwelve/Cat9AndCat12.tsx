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
    <div className="w-full">
      <div className="px-2 sm:px-4 md:px-6">
        <Search
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          factory={factory}
          setFactory={setFactory}
          activeSort={activeSort}
        />
      </div>

      <div className="mt-4 overflow-x-auto">
        <Table
          onScroll={onScroll}
          tableRef={tableRef}
          header={header}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={data}
        />
      </div>
    </div>
  );
};

export default Cat9AndCat12;
