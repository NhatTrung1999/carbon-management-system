import { useState, type ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TabItem {
  label   : string;
  content : ReactNode;
}

type Props = {
  tabs          : TabItem[];
  defaultIndex ?: number;
  className    ?: string;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

// ─── Component ───────────────────────────────────────────────────────────────

const Tabs = ({ tabs, defaultIndex = 0, className }: Props) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={`w-full ${className ?? ''}`}>

      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-white/[0.08]
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 whitespace-nowrap px-4 pb-3 pt-2
                text-sm font-medium outline-none transition-colors duration-200
                ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              {tab.label}

              {/* Active underline */}
              <span
                style={{ transition: `opacity 220ms ${EASE}, transform 220ms ${EASE}` }}
                className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-emerald-400
                  ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
              />
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-4 sm:p-5">
        {tabs[activeIndex]?.content}
      </div>

    </div>
  );
};

export default Tabs;