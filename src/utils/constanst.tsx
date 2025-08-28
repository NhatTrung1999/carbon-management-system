import PurchasedGoodsService from "../assets/images/purchased-goods-service.png";
import UpstreamTransportationAndDistribution from "../assets/images/upstream-transportation-and-distribution.png";
import WasteGeneratedInOperations from "../assets/images/waste-generated-in-operations.png";
import BusinessTravel from "../assets/images/business-travel.png";
import EmployeeCommuting from "../assets/images/employee-commuting.png";
import DownstreamTransportationAndDistribution from "../assets/images/downstream-transportation-and-distribution.png";
import EndOfLifeTreatmentOfSoldProducts from "../assets/images/end-of-life-treatment-of-sold-products.png";

import UserSettings from "../assets/images/user-settings.png";
import Excel from "../assets/images/excel.png";

const LANGUAGES = [
  {
    name: "Vietnamese",
    value: "VN",
  },
  {
    name: "English",
    value: "EN",
  },
  {
    name: "Chinese",
    value: "CN",
  },
];

const MENU_SIDEBAR = [
  {
    name: "Dashboard",
    sidebarItem: [
      {
        text: "Purchased goods & Service",
        path: "/dashboard/purchased-goods-service",
        icon: <img src={PurchasedGoodsService} className="size-6" />,
      },
      {
        text: "Upstream transportation & distribution",
        path: "/dashboard/upstream-transportation-and-distribution",
        icon: (
          <img src={UpstreamTransportationAndDistribution} className="size-6" />
        ),
      },
      {
        text: "Waste generated in operations",
        path: "/dashboard/waste-generated-in-operations",
        icon: <img src={WasteGeneratedInOperations} className="size-6" />,
      },
      {
        text: "Business travel",
        path: "/dashboard/business-travel",
        icon: <img src={BusinessTravel} className="size-6" />,
      },
      {
        text: "Employee commuting",
        path: "/dashboard/employee-commuting",
        icon: <img src={EmployeeCommuting} className="size-6" />,
      },
      {
        text: "Downstream transportation & distribution",
        path: "/dashboard/downstream-transportation-and-distribution",
        icon: (
          <img
            src={DownstreamTransportationAndDistribution}
            className="size-6"
          />
        ),
      },
      {
        text: "End‑of‑life treatment of sold products",
        path: "/dashboard/end‑of‑life-treatment-of-sold-products",
        icon: <img src={EndOfLifeTreatmentOfSoldProducts} className="size-6" />,
      },
    ],
  },
  {
    name: "System Settings",
    sidebarItem: [
      {
        text: "User Management",
        path: "/dashboard/user-management",
        icon: <img src={UserSettings} className="size-6" />,
      },
      {
        text: "File Management",
        path: "/dashboard/file-management",
        icon: <img src={Excel} className="size-6" />,
      },
    ],
  },
];

export { LANGUAGES, MENU_SIDEBAR };
