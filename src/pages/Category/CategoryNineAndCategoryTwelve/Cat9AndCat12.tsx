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
  setActiveSort: (data: any) => void;
  data: ICat9AndCat12Data[];
  tableRef: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
};

const Cat9AndCat12 = ({
  activeSort,
  onScroll,
  tableRef,
  setActiveSort,
  data,
  header
}: Props) => {
  return (
    <>
      <Search activeSort={activeSort} />
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
