import { IoIosArrowForward } from "react-icons/io";
import type { BreadcrumbProp } from "../../types/breadcrumb";
import { Link } from "react-router";

type Props = {
  items: BreadcrumbProp[];
};

const Breadcrumb = ({ items }: Props) => {
  return (
    <div className="text-base relative flex justify-end items-center gap-1 mb-7">
      {items?.map((item, index) => (
        <span
          key={item.name || index}
          className="flex items-center gap-1 whitespace-nowrap"
        >
          {item.status_route ? (
            <Link to={`${item.route}`} className="flex items-center gap-1">
              {item.name}
              {index === items.length - 1 ? "" : <IoIosArrowForward />}
            </Link>
          ) : (
            <>
              {item.name}
              {index === items.length - 1 ? "" : <IoIosArrowForward />}
            </>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
