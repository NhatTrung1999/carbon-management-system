import LogoImage from "../../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const onHomePage = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-[70px] z-10 bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] px-5">
      <div className="flex justify-between items-center h-full">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => onHomePage()}
        >
          <img src={LogoImage} className="w-[200px] object-cover" alt="logo" />
        </button>
        <div className="flex flex-row gap-5 text-white">
          <div className="flex flex-row gap-3 cursor-pointer font-bold">
            <FaEarthAmericas size={23} />
            <span>Languages</span>
          </div>
          <div className="flex flex-row gap-3 cursor-pointer font-bold">
            <FaUser size={23} />
            <span>Administrator</span>
            <MdKeyboardArrowRight size={23} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
