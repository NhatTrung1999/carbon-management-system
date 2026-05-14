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
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

const ICON_BASE   = 'h-5 w-5 transition-colors duration-200';
const ICON_DEFAULT = `${ICON_BASE} text-white/50`;
const ICON_ACTIVE  = `${ICON_BASE} text-emerald-300`;

// ─── Constants ───────────────────────────────────────────────────────────────

const LANGUAGES = [
  { name: 'English',    value: 'en' },
  { name: 'Vietnamese', value: 'vn' },
  { name: 'Chinese',    value: 'tw' },
  { name: 'Burmese',    value: 'mm' },
  { name: 'Indonesian', value: 'id' },
];

const MENU_SIDEBAR = [
  {
    name: 'main.dashboard',
    sidebarItem: [
      {
        text      : 'cat1andcat4.cat_1_4',
        path      : '/dashboard/category-one-and-category-four',
        icon      : <ShoppingCart className={ICON_DEFAULT} />,
        activeIcon: <ShoppingCart className={ICON_ACTIVE}  />,
      },
      {
        text      : 'cat5.cat_5',
        path      : '/dashboard/category-five',
        icon      : <Trash2 className={ICON_DEFAULT} />,
        activeIcon: <Trash2 className={ICON_ACTIVE}  />,
      },
      {
        text      : 'cat6.cat_6',
        path      : '/dashboard/category-six',
        icon      : <Plane className={ICON_DEFAULT} />,
        activeIcon: <Plane className={ICON_ACTIVE}  />,
      },
      {
        text      : 'cat7.cat_7',
        path      : '/dashboard/category-seven',
        icon      : <Bike className={ICON_DEFAULT} />,
        activeIcon: <Bike className={ICON_ACTIVE}  />,
      },
      {
        text      : 'cat9andcat12.cat_9_12',
        path      : '/dashboard/category-nine-and-category-twelve',
        icon      : <Truck className={ICON_DEFAULT} />,
        activeIcon: <Truck className={ICON_ACTIVE}  />,
      },
    ],
  },
  {
    name: 'main.system_settings',
    sidebarItem: [
      {
        text      : 'facinfo.facinfo',
        path      : '/dashboard/info-factory-management',
        icon      : <Building2 className={ICON_DEFAULT} />,
        activeIcon: <Building2 className={ICON_ACTIVE}  />,
      },
      {
        text      : 'usermmt.user_management',
        path      : '/dashboard/user-management',
        icon      : <Users className={ICON_DEFAULT} />,
        activeIcon: <Users className={ICON_ACTIVE}  />,
      },
      {
        text      : 'filemmt.file_management',
        path      : '/dashboard/file-management',
        icon      : <FileSpreadsheet className={ICON_DEFAULT} />,
        activeIcon: <FileSpreadsheet className={ICON_ACTIVE}  />,
      },
      {
        text      : 'dataHRCollecMod.dataCollection_HR_Module',
        path      : '/dashboard/data-collection-hr-module',
        icon      : <BadgeCheck className={ICON_DEFAULT} />,
        activeIcon: <BadgeCheck className={ICON_ACTIVE}  />,
      },
      {
        text      : 'system_decentral.system_decentralization',
        path      : '/dashboard/system-decentralization',
        icon      : <ShieldCheck className={ICON_DEFAULT} />,
        activeIcon: <ShieldCheck className={ICON_ACTIVE}  />,
      },
    ],
  },
];

const FACTORIES: { name: string; value: string }[] = [
  { name: '樂億 - LYV',  value: 'LYV' },
  { name: '樂億II - LHG', value: 'LHG' },
  { name: '億春B - LVL',  value: 'LVL' },
  { name: '昌億 - LYM',  value: 'LYM' },
  { name: '億福 - LYF',  value: 'LYF' },
  { name: 'Jiazhi-1',   value: 'JAZ' },
  { name: 'Jiazhi-2',   value: 'JZS' },
];

const BREADCRUMB: string = 'main.carbon_management_website';

export { LANGUAGES, MENU_SIDEBAR, FACTORIES, BREADCRUMB };