import {
  ShoppingCart,
  Trash2,
  Plane,
  Bike,
  Truck,
  Building2,
  Users,
  FileSpreadsheet,
  BadgeCheck,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { HR_MODULE_PATH, SYSTEM_DECENTRALIZATION_PATH } from './permissions';

export type MenuItem = {
  /** i18n key */
  text: string;
  path: string;
  icon: LucideIcon;
};

export type MenuGroup = {
  /** i18n key */
  name: string;
  sidebarItem: MenuItem[];
};

/** Sidebar navigation; also the list of modules in System Decentralization. */
export const MENU_SIDEBAR: MenuGroup[] = [
  {
    name: 'main.dashboard',
    sidebarItem: [
      {
        text: 'cat1andcat4.cat_1_4',
        path: '/dashboard/category-one-and-category-four',
        icon: ShoppingCart,
      },
      { text: 'cat5.cat_5', path: '/dashboard/category-five', icon: Trash2 },
      { text: 'cat6.cat_6', path: '/dashboard/category-six', icon: Plane },
      { text: 'cat7.cat_7', path: '/dashboard/category-seven', icon: Bike },
      {
        text: 'cat9andcat12.cat_9_12',
        path: '/dashboard/category-nine-and-category-twelve',
        icon: Truck,
      },
    ],
  },
  {
    name: 'main.system_settings',
    sidebarItem: [
      {
        text: 'facinfo.facinfo',
        path: '/dashboard/info-factory-management',
        icon: Building2,
      },
      {
        text: 'usermmt.user_management',
        path: '/dashboard/user-management',
        icon: Users,
      },
      {
        text: 'filemmt.file_management',
        path: '/dashboard/file-management',
        icon: FileSpreadsheet,
      },
      {
        text: 'dataHRCollecMod.dataCollection_HR_Module',
        path: HR_MODULE_PATH,
        icon: BadgeCheck,
      },
      {
        text: 'system_decentral.system_decentralization',
        path: SYSTEM_DECENTRALIZATION_PATH,
        icon: ShieldCheck,
      },
    ],
  },
];
