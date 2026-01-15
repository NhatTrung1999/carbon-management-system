import { Link, useLocation } from 'react-router';

import { MENU_SIDEBAR } from '../../utils/constanst';

import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpenSideBar: boolean;
  setIsOpenSideBar: (item: boolean) => void;
};

const Sidebar = ({ isOpenSideBar, setIsOpenSideBar }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { t } = useTranslation();
  const [activePath, setActivePath] = useState<string>(location.pathname);

  const shouldShowItem = (path: string) => {
    const role = user?.Role?.toLowerCase()?.trim();
    const department = user?.Department?.toLowerCase().trim();
    if (department === 'hr') {
      return path === '/dashboard/data-collection-hr-module';
    }
    if (
      path === '/dashboard/user-management' ||
      path === '/dashboard/info-factory-management' ||
      path === '/dashboard/system-decentralization'
    ) {
      return role === 'admin';
    }
    if (path === '/dashboard/data-collection-hr-module') {
      return department === 'esg' || role === 'admin';
    }
    return true;
    // if (path === '/dashboard/user-management') {
    //   return user?.Role.toLowerCase() === 'admin';
    // }
    // if (path === '/dashboard/info-factory-management') {
    //   return user?.Role.toLowerCase() === 'admin';
    // }
    // if (path === '/dashboard/data-collection-hr-module') {
    //   return (
    //     user?.Department?.toLowerCase().trim() === 'esg' ||
    //     user?.Department?.toLowerCase().trim() === 'hr'
    //   );
    // }
    // return true;
  };

  return (
    <>
      {!isOpenSideBar && (
        <div
          className="md:hidden fixed inset-0 bg-[#E6E1E1] bg-opacity-50 z-[9] top-[70px]"
          onClick={() => setIsOpenSideBar(true)}
        />
      )}

      <div
        className={`${
          isOpenSideBar ? 'w-[60px] md:w-[120px]' : 'w-[300px] sm:w-[320px]'
        } 
        bg-white fixed z-10 left-0 top-0 bottom-0 pt-[70px] h-screen border-gray-200 shadow-xl transition-all duration-300 ease-in-out`}
      >
        <div className="h-full overflow-y-auto pt-4">
          {/* {MENU_SIDEBAR.map((itemParent, indexParent) => (
            <div key={indexParent}>
              <div
                className={`${
                  isOpenSideBar
                    ? 'text-[14px] md:text-[16px] text-center'
                    : 'text-[16px]'
                } font-semibold mt-4 mb-3 px-5`}
                key={indexParent}
              >
                {isOpenSideBar ? '' : t(itemParent.name)}
              </div>
              {itemParent.sidebarItem
                .filter((item) => shouldShowItem(item.path))
                .map((itemChild, indexChild) => {
                  const isActive = itemChild.path === activePath;

                  return (
                    <Link to={itemChild.path} key={indexChild}>
                      <li
                        className={`${
                          isOpenSideBar ? 'px-2 md:px-4' : 'px-6'
                        } py-3 cursor-pointer text-base ${
                          isActive
                            ? 'bg-gray-100 border-l-4 border-primary text-[#1d2d29] font-medium'
                            : ''
                        }`}
                        onClick={() => setActivePath(itemChild.path)}
                      >
                        <div
                          className={`${
                            isOpenSideBar ? 'justify-center' : ''
                          } flex items-center gap-3`}
                        >
                          <span
                            className={`${
                              isActive ? 'text-primary' : ''
                            } flex-shrink-0`}
                          >
                            {isActive && itemChild.activeIcon
                              ? itemChild.activeIcon
                              : itemChild.icon}
                          </span>
                          {!isOpenSideBar && (
                            <span
                              className="flex-1 whitespace-normal leading-snug"
                              title={itemChild.text}
                            >
                              {t(itemChild.text)}
                            </span>
                          )}
                        </div>
                      </li>
                    </Link>
                  );
                })}
            </div>
          ))} */}
          {MENU_SIDEBAR.map((itemParent, indexParent) => {
            const visibleItems = itemParent.sidebarItem.filter((item) =>
              shouldShowItem(item.path)
            );

            if (visibleItems.length === 0) return null;

            return (
              <div key={indexParent}>
                <div
                  className={`${
                    isOpenSideBar
                      ? 'text-[14px] md:text-[16px] text-center'
                      : 'text-[16px]'
                  } font-semibold mt-4 mb-3 px-5`}
                >
                  {isOpenSideBar ? '' : t(itemParent.name)}
                </div>

                {visibleItems.map((itemChild, indexChild) => {
                  const isActive = itemChild.path === activePath;

                  return (
                    <Link to={itemChild.path} key={indexChild}>
                      <li
                        className={`${
                          isOpenSideBar ? 'px-2 md:px-4' : 'px-6'
                        } py-3 cursor-pointer text-base ${
                          isActive
                            ? 'bg-gray-100 border-l-4 border-primary text-[#1d2d29] font-medium'
                            : ''
                        }`}
                        onClick={() => setActivePath(itemChild.path)}
                      >
                        <div
                          className={`${
                            isOpenSideBar ? 'justify-center' : ''
                          } flex items-center gap-3`}
                        >
                          <span className={isActive ? 'text-primary' : ''}>
                            {isActive && itemChild.activeIcon
                              ? itemChild.activeIcon
                              : itemChild.icon}
                          </span>
                          {!isOpenSideBar && <span>{t(itemChild.text)}</span>}
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="absolute top-[80px] -right-4">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 bg-[#4059f6] rounded-full text-white cursor-pointer"
            onClick={() => setIsOpenSideBar(!isOpenSideBar)}
          >
            {!isOpenSideBar ? (
              <IoIosArrowBack size={18} />
            ) : (
              <IoIosArrowForward size={18} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
