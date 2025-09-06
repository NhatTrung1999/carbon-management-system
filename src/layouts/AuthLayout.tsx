import { Navigate, Outlet } from 'react-router';

const AuthLayout = () => {
  const token = sessionStorage.getItem('token');

  if (token) {
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
