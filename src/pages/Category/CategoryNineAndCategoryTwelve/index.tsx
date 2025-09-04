import { Fragment } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Typography from "../../../components/common/Typography";
import { BreadcrumbData } from "../../../types/breadcrumb";

import CategoryNineAndCategoryTwelve from "../../../components/Category/CategoryNineAndCategoryTwelve";

const CategoryNineAndCategoryTwelvePage = () => {
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

      <CategoryNineAndCategoryTwelve />
    </Fragment>
  );
};

export default CategoryNineAndCategoryTwelvePage;
