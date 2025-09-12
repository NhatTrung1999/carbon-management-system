import { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Typography from "../../../components/common/Typography";
import { BreadcrumbData } from "../../../types/breadcrumb";

import Card from "../../../components/common/Card";
import Search from "../../../components/Category/CategoryNineAndCategoryTwelve/Search";
import Table from "../../../components/Category/CategoryNineAndCategoryTwelve/Table";
import {
  HEADER,
} from "../../../types/categorynineandcategorytwelve";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getDataCat9AndCat12 } from "../../../features/categorySlice";

const CategoryNineAndCategoryTwelvePage = () => {
  const { cat9andcat12 } = useAppSelector(state => state.category)
  const dispatch = useAppDispatch()
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: "asc",
  });

  useEffect(() => {
    dispatch(getDataCat9AndCat12('2025-09-11'))
  }, [])


  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData(
          "Carbon Management System",
          "Category Nine & Category Twelve"
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
