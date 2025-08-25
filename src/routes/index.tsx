import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
