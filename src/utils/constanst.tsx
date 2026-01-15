import CategoryOne from '../assets/images/purchased-goods-service.png';
import CategoryOneActive from '../assets/images/purchased-goods-service-Active.png'
// import CategoryFour from '../assets/images/upstream-transportation-and-distribution.png';
import CategoryFive from '../assets/images/waste-generated-in-operations.png';
import CategoryFiveActive from '../assets/images/waste-generated-in-operations-Active.png';
import CategorySix from '../assets/images/business-travel.png';
import CategorySixActive from '../assets/images/business-travel-Active.png';
import CategorySeven from '../assets/images/employee-commuting.png';
import CategorySevenActive from '../assets/images/employee-commuting-Active.png';
import CategoryNineAndCategoryTwelve from '../assets/images/Category.png';
import CategoryNineAndCategoryTwelveActive from '../assets/images/Category-Active.png';
// import EndOfLifeTreatmentOfSoldProducts from "../assets/images/end-of-life-treatment-of-sold-products.png";

import InfoFactoryManagement from '../assets/images/info-factory-management.png';
import InfoFactoryManagementActive from '../assets/images/info-factory-management-Active.png';
import UserSettings from '../assets/images/user-settings.png';
import UserSettingsActive from '../assets/images/user-settings-Active.png';
import Excel from '../assets/images/excel.png';
import ExcelActive from '../assets/images/excel-Active.png';
import DataCollectionHRModule from '../assets/images/data-collection-hr-module.png';
import DataCollectionHRModuleActive from '../assets/images/data-collection-hr-module-Active.png';
import SystemDecentralization from '../assets/images/system-decentralization.png';
import SystemDecentralizationActive from '../assets/images/system-decentralization-Active.png';

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
        activeIcon: <img src={CategoryOneActive} className="size-6 text-primary" />,
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
        activeIcon: <img src={CategoryFiveActive} className="size-6 text-primary" />,
      },
      {
        // text: "Business travel",
        text: 'cat6.cat_6',
        // path: "/dashboard/business-travel",
        path: '/dashboard/category-six',
        icon: <img src={CategorySix} className="size-6" />,
        activeIcon: <img src={CategorySixActive} className="size-6 text-primary" />,
      },
      {
        // text: "Employee commuting",
        text: 'cat7.cat_7',
        // path: "/dashboard/employee-commuting",
        path: '/dashboard/category-seven',
        icon: <img src={CategorySeven} className="size-6" />,
        activeIcon: <img src={CategorySevenActive} className="size-6 text-primary" />,
      },
      {
        // text: "Downstream transportation & distribution",
        text: 'cat9andcat12.cat_9_12',
        // path: "/dashboard/downstream-transportation-and-distribution",
        path: '/dashboard/category-nine-and-category-twelve',
        icon: <img src={CategoryNineAndCategoryTwelve} className="size-6" />,
        activeIcon: <img src={CategoryNineAndCategoryTwelveActive} className="size-6 text-primary" />,
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
        text: 'facinfo.facinfo',
        path: '/dashboard/info-factory-management',
        icon: <img src={InfoFactoryManagement} className="size-6" />,
        activeIcon: <img src={InfoFactoryManagementActive} className="size-6 text-primary" />,
      },
      {
        text: 'usermmt.user_management',
        path: '/dashboard/user-management',
        icon: <img src={UserSettings} className="size-6" />,
        activeIcon: <img src={UserSettingsActive} className="size-6 text-primary" />,
      },
      {
        text: 'filemmt.file_management',
        path: '/dashboard/file-management',
        icon: <img src={Excel} className="size-6" />,
        activeIcon: <img src={ExcelActive} className='size-6 text-primary' />,
      },
      {
        text: 'dataHRCollecMod.dataCollection_HR_Module',
        path: '/dashboard/data-collection-hr-module',
        icon: <img src={DataCollectionHRModule} className="size-6" />,
        activeIcon: <img src={DataCollectionHRModuleActive} className='size-6 text-primary' />,
      },
      {
        text: 'system_decentral.system_decentralization',
        path: '/dashboard/system-decentralization',
        icon: <img src={SystemDecentralization} className="size-6" />,
        activeIcon: <img src={SystemDecentralizationActive} className='size-6 text-primary' />,
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
