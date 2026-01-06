import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';

import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation()

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
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/192136/pexels-photo-192136.jpeg')] bg-center bg-cover p-4 sm:p-5 md:p-6">
      <Header />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[95%] sm:w-[85%] md:w-[75%] lg:w-1/2 px-4">
        <div className="text-white box-border p-6 sm:p-8 md:p-10 pb-16 sm:pb-20 md:pb-24 bg-gray/50 backdrop-blur-xl flex flex-col justify-between rounded-lg">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-[2vw] font-extrabold uppercase leading-tight">
            {t('main.carbon_management_website')}
          </div>
          <div className="mt-3 sm:mt-4 tracking-wide sm:tracking-wider text-sm sm:text-base md:text-lg leading-relaxed">
            An internal, centralized platform that automatically aggregates
            emissions inventory data from LY App, BPM, WMS, and ERP—enabling
            seamless integration with our external Carbon Management System
            (CMS).
          </div>
        </div>
        <button
          type="button"
          className="block m-auto mt-6 sm:mt-8 md:mt-10 text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer transition-all duration-300 w-full sm:w-auto"
          onClick={() => onDashboardPage()}
        >
          {t('main.go_to_dashboard')}
        </button>
      </div>
    </div>
  );
};

export default Home;