import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LogoImage from "../../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { GoInfo } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";

import FlagVN from "../../assets/images/flag-vn.png";
import FlagEN from "../../assets/images/flag-us.png";
import FlagTW from "../../assets/images/flag-tw.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowLanguage, setIsShowLanguage] = useState<boolean>(false);

  const onHomePage = () => {
    navigate("/");
  };

  const onShow = () => {
    setIsShow(!isShow);
    setIsShowLanguage(false);
  };

  const onShowLanguage = () => {
    setIsShowLanguage(!isShowLanguage);
    setIsShow(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-[70px] z-11 ${
        location.pathname !== "/"
          ? "bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61]"
          : ""
      } px-5`}
    >
      <div className="flex justify-between items-center h-full">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => onHomePage()}
        >
          <img src={LogoImage} className="w-[200px] object-cover" alt="logo" />
        </button>
        <div className="flex flex-row gap-5 text-white">
          <div className="relative">
            <div
              className="flex flex-row gap-3 cursor-pointer font-bold"
              onClick={onShowLanguage}
            >
              <FaEarthAmericas size={23} />
              <span>Languages</span>
            </div>
            <div
              className={`absolute top-8 bg-white text-primary w-full px-3 py-2 shadow-md rounded-md transition-all duration-300 origin-top ${
                isShowLanguage
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <ul className="font-semibold">
                <li className="p-2 hover:bg-gray-200 flex items-center gap-3">
                  <img src={FlagVN} width={24} />
                  <span className="truncate">VN</span>
                </li>

                <li className="p-2 hover:bg-gray-200 flex items-center gap-3">
                  <img src={FlagEN} width={24} />
                  <span className="truncate">EN</span>
                </li>

                <li className="p-2 hover:bg-gray-200 flex items-center gap-3">
                  <img src={FlagTW} width={24} />
                  <span className="truncate">TW</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <div
              className="flex flex-row gap-3 cursor-pointer font-bold"
              onClick={onShow}
            >
              <FaUser size={23} />
              <span className="select-none">Administrator</span>
              {/* <MdKeyboardArrowRight size={23} /> */}
            </div>
            <div
              className={`absolute top-8 bg-white text-primary w-full px-3 py-2 shadow-md rounded-md transition-all duration-300 origin-top ${
                isShow
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <ul className="font-semibold">
                <Link to={"/user-info"}>
                  <li className="p-2 hover:bg-gray-200 flex items-center gap-2">
                    <GoInfo className="text-primary" size={24} />
                    UserInfo
                  </li>
                </Link>
                <Link to={"/"}>
                  <li className="p-2 hover:bg-gray-200 flex items-center gap-2">
                    <IoLogOutOutline size={25} className="text-primary" />
                    Logout
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
