import { Fragment, useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Typography from '../../../components/common/Typography';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Card from '../../../components/common/Card';
import Search from '../../../components/Category/CategoryNineAndCategoryTwelve/Search';
import Table from '../../../components/Category/CategoryNineAndCategoryTwelve/Table';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getDataCat9AndCat12,
  reseCat9AndCat12,
} from '../../../features/categorySlice';
import { HEADER } from '../../../types/cat9andcat12';

const CategoryNineAndCategoryTwelvePage = () => {
  const {
    cat9andcat12,
    offset,
    hasMore,
    loading,
    date: Date,
  } = useAppSelector((state) => state.category);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });
  const limit = 20;

  useEffect(() => {
    dispatch(reseCat9AndCat12());
    dispatch(getDataCat9AndCat12({ date: Date, offset, limit }));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const container = tableRef.current;
      if (!container || loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // console.log('Scrolled to bottom, load more data...');
        // const nextOffset = cat9andcat12.length
        dispatch(getDataCat9AndCat12({ date: Date, offset: offset, limit }));
      }
    };
    const container = tableRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [offset, hasMore, loading, dispatch]);

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData(
          'Carbon Management System',
          'Category Nine & Category Twelve'
        )}
      />

      <Typography
        name="Category Nine & Category Twelve"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Downstream And End‑of‑life"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card>
        <Search />
        <Table
          tableRef={tableRef}
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={cat9andcat12}
        />
      </Card>
    </Fragment>
  );
};

export default CategoryNineAndCategoryTwelvePage;
