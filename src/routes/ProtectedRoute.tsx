import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const token = sessionStorage.getItem('token')

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
