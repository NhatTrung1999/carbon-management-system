// App-wide constants (no JSX, so this module stays Fast Refresh friendly).

export const LANGUAGES = [
  { name: 'English', value: 'en' },
  { name: 'Vietnamese', value: 'vn' },
  { name: 'Chinese', value: 'tw' },
  { name: 'Burmese', value: 'mm' },
  { name: 'Indonesian', value: 'id' },
];

export const FACTORIES: { name: string; value: string }[] = [
  { name: '樂億 - LYV', value: 'LYV' },
  { name: '樂億II - LHG', value: 'LHG' },
  { name: '億春B - LVL', value: 'LVL' },
  { name: '昌億 - LYM', value: 'LYM' },
  { name: '億福 - LYF', value: 'LYF' },
  { name: 'Jiazhi-1', value: 'JAZ' },
  { name: 'Jiazhi-2', value: 'JZS' },
];

export const DEFAULT_FACTORY = FACTORIES[0].value;

/** i18n key of the first breadcrumb item on every page. */
export const BREADCRUMB = 'main.carbon_management_website';

/** Material "standard" easing used by sidebar, tabs and dropdown transitions. */
export const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
