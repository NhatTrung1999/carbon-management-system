import { Link, useLocation } from 'react-router';

import { MENU_SIDEBAR } from '../../utils/constanst';

import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';

type Props = {
  isOpenSideBar: boolean;
  setIsOpenSideBar: (item: boolean) => void;
};

const Sidebar = ({ isOpenSideBar, setIsOpenSideBar }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [activePath, setActivePath] = useState<string>(location.pathname);

  const shouldShowItem = (path: string) => {
    if (path === '/dashboard/user-management') {
      return user?.Role.toLowerCase() === 'admin'; // Chỉ hiển thị nếu là admin
    }
    return true; // Các item khác luôn hiển thị
  };
  return (
    <div
      className={`${isOpenSideBar ? 'w-[120px]' : 'w-xs'} 
      bg-white fixed z-10 left-0 top-0 bottom-0 pt-[70px] border-gray-200 shadow-xl transition-all duration-300 ease-in-out`}
    >
      <div>
        {MENU_SIDEBAR.map((itemParent, indexParent) => (
          <div key={indexParent}>
            <div
              className={`${
                isOpenSideBar ? 'text-[16px]' : ''
              } font-semibold mt-4 mb-3 px-5`}
              key={indexParent}
            >
              {itemParent.name}
            </div>
            {itemParent.sidebarItem
              .filter((item) => shouldShowItem(item.path))
              .map((itemChild, indexChild) => (
                <Link to={itemChild.path} key={indexChild}>
                  <li
                    className={`px-10 py-3 cursor-pointer text-base ${
                      itemChild.path === activePath
                        ? 'bg-gray-100 border-l-4 border-primary text-[#1d2d29]'
                        : ''
                    }`}
                    onClick={() => setActivePath(itemChild.path)}
                  >
                    <div
                      className={`${
                        isOpenSideBar ? 'justify-center' : ''
                      } flex items-center gap-3`}
                    >
                      <span>{itemChild.icon}</span>
                      {!isOpenSideBar && (
                        <span
                          className="flex-1 whitespace-nowrap truncate"
                          title={itemChild.text}
                        >
                          {itemChild.text}
                        </span>
                      )}
                    </div>
                  </li>
                </Link>
              ))}
          </div>
        ))}
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
  );
};

export default Sidebar;
