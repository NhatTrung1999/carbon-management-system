import CategoryOne from '../assets/images/purchased-goods-service.png';
import CategoryFour from '../assets/images/upstream-transportation-and-distribution.png';
import CategoryFive from '../assets/images/waste-generated-in-operations.png';
import CategorySix from '../assets/images/business-travel.png';
import CategorySeven from '../assets/images/employee-commuting.png';
import CategoryNineAndCategoryTwelve from '../assets/images/Category.png';
// import EndOfLifeTreatmentOfSoldProducts from "../assets/images/end-of-life-treatment-of-sold-products.png";

import UserSettings from '../assets/images/user-settings.png';
import Excel from '../assets/images/excel.png';

const LANGUAGES = [
  {
    name: 'Vietnamese',
    value: 'VN',
  },
  {
    name: 'English',
    value: 'EN',
  },
  {
    name: 'Chinese',
    value: 'CN',
  },
];

const MENU_SIDEBAR = [
  {
    name: 'Dashboard',
    sidebarItem: [
      {
        // text: "Purchased goods & Service",
        text: 'Category One',
        // path: "/dashboard/purchased-goods-service",
        path: '/dashboard/category-one',
        icon: <img src={CategoryOne} className="size-6" />,
      },
      {
        // text: "Upstream transportation & distribution",
        text: 'Category Four',
        // path: "/dashboard/upstream-transportation-and-distribution",
        path: '/dashboard/category-four',
        icon: <img src={CategoryFour} className="size-6" />,
      },
      {
        // text: "Waste generated in operations",
        text: 'Category Five',
        // path: "/dashboard/waste-generated-in-operations",
        path: '/dashboard/category-five',
        icon: <img src={CategoryFive} className="size-6" />,
      },
      {
        // text: "Business travel",
        text: 'Category Six',
        // path: "/dashboard/business-travel",
        path: '/dashboard/category-six',
        icon: <img src={CategorySix} className="size-6" />,
      },
      {
        // text: "Employee commuting",
        text: 'Category Seven',
        // path: "/dashboard/employee-commuting",
        path: '/dashboard/category-seven',
        icon: <img src={CategorySeven} className="size-6" />,
      },
      {
        // text: "Downstream transportation & distribution",
        text: 'Category Nine & Category Twelve',
        // path: "/dashboard/downstream-transportation-and-distribution",
        path: '/dashboard/category-nine-and-category-twelve',
        icon: <img src={CategoryNineAndCategoryTwelve} className="size-6" />,
      },
      // {
      //   // text: "End‑of‑life treatment of sold products",
      //   text: "Category 12",
      //   path: "/dashboard/end‑of‑life-treatment-of-sold-products",
      //   icon: <img src={EndOfLifeTreatmentOfSoldProducts} className="size-6" />,
      // },
    ],
  },
  {
    name: 'System Settings',
    sidebarItem: [
      {
        text: 'User Management',
        path: '/dashboard/user-management',
        icon: <img src={UserSettings} className="size-6" />,
      },
      {
        text: 'File Management',
        path: '/dashboard/file-management',
        icon: <img src={Excel} className="size-6" />,
      },
    ],
  },
];

export { LANGUAGES, MENU_SIDEBAR };
