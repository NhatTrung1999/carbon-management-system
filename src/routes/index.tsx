import { Navigate, Route, Routes } from 'react-router';
import type React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

import Login from '../pages/Login';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
// import CategoryOne from '../pages/Category/CategoryOne';
// import CategoryFour from '../pages/Category/CategoryFour';
import CategoryFive from '../pages/Category/CategoryFive';
import CategorySix from '../pages/Category/CategorySix';
import CategorySeven from '../pages/Category/CategorySeven';
import CategoryNineAndCategoryTwelvePage from '../pages/Category/CategoryNineAndCategoryTwelve';
import UserManagement from '../pages/SystemSettings/UserManagement';
import FileManagement from '../pages/SystemSettings/FileManagement';
import ProtectedRoute from './ProtectedRoute';
import CategoryOneAndCategoryFour from '../pages/Category/CategoryOneAndCategoryFour';
import InfoFactoryManagement from '../pages/SystemSettings/InfoFactoryManagement';
import HRModule from '../pages/SystemSettings/HRModule';
import SystemDecentralization from '../pages/SystemSettings/SystemDecentralization';
import { useAppSelector } from '../app/hooks';

const ADMIN_ONLY_PATHS = new Set([
  '/dashboard/user-management',
  '/dashboard/info-factory-management',
  '/dashboard/system-decentralization',
]);

const HR_ONLY_PATH = '/dashboard/data-collection-hr-module';

const canAccessPath = (path: string, user: any) => {
  const role = user?.Role?.toLowerCase().trim();
  const department = user?.Department?.toLowerCase().trim();

  if (user?.permissionsConfigured) {
    return (
      user?.modulePermissions?.includes(path) ||
      (role === 'admin' && path === '/dashboard/system-decentralization')
    );
  }

  if (department === 'hr') return path === HR_ONLY_PATH;
  if (ADMIN_ONLY_PATHS.has(path)) return role === 'admin';
  if (path === HR_ONLY_PATH) return department === 'esg' || role === 'admin';
  return true;
};

const ModuleAccess = ({
  path,
  user,
  children,
}: {
  path: string;
  user: any;
  children: React.ReactNode;
}) => (canAccessPath(path, user) ? children : <NotFound />);

const AppRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
  const department = user?.Department?.toLowerCase().trim();
  const defaultDashboardPath = user?.permissionsConfigured
    ? user?.modulePermissions?.[0] ||
      (user?.Role?.toLowerCase().trim() === 'admin'
        ? '/dashboard/system-decentralization'
        : '/')
    : department === 'hr'
      ? '/dashboard/data-collection-hr-module'
      : '/dashboard/category-one-and-category-four';

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route index path="/" element={<Home />} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route
            index
            element={
              <Navigate
                to={
                  defaultDashboardPath
                }
                replace
              />
            }
          />
          <Route
            path="/dashboard/category-one-and-category-four"
            element={
              <ModuleAccess
                path="/dashboard/category-one-and-category-four"
                user={user}
              >
                <CategoryOneAndCategoryFour />
              </ModuleAccess>
            }
          />
          {/* <Route path="/dashboard/category-four" element={<CategoryFour />} /> */}
          <Route
            path="/dashboard/category-five"
            element={
              <ModuleAccess path="/dashboard/category-five" user={user}>
                <CategoryFive />
              </ModuleAccess>
            }
          />
          <Route
            path="/dashboard/category-six"
            element={
              <ModuleAccess path="/dashboard/category-six" user={user}>
                <CategorySix />
              </ModuleAccess>
            }
          />
          <Route
            path="/dashboard/category-seven"
            element={
              <ModuleAccess path="/dashboard/category-seven" user={user}>
                <CategorySeven />
              </ModuleAccess>
            }
          />
          <Route
            path="/dashboard/category-nine-and-category-twelve"
            element={
              <ModuleAccess
                path="/dashboard/category-nine-and-category-twelve"
                user={user}
              >
                <CategoryNineAndCategoryTwelvePage />
              </ModuleAccess>
            }
          />
          <Route
            path="/dashboard/info-factory-management"
            element={
              <ModuleAccess
                path="/dashboard/info-factory-management"
                user={user}
              >
                <InfoFactoryManagement />
              </ModuleAccess>
            }
          />
          <Route
            path="/dashboard/user-management"
            element={
              <ModuleAccess path="/dashboard/user-management" user={user}>
                <UserManagement />
              </ModuleAccess>
            }
          />
          <Route
            path="/dashboard/file-management"
            element={
              <ModuleAccess path="/dashboard/file-management" user={user}>
                <FileManagement />
              </ModuleAccess>
            }
          />
          <Route
            path="/dashboard/data-collection-hr-module"
            element={
              <ModuleAccess
                path="/dashboard/data-collection-hr-module"
                user={user}
              >
                <HRModule />
              </ModuleAccess>
            }
          />
          <Route
            path="/dashboard/system-decentralization"
            element={
              <ModuleAccess
                path="/dashboard/system-decentralization"
                user={user}
              >
                <SystemDecentralization />
              </ModuleAccess>
            }
          /> 
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
