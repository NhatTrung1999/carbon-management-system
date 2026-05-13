import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';

import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa6';
import backgroundHome from '../assets/images/background-home.jpg'

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const onDashboardPage = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07110c]">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {/* IMAGE */}
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-[3px] opacity-[0.65]"
          style={{
            backgroundImage:
              `url(${backgroundHome})`,
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07110c]/20 via-[#0f172a]/15 to-[#07110c]/25" />

        {/* GLOW */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-green-400/10 blur-3xl" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '42px 42px',
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* HEADER */}
        <Header />

        {/* HERO */}
        <div className="flex flex-1 items-center justify-center px-6 py-20">
          <div className="w-full max-w-6xl">
            {/* GLASS CARD */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/[0.16] bg-white/[0.04] p-8 sm:p-12 md:p-16 shadow-[0_10px_80px_rgba(0,0,0,0.35)] backdrop-blur-[40px]">
              {/* REFLECTION */}
              <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/[0.28] via-white/[0.03] to-transparent" />

              {/* BORDER */}
              <div className="pointer-events-none absolute inset-0 rounded-[36px] border border-white/[0.08]" />

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* TITLE */}
                <div>
                  <div className="text-[clamp(42px,8vw,110px)] font-black leading-none tracking-tight text-white drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">
                    Carbon
                  </div>

                  <div className="text-[clamp(32px,6vw,85px)] font-black leading-none tracking-tight text-emerald-300 drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">
                    Management
                  </div>

                  <div className="text-[clamp(20px,3vw,42px)] font-black leading-none tracking-[0.08em] text-white/80">
                    Website
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-10 max-w-3xl">
                  <div className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">
                    {t(
                      'main.carbon_management_website'
                    )}
                  </div>

                  <p className="text-sm leading-8 text-slate-100 sm:text-base md:text-lg md:leading-9">
                    An internal, centralized
                    platform that automatically
                    aggregates emissions inventory
                    data from LY App, BPM, WMS,
                    and ERP — enabling seamless
                    integration with our external
                    Carbon Management System
                    (CMS).
                  </p>
                </div>

                {/* ACTION */}
                <div className="mt-12">
                  <button
                    type="button"
                    onClick={() =>
                      onDashboardPage()
                    }
                    className="group flex items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-500/70 px-7 py-4 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(16,185,129,0.28)] backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-400/80 hover:shadow-[0_10px_40px_rgba(16,185,129,0.40)] active:scale-[0.98]"
                  >
                    {t(
                      'main.go_to_dashboard'
                    )}

                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pb-6 text-center text-xs text-slate-300">
          Carbon Management Website © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Home;