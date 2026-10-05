import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../app/hooks';

const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.auth.token);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
