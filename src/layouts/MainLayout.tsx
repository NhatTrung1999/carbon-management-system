import { Outlet } from 'react-router';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-[320px] pt-[70px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
