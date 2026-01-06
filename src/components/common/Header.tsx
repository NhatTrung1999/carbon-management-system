import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogoImage from '../../assets/images/logo.png';
import { FaUser } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';
import { IoLogOutOutline } from 'react-icons/io5';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

import FlagVN from '../../assets/images/flag-vn.png';
import FlagEN from '../../assets/images/flag-us.png';
import FlagTW from '../../assets/images/flag-tw.png';
import FlagMM from '../../assets/images/flag-mm.png';
import FlagID from '../../assets/images/flag-id.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowLanguage, setIsShowLanguage] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { i18n, t } = useTranslation();

  const onHomePage = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const onShow = () => {
    setIsShow(!isShow);
    setIsShowLanguage(false);
  };

  const onShowLanguage = () => {
    setIsShowLanguage(!isShowLanguage);
    setIsShow(false);
  };

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('lang', value);
    setIsShowLanguage(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 h-[60px] sm:h-[70px] z-50 ${
          location.pathname !== '/'
            ? 'bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61]'
            : ''
        } px-3 sm:px-5 shadow-md`}
      >
        <div className="flex justify-between items-center h-full">
          <button
            type="button"
            className="cursor-pointer flex-shrink-0"
            onClick={() => onHomePage()}
          >
            <img 
              src={LogoImage} 
              className="w-[140px] sm:w-[180px] md:w-[200px] h-auto object-contain" 
              alt="logo" 
            />
          </button>

          <div className="hidden md:flex flex-row gap-4 lg:gap-5 text-white items-center">
            <div className="relative">
              <button
                className="flex flex-row gap-2 lg:gap-3 cursor-pointer font-bold items-center hover:opacity-80 transition-opacity px-3 py-2 rounded-lg hover:bg-white/10"
                onClick={onShowLanguage}
              >
                <FaEarthAmericas size={20} className="flex-shrink-0" />
                <span className="text-sm lg:text-base">{t('main.language')}</span>
              </button>
              <div
                className={`absolute top-12 right-0 w-[150px] bg-white text-primary shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-out ${
                  isShowLanguage
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible'
                }`}
              >
                <ul className="font-semibold">
                  {[
                    { code: 'vn', flag: FlagVN, name: 'VN' },
                    { code: 'en', flag: FlagEN, name: 'EN' },
                    { code: 'tw', flag: FlagTW, name: 'TW' },
                    { code: 'mm', flag: FlagMM, name: 'MM' },
                    { code: 'id', flag: FlagID, name: 'ID' },
                  ].map((lang) => (
                    <li
                      key={lang.code}
                      className="px-3 py-2 hover:bg-gray-100 flex items-center gap-3 cursor-pointer transition-colors"
                      onClick={() => handleChangeLanguage(lang.code)}
                    >
                      <img src={lang.flag} width={24} className="flex-shrink-0" alt={lang.name} />
                      <span className="truncate">{lang.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative">
              <button
                className="flex flex-row gap-2 lg:gap-3 cursor-pointer font-bold items-center hover:opacity-80 transition-opacity px-3 py-2 rounded-lg hover:bg-white/10"
                onClick={onShow}
              >
                <FaUser size={20} className="flex-shrink-0" />
                <span className="select-none text-sm lg:text-base max-w-[120px] truncate">
                  {user?.Name}
                </span>
              </button>
              <div
                className={`absolute top-12 right-0 w-[200px] bg-white text-primary shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-out ${
                  isShow
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible'
                }`}
              >
                <ul className="font-semibold">
                  <li
                    className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer transition-colors"
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline size={24} className="text-primary flex-shrink-0" />
                    <span>{t('main.logout')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoClose size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`md:hidden fixed top-[60px] right-0 bottom-0 w-[280px] bg-gradient-to-b from-[#081c1b] via-[#3f4a42] to-[#636e61] z-40 shadow-2xl transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4 space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaUser size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{user?.Name}</p>
              <p className="text-white/60 text-xs truncate">{user?.Email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold px-2">
              <FaEarthAmericas size={16} />
              <span>{t('main.language')}</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2 space-y-1">
              {[
                { code: 'vn', flag: FlagVN, name: 'VN' },
                { code: 'en', flag: FlagEN, name: 'EN' },
                { code: 'tw', flag: FlagTW, name: 'TW' },
                { code: 'mm', flag: FlagMM, name: 'MM' },
                { code: 'id', flag: FlagID, name: 'ID' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  className="w-full flex items-center gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => handleChangeLanguage(lang.code)}
                >
                  <img src={lang.flag} width={24} className="flex-shrink-0" alt={lang.name} />
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <button
              className="w-full flex items-center gap-3 p-4 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-colors"
              onClick={handleLogout}
            >
              <IoLogOutOutline size={24} />
              <span className="font-semibold">{t('main.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;