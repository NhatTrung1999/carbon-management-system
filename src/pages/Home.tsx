import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';

import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const onDashboardPage = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/192136/pexels-photo-192136.jpeg')] bg-center bg-cover box-sizing p-5">
      <Header />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-full lg:w-1/2">
        <div className="text-white  box-sizing p-10 pb-24 bg-gray/50 backdrop-blur-xl flex flex-col justify-between">
          <div className="text-[2vw] font-extrabold">
            CARBON MANAGEMENT WEBSITE
          </div>
          <div className="mt-3 tracking-wider">
            An internal, centralized platform that automatically aggregates
            emissions inventory data from LY App, BPM, WMS, and ERP—enabling
            seamless integration with our external Carbon Management System
            (CMS).
          </div>
        </div>
        <button
          type="button"
          className="block m-auto mt-10 text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer"
          onClick={() => onDashboardPage()}
        >
          Go to Dashboard (Scope 3)
        </button>
      </div>
    </div>
  );
};

export default Home;
