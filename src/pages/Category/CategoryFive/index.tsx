// import { Fragment } from 'react/jsx-runtime';
import Breadcrumb from '../../../components/common/Breadcrumb';
// import Typography from '../../../components/common/Typography';
import { BreadcrumbData } from '../../../types/breadcrumb';
// import Card from '../../../components/common/Card';
// import Search from '../../../components/Category/CategoryFive/Search';
// import Table from '../../../components/Category/CategoryFive/Table';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { HEADER } from '../../../types/cat5';
// import { useAppDispatch, useAppSelector } from '../../../app/hooks';
// import { getDataCat5, resetDataCat5 } from '../../../features/categorySlice';
import { BREADCRUMB } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';
// import Tabs from '../../../components/common/Tabs';
import Cat5 from './Cat5';
import Logging from './Logging';
import { useState } from 'react';

type Tab = { label: string; content: React.ReactNode };
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

const CategoryFive = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const tabs: Tab[] = [
    {
      label: 'WG in Operations',
      content: <Cat5 />,
    },
    {
      label: 'Logging',
      content: <Logging />,
    },
  ];

  return (
    // <Fragment>
    //   <div className="px-3 sm:px-4 md:px-6">
    //     <Breadcrumb
    //       items={BreadcrumbData(t(BREADCRUMB), t('cat5.cat_5'))}
    //     />

    //     <div className="mb-4 sm:mb-6">
    //       <Typography
    //         name={t('cat5.cat_5')}
    //         className="block text-xs sm:text-sm font-semibold text-[#081c1b] mb-1 sm:mb-2"
    //       />
    //       <Typography
    //         name={t('cat5.waste_generated_in_operations')}
    //         className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
    //       />
    //     </div>

    //     <Card>
    //       <div className="overflow-hidden">
    //         <Tabs
    //           tabs={[
    // {
    //   label: 'WG in Operations',
    //   content: <Cat5 />,
    // },
    // {
    //   label: 'Logging',
    //   content: <Logging />,
    // }
    //           ]}
    //         />
    //       </div>
    //     </Card>
    //   </div>
    // </Fragment>
    <div className="flex flex-col gap-5 px-2 sm:px-4">
      {/* ── Page header ── */}
      <div className="flex flex-col gap-1">
        {/* Breadcrumb */}
        <Breadcrumb items={BreadcrumbData(t(BREADCRUMB), t('cat5.cat_5'))} />

        {/* Title block */}
        <div className="mt-1 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-400/70">
              {t('cat5.cat_5')}
            </p>
            <h1 className="text-2xl font-bold leading-tight text-white/90 sm:text-3xl">
              {t('cat5.waste_generated_in_operations')}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Glass panel ── */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.10]
        bg-white/[0.05] shadow-[0_8px_40px_rgba(0,0,0,0.30)] backdrop-blur-[32px]"
      >
        {/* Top shimmer line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* ── Tab bar ── */}
        <div className="border-b border-white/[0.08]">
          <div
            className="flex overflow-x-auto px-4 pt-4
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveTab(i)}
                className="group relative shrink-0 px-4 pb-3 pt-1 text-sm font-medium
                  transition-colors duration-200 focus:outline-none
                  whitespace-nowrap
                  ${activeTab === i
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'}"
                style={{
                  color: activeTab === i ? '#fff' : undefined,
                }}
              >
                {/* Label */}
                <span
                  className={
                    activeTab === i
                      ? 'text-white'
                      : 'text-white/40 group-hover:text-white/70'
                  }
                >
                  {tab.label}
                </span>

                {/* Active underline */}
                <span
                  style={{
                    transition: `opacity 220ms ${EASE}, transform 220ms ${EASE}`,
                  }}
                  className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-emerald-400
                    ${
                      activeTab === i
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content ── */}
        <div className="p-4 sm:p-5">
          {tabs.map((tab, i) => (
            <div
              key={i}
              style={{
                transition: `opacity 250ms ${EASE}`,
                display: activeTab === i ? 'block' : 'none',
              }}
              className="opacity-100"
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFive;
