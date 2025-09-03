import { Fragment } from "react";
import { BreadcrumbData } from "../../../types/breadcrumb";

import Breadcrumb from "../../../components/common/Breadcrumb";
import Typography from "../../../components/common/Typography";
import Card from "../../../components/common/Card";

const CategoryOne = () => {
  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData(
          "Carbon Management System",
          "Category one"
        )}
      />

      <Typography
        name="Category one"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Purchased goods & Service"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card>sdfasdasdasd</Card>
    </Fragment>
  );
};

export default CategoryOne;
