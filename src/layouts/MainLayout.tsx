import { Outlet } from 'react-router';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

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
        <Sidebar
          isOpenSideBar={isOpenSideBar}
          setIsOpenSideBar={setIsOpenSideBar}
        />
        <div
          className={`${
            isOpenSideBar 
              ? 'pl-[70px] md:pl-[120px]' 
              : 'pl-[280px]'
          } flex-1 pr-5 pt-[85px] pb-5 transition-all duration-300 ease-in-out overflow-hidden overflow-y-auto`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
