import CategoryOne from '../assets/images/purchased-goods-service.png';
// import CategoryFour from '../assets/images/upstream-transportation-and-distribution.png';
import CategoryFive from '../assets/images/waste-generated-in-operations.png';
import CategorySix from '../assets/images/business-travel.png';
import CategorySeven from '../assets/images/employee-commuting.png';
import CategoryNineAndCategoryTwelve from '../assets/images/Category.png';
// import EndOfLifeTreatmentOfSoldProducts from "../assets/images/end-of-life-treatment-of-sold-products.png";

import InfoFactoryManagement from '../assets/images/info-factory-management.png';
import UserSettings from '../assets/images/user-settings.png';
import Excel from '../assets/images/excel.png';

const LANGUAGES = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Vietnamese',
    value: 'vn',
  },
  {
    name: 'Chinese',
    value: 'tw',
  },
  {
    name: 'Burmese',
    value: 'mm',
  },
  {
    name: 'Indonesian',
    value: 'id',
  },
];

const MENU_SIDEBAR = [
  {
    name: 'main.dashboard',
    sidebarItem: [
      {
        // text: "Purchased goods & Service",
        text: 'cat1andcat4.cat_1_4',
        // path: "/dashboard/purchased-goods-service",
        path: '/dashboard/category-one-and-category-four',
        icon: <img src={CategoryOne} className="size-6" />,
      },
      // {
      //   // text: "Upstream transportation & distribution",
      //   text: 'Cat4',
      //   // path: "/dashboard/upstream-transportation-and-distribution",
      //   path: '/dashboard/category-four',
      //   icon: <img src={CategoryFour} className="size-6" />,
      // },
      {
        // text: "Waste generated in operations",
        text: 'cat5.cat_5',
        // path: "/dashboard/waste-generated-in-operations",
        path: '/dashboard/category-five',
        icon: <img src={CategoryFive} className="size-6" />,
      },
      {
        // text: "Business travel",
        text: 'cat6.cat_6',
        // path: "/dashboard/business-travel",
        path: '/dashboard/category-six',
        icon: <img src={CategorySix} className="size-6" />,
      },
      {
        // text: "Employee commuting",
        text: 'cat7.cat_7',
        // path: "/dashboard/employee-commuting",
        path: '/dashboard/category-seven',
        icon: <img src={CategorySeven} className="size-6" />,
      },
      {
        // text: "Downstream transportation & distribution",
        text: 'cat9andcat12.cat_9_12',
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
    name: 'main.system_settings',
    sidebarItem: [
      {
        text: 'Info Factory',
        path: '/dashboard/info-factory-management',
        icon: <img src={InfoFactoryManagement} className="size-6" />,
      },
      {
        text: 'usermmt.user_management',
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

const FACTORIES: { name: string; value: string }[] = [
  { name: '樂億 - LYV', value: 'LYV' },
  { name: '樂億II - LHG', value: 'LHG' },
  { name: '億春B - LVL', value: 'LVL' },
  { name: '昌億 - LYM', value: 'LYM' },
  { name: '億福 - LYF', value: 'LYF' },
  { name: 'Jiazhi-1', value: 'JAZ' },
  { name: 'Jiazhi-2', value: 'JZS' },
];

const BREADCRUMB: string = 'main.carbon_management_website';

export { LANGUAGES, MENU_SIDEBAR, FACTORIES, BREADCRUMB };
