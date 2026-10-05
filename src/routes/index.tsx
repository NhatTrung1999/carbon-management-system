import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import { useAppSelector } from '../app/hooks';
import {
  canAccessPath,
  getDefaultDashboardPath,
  HR_MODULE_PATH,
  SYSTEM_DECENTRALIZATION_PATH,
} from '../utils/permissions';

// Pages are loaded on demand, so each one ships as its own JS chunk.
const PAGES = {
  login: () => import('../pages/Login'),
  home: () => import('../pages/Home'),
  notFound: () => import('../pages/NotFound'),
  cat1And4: () => import('../pages/Category/CategoryOneAndCategoryFour'),
  cat5: () => import('../pages/Category/CategoryFive'),
  cat6: () => import('../pages/Category/CategorySix'),
  cat7: () => import('../pages/Category/CategorySeven'),
  cat9And12: () => import('../pages/Category/CategoryNineAndCategoryTwelve'),
  infoFactory: () => import('../pages/SystemSettings/InfoFactoryManagement'),
  users: () => import('../pages/SystemSettings/UserManagement'),
  files: () => import('../pages/SystemSettings/FileManagement'),
  hr: () => import('../pages/SystemSettings/HRModule'),
  decentralization: () =>
    import('../pages/SystemSettings/SystemDecentralization'),
};

const Login = lazy(PAGES.login);
const Home = lazy(PAGES.home);
const NotFound = lazy(PAGES.notFound);
const CategoryOneAndCategoryFour = lazy(PAGES.cat1And4);
const CategoryFive = lazy(PAGES.cat5);
const CategorySix = lazy(PAGES.cat6);
const CategorySeven = lazy(PAGES.cat7);
const CategoryNineAndCategoryTwelvePage = lazy(PAGES.cat9And12);
const InfoFactoryManagement = lazy(PAGES.infoFactory);
const UserManagement = lazy(PAGES.users);
const FileManagement = lazy(PAGES.files);
const HRModule = lazy(PAGES.hr);
const SystemDecentralization = lazy(PAGES.decentralization);

/** Downloads every page chunk in the background, so later navigation is instant. */
const prefetchPages = () =>
  Object.values(PAGES).forEach((load) => load().catch(() => {}));

/** Dashboard pages; each one is guarded by canAccessPath. */
const DASHBOARD_ROUTES: { path: string; element: ReactNode }[] = [
  {
    path: '/dashboard/category-one-and-category-four',
    element: <CategoryOneAndCategoryFour />,
  },
  { path: '/dashboard/category-five', element: <CategoryFive /> },
  { path: '/dashboard/category-six', element: <CategorySix /> },
  { path: '/dashboard/category-seven', element: <CategorySeven /> },
  {
    path: '/dashboard/category-nine-and-category-twelve',
    element: <CategoryNineAndCategoryTwelvePage />,
  },
  {
    path: '/dashboard/info-factory-management',
    element: <InfoFactoryManagement />,
  },
  { path: '/dashboard/user-management', element: <UserManagement /> },
  { path: '/dashboard/file-management', element: <FileManagement /> },
  { path: HR_MODULE_PATH, element: <HRModule /> },
  { path: SYSTEM_DECENTRALIZATION_PATH, element: <SystemDecentralization /> },
];

const AppRoutes = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  // Once signed in, fetch the remaining pages while the browser is idle.
  useEffect(() => {
    if (!token) return;
    const id = setTimeout(prefetchPages, 1500);
    return () => clearTimeout(id);
  }, [token]);

  return (
    // Dark backdrop while a page chunk loads, so there is no white flash.
    <Suspense fallback={<div className="min-h-screen bg-[#07110c]" />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route index path="/" element={<Home />} />
          <Route path="/dashboard" element={<MainLayout />}>
            <Route
              index
              element={<Navigate to={getDefaultDashboardPath(user)} replace />}
            />
            {DASHBOARD_ROUTES.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={canAccessPath(path, user) ? element : <NotFound />}
              />
            ))}
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
