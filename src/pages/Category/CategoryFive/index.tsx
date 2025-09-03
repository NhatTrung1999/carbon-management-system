import { Fragment } from "react/jsx-runtime";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Typography from "../../../components/common/Typography";
import { BreadcrumbData } from "../../../types/breadcrumb";

const CategoryFive = () => {
  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'Category five')}
      />

      <Typography
        name="Category five"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Waste generated in operations"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
    </Fragment>
  );
};

export default CategoryFive;
