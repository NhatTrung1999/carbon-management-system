import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../app/hooks';

const AuthLayout = () => {
  const token = useAppSelector((state) => state.auth.token);

  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthLayout;
