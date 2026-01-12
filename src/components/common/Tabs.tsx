import { useState, type ReactNode } from 'react';

interface Tabs {
  label: string;
  content: ReactNode;
}

type Props = {
  tabs: Tabs[];
  defaultIndex?: number;
  className?: string;
};

const Tabs = ({ className, tabs, defaultIndex = 0 }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);

  return (
    <div className={`w-full ${className}`}>
      <div className='flex border-b border-gray-200 overflow-x-auto scrollbar-hide'>
        {tabs.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeIndex === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="p-4">{tabs[activeIndex]?.content}</div>
    </div>
  );
};

export default Tabs;