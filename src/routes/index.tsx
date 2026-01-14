import { Navigate, Route, Routes } from 'react-router';
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
import { useAppSelector } from '../app/hooks';

const AppRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
  const department = user?.Department?.toLowerCase().trim();
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
                  department === 'hr'
                    ? '/dashboard/data-collection-hr-module'
                    : '/dashboard/category-one-and-category-four'
                }
                replace
              />
            }
          />
          <Route
            path="/dashboard/category-one-and-category-four"
            element={<CategoryOneAndCategoryFour />}
          />
          {/* <Route path="/dashboard/category-four" element={<CategoryFour />} /> */}
          <Route path="/dashboard/category-five" element={<CategoryFive />} />
          <Route path="/dashboard/category-six" element={<CategorySix />} />
          <Route path="/dashboard/category-seven" element={<CategorySeven />} />
          <Route
            path="/dashboard/category-nine-and-category-twelve"
            element={<CategoryNineAndCategoryTwelvePage />}
          />
          <Route
            path="/dashboard/info-factory-management"
            element={<InfoFactoryManagement />}
          />
          <Route
            path="/dashboard/user-management"
            element={<UserManagement />}
          />
          <Route
            path="/dashboard/file-management"
            element={<FileManagement />}
          />
          <Route
            path="/dashboard/data-collection-hr-module"
            element={<HRModule />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
