import type { AuthUser } from '../types/login';

// Which dashboard pages a user may open. Shared by the router and the sidebar.

export const SYSTEM_DECENTRALIZATION_PATH =
  '/dashboard/system-decentralization';
export const HR_MODULE_PATH = '/dashboard/data-collection-hr-module';

const ADMIN_ONLY_PATHS = new Set([
  '/dashboard/user-management',
  '/dashboard/info-factory-management',
  SYSTEM_DECENTRALIZATION_PATH,
]);

const normalize = (value?: string) => value?.toLowerCase().trim();

export const isAdmin = (user: AuthUser | null) =>
  normalize(user?.Role) === 'admin';

export const canAccessPath = (path: string, user: AuthUser | null) => {
  const admin = isAdmin(user);
  const department = normalize(user?.Department);

  // Per-user module permissions, when configured, override the defaults.
  // Admins can always reach the permission screen so they cannot lock themselves out.
  if (user?.permissionsConfigured) {
    return (
      Boolean(user.modulePermissions?.includes(path)) ||
      (admin && path === SYSTEM_DECENTRALIZATION_PATH)
    );
  }

  if (department === 'hr') return path === HR_MODULE_PATH;
  if (ADMIN_ONLY_PATHS.has(path)) return admin;
  if (path === HR_MODULE_PATH) return department === 'esg' || admin;
  return true;
};

/** First page to show after login. */
export const getDefaultDashboardPath = (user: AuthUser | null) => {
  if (user?.permissionsConfigured) {
    return (
      user.modulePermissions?.[0] ||
      (isAdmin(user) ? SYSTEM_DECENTRALIZATION_PATH : '/')
    );
  }
  return normalize(user?.Department) === 'hr'
    ? HR_MODULE_PATH
    : '/dashboard/category-one-and-category-four';
};
