import { IoIosArrowForward } from 'react-icons/io';
import type { BreadcrumbProp } from '../../types/breadcrumb';
import { Link } from 'react-router';

type Props = {
  items: BreadcrumbProp[];
};

const Breadcrumb = ({ items }: Props) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5">
      {items?.map((item, index) => {
        const isLast    = index === items.length - 1;
        const isFirst   = index === 0;

        return (
          <span key={item.name || index} className="flex items-center gap-1.5">

            {/* Separator — skip trước item đầu */}
            {!isFirst && (
              <IoIosArrowForward
                size={11}
                className="shrink-0 text-white/20"
              />
            )}

            {/* Item */}
            {item.status_route && !isLast ? (
              <Link
                to={item.route ?? '/'}
                className="whitespace-nowrap text-xs font-medium text-white/40
                  transition-colors duration-150 hover:text-white/70"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={`whitespace-nowrap text-xs font-semibold
                  ${isLast
                    ? 'text-emerald-400'
                    : 'text-white/40'
                  }`}
              >
                {item.name}
              </span>
            )}

          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;