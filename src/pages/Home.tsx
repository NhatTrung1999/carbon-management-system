import LogoImage from "../assets/images/logo.png";

import { FaUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

const Home = () => {
  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/192136/pexels-photo-192136.jpeg')] bg-center bg-cover box-sizing p-5">
      <div className="flex flex-row justify-between items-center">
        <div>
          <img src={LogoImage} className="w-[200px] object-cover" alt="logo" />
        </div>
        <div className="flex flex-row gap-5">
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

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-full lg:w-1/2 box-sizing p-10 pb-24 bg-gray/50 backdrop-blur-xl flex flex-col justify-between">
        <div className="text-[2vw] font-extrabold ">
          CARBON MANAGEMENT WEBSITE
        </div>
        <div className="mt-3 tracking-wider">
          An internal, centralized platform that automatically aggregates
          emissions inventory data from LY App, BPM, WMS, and ERP—enabling
          seamless integration with our external Carbon Management System (CMS).
        </div>
      </div>

      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-[100px]  bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 cursor-pointer">
        Go to Dashboard (Scope 3)
      </div>
    </div>
  );
};

export default Home;
