import { Fragment, useState } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Typography from "../../../components/common/Typography";
import { BreadcrumbData } from "../../../types/breadcrumb";

import Card from "../../../components/common/Card";
import Search from "../../../components/Category/CategoryNineAndCategoryTwelve/Search";
import Table from "../../../components/Category/CategoryNineAndCategoryTwelve/Table";
import {
  HEADER,
  type ICategoryNineAndCategoryTwelve,
} from "../../../types/categorynineandcategorytwelve";

const CategoryNineAndCategoryTwelvePage = () => {
  const [getCatNineAndTwelveData, setGetCatNineAndTwelveData] = useState<
    ICategoryNineAndCategoryTwelve | any
  >([]);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: "asc",
  });

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
        <Search setGetCatNineAndTwelveData={setGetCatNineAndTwelveData} />
        <Table
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          data={getCatNineAndTwelveData}
        />
      </Card>
    </Fragment>
  );
};

export default CategoryNineAndCategoryTwelvePage;
