import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../common/Breadcrumb';
import { BreadcrumbData } from '../../types/breadcrumb';
import { BREADCRUMB, EASE } from '../../utils/constants';

export type CategoryTab = { label: string; render: () => ReactNode };

type Props = {
  /** Short category name, shown in the breadcrumb and above the title (already translated). */
  category: string;
  /** Page title (already translated). */
  title: string;
  tabs: CategoryTab[];
};

/** Shared shell for category pages: breadcrumb, title and a tabbed glass panel. */
const CategoryPageLayout = ({ category, title, tabs }: Props) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0 gap-4 px-2 sm:px-4">
      {/* ── Page header ── */}
      <div className="flex shrink-0 flex-col gap-1">
        <Breadcrumb items={BreadcrumbData(t(BREADCRUMB), category)} />

        <div className="mt-1 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-400/70">
              {category}
            </p>
            <h1 className="text-2xl font-bold leading-tight text-white/90 sm:text-3xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Glass panel ── */}
      <div className="relative flex min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1 glass-panel">
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
                  ${
                    activeTab === i
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                style={{
                  color: activeTab === i ? '#fff' : undefined,
                }}
              >
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

export default CategoryPageLayout;
