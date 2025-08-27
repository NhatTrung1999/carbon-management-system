import { Link } from "react-router";
import type { ReactNode } from "react";
import PurchasedGoodsService from '../../assets/images/purchased-goods-service.png'
import UpstreamTransportationAndDistribution from '../../assets/images/upstream-transportation-and-distribution.png'
import WasteGeneratedInOperations from '../../assets/images/waste-generated-in-operations.png'
import BusinessTravel from '../../assets/images/business-travel.png'
import EmployeeCommuting from '../../assets/images/employee-commuting.png'
import DownstreamTransportationAndDistribution from '../../assets/images/downstream-transportation-and-distribution.png'
import EndOfLifeTreatmentOfSoldProducts from '../../assets/images/end-of-life-treatment-of-sold-products.png'

const sideBar: { text: string; path: string; icon: ReactNode }[] = [
  {
    text: "Purchased goods & Service",
    path: "/dashboard/purchased-goods-service",
    icon: <img src={PurchasedGoodsService} className="size-8" />,
  },
  {
    text: "Upstream transportation and distribution",
    path: "/dashboard/upstream-transportation-and-distribution",
    icon: <img src={UpstreamTransportationAndDistribution} className="size-8" />,
  },
  {
    text: "Waste generated in operations",
    path: "/dashboard/waste-generated-in-operations",
    icon: <img src={WasteGeneratedInOperations} className="size-8" />,
  },
  {
    text: "Business travel",
    path: "/dashboard/business-travel",
    icon: <img src={BusinessTravel} className="size-8" />,
  },
  {
    text: "Employee commuting",
    path: "/dashboard/employee-commuting",
    icon: <img src={EmployeeCommuting} className="size-8" />,
  },
  {
    text: "Downstream transportation and distribution",
    path: "/dashboard/downstream-transportation-and-distribution",
    icon: <img src={DownstreamTransportationAndDistribution} className="size-8" />,
  },
  {
    text: "End‑of‑life treatment of sold products",
    path: "/dashboard/end‑of‑life-treatment-of-sold-products",
    icon: <img src={EndOfLifeTreatmentOfSoldProducts} className="size-8" />,
  },
];

const Sidebar = () => {
  return (
    <div className="w-xs fixed left-0 top-0 bottom-0 pt-[70px] border-r border-gray-200 shadow-xl">
      <div className="p-5">
        <ul className="space-y-2">
          {sideBar.map((item, i) => (
            <li key={i} className="hover:bg-gray-100 p-2 rounded cursor-pointer text-base font-semibold">
              <Link
                to={item.path}
                className="flex items-center gap-3"
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
