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

  if (loading) return <Loading />;

  return (
    <div className="relative min-h-screen">

      {/* ── Background layer ── */}
      <div className="fixed inset-0 -z-10">
        {/* Ảnh nền */}
        <img
          src="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        {/* Dark overlay giữ contrast cho glass */}
        <div className="absolute inset-0 bg-[#020d0a]/70" />
        {/* Gradient vignette — làm sâu các góc */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,13,10,0.6)_100%)]" />
      </div>

      {/* ── Orbs ambient — chuyển động nhẹ ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-[drift_18s_ease-in-out_infinite] rounded-full bg-emerald-900/40 blur-[100px]" />
        <div className="absolute -bottom-32 right-0 h-[500px] w-[500px] animate-[drift_14s_ease-in-out_infinite_-6s] rounded-full bg-teal-900/35 blur-[100px]" />
        <div className="absolute left-1/3 top-1/2 h-[350px] w-[350px] animate-[drift_20s_ease-in-out_infinite_-11s] rounded-full bg-emerald-800/25 blur-[80px]" />
      </div>

      {/* ── App shell ── */}
      <Header />

      <div className="flex h-screen">
        <Sidebar
          isOpenSideBar={isOpenSideBar}
          setIsOpenSideBar={setIsOpenSideBar}
        />

        {/*
          pl sync với sidebar width (300px / 78px).
          Dùng cùng easing với sidebar để margin chạy khớp.
        */}
        <main
          style={{ transition: 'padding-left 320ms cubic-bezier(0.4,0,0.2,1)' }}
          className={`flex-1 overflow-y-auto overflow-x-hidden
            pr-5 pt-[85px] pb-8
            ${isOpenSideBar ? 'pl-[78px]' : 'pl-[300px]'}`}
        >
          <Outlet />
        </main>
      </div>

      {/* Keyframes cho orbs — inject qua style tag */}
      <style>{`
        @keyframes drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-40px) scale(1.05); }
          66%      { transform: translate(-20px,25px) scale(0.97); }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;