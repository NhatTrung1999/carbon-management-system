import { useState } from 'react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Cat9AndCat12 from './Cat9AndCat12';
import PortCode from './PortCode';
import Logging from '../CategoryNineAndCategoryTwelve/Logging';
import { BREADCRUMB } from '../../../utils/constanst';
import { useTranslation } from 'react-i18next';

type Tab = { label: string; render: () => React.ReactNode };
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

const CategoryNineAndCategoryTwelvePage = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(0);

  const tabs: Tab[] = [
    {
      label: t('cat9andcat12.cat_9_12'),
      render: () => <Cat9AndCat12 />,
    },
    {
      label: t('cat9andcat12.port_code'),
      render: () => <PortCode />,
    },
    {
      label: 'Logging',
      render: () => <Logging />,
    },
  ];

  return (
    // <Fragment>
    //   <div className="px-3 sm:px-4 md:px-6">
    //     <Breadcrumb
    //       items={BreadcrumbData(t(BREADCRUMB), t('cat9andcat12.cat_9_12'))}
    //     />

    //     <div className="mb-4 sm:mb-6">
    //       <Typography
    //         name={t('cat9andcat12.cat_9_12')}
    //         className="block text-xs sm:text-sm font-semibold text-[#081c1b] mb-1 sm:mb-2"
    //       />
    //       <Typography
    //         name={t('cat9andcat12.downstream_and_endoflife')}
    //         className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
    //       />
    //     </div>

    //     <Card>
    //       <div className="overflow-hidden">
    //         <Tabs
    //           tabs={[
    //             {
    //               label: t('cat9andcat12.cat_9_12'),
    //               content: <Cat9AndCat12 />,
    //             },
    //             {
    //               label: t('cat9andcat12.port_code'),
    //               content: <PortCode />,
    //             },
    //             {
    //               label: 'Logging',
    //               content: <Logging />,
    //             },
    //           ]}
    //         />
    //       </div>
    //     </Card>
    //   </div>
    // </Fragment>
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0 gap-4 px-2 sm:px-4">
      {/* ── Page header ── */}
      <div className="flex shrink-0 flex-col gap-1">
        {/* Breadcrumb */}
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), t('cat9andcat12.cat_9_12'))}
        />

        {/* Title block */}
        <div className="mt-1 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-400/70">
              {t('cat9andcat12.cat_9_12')}
            </p>
            <h1 className="text-2xl font-bold leading-tight text-white/90 sm:text-3xl">
              {t('cat9andcat12.downstream_and_endoflife')}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Glass panel ── */}
      <div
        className="relative flex min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1 rounded-2xl border border-white/[0.10]
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
                className={`group relative shrink-0 px-4 pb-3 pt-1 text-sm font-medium
                  transition-colors duration-200 focus:outline-none
                  whitespace-nowrap
                  ${activeTab === i
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'}`}
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
        <div className="flex min-w-0 flex-col p-4 sm:p-5 xl:min-h-0 xl:flex-1">
          <div
            key={activeTab}
            style={{ transition: `opacity 250ms ${EASE}` }}
            className="flex min-w-0 flex-col opacity-100 xl:min-h-0 xl:flex-1"
          >
            {tabs[activeTab].render()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNineAndCategoryTwelvePage;
