import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../app/hooks';
import type { RootState } from '../app/store';

const ProtectedRoute = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
