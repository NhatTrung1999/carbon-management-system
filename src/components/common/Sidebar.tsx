import { Link } from "react-router";

import { MENU_SIDEBAR } from "../../utils/constanst";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

type Props = {
  isOpenSideBar: boolean;
  setIsOpenSideBar: (item: boolean) => void;
};

const Sidebar = ({ isOpenSideBar, setIsOpenSideBar }: Props) => {
  return (
    <div
      className={`${isOpenSideBar ? "w-[120px]" : "w-xs"} 
       fixed z-10 left-0 top-0 bottom-0 pt-[70px] border-gray-200 shadow-xl transition-all duration-300 ease-in-out`}
    >
      <div>
        {MENU_SIDEBAR.map((itemParent, indexParent) => (
          <div key={indexParent}>
            <div
              className={`${
                isOpenSideBar ? "text-[16px]" : ""
              } font-bold mt-4 mb-3 px-5`}
              key={indexParent}
            >
              {itemParent.name}
            </div>
            {itemParent.sidebarItem.map((itemChild, indexChild) => (
              <li
                key={indexChild}
                className="hover:bg-gray-100 px-10 py-3  cursor-pointer text-base"
              >
                <Link
                  to={itemChild.path}
                  className={`${
                    isOpenSideBar ? "justify-center" : ""
                  } flex items-center gap-3`}
                >
                  <span>{itemChild.icon}</span>
                  {!isOpenSideBar && (
                    <span className="flex-1 whitespace-pre-wrap">
                      {itemChild.text}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute top-[95px] -right-4">
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
