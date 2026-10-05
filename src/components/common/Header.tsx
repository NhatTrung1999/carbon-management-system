import { useState, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { useTranslation } from 'react-i18next';

import LogoImage from '../../assets/images/logo.png';

import { FaUser } from 'react-icons/fa';

import { FaEarthAmericas } from 'react-icons/fa6';

import { IoLogOutOutline, IoClose } from 'react-icons/io5';

import { HiMenuAlt3 } from 'react-icons/hi';

import FlagVN from '../../assets/images/flag-vn.png';
import FlagEN from '../../assets/images/flag-us.png';
import FlagTW from '../../assets/images/flag-tw.png';
import FlagMM from '../../assets/images/flag-mm.png';
import FlagID from '../../assets/images/flag-id.png';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { logout } from '../../features/authSlice';
import { useClickOutside } from '../../hooks/useClickOutside';

type HeaderProps = {
  isOpenSideBar?: boolean;
  setIsOpenSideBar?: (value: boolean) => void;
};

const Header = ({ isOpenSideBar = true, setIsOpenSideBar }: HeaderProps) => {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { i18n, t } = useTranslation();

  const [isShow, setIsShow] = useState(false);

  const [isShowLanguage, setIsShowLanguage] = useState(false);

  /* REFS */
  const languageRef = useRef<HTMLDivElement>(null);

  const userRef = useRef<HTMLDivElement>(null);

  useClickOutside([languageRef], () => setIsShowLanguage(false));
  useClickOutside([userRef], () => setIsShow(false));

  const languages = [
    {
      code: 'vn',
      flag: FlagVN,
      name: 'VN',
    },
    {
      code: 'en',
      flag: FlagEN,
      name: 'EN',
    },
    {
      code: 'tw',
      flag: FlagTW,
      name: 'TW',
    },
    {
      code: 'mm',
      flag: FlagMM,
      name: 'MM',
    },
    {
      code: 'id',
      flag: FlagID,
      name: 'ID',
    },
  ];

  const onHomePage = () => {
    navigate('/');
  };

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);

    localStorage.setItem('lang', value);

    setIsShowLanguage(false);
  };

  const handleLogout = () => {
    dispatch(logout());

    navigate('/login');
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[78px] border-b border-white/[0.08] bg-[#07110c]/45 backdrop-blur-[30px] ${
          location.pathname === '/' ? 'bg-transparent' : ''
        }`}
      >
        {/* LIGHT EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.08] via-transparent to-emerald-400/[0.05]" />

        <div className="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* LOGO */}
          <button
            type="button"
            onClick={onHomePage}
            className="flex items-center gap-4"
          >
            <img
              src={LogoImage}
              className="h-[42px] w-auto object-contain"
              alt="logo"
            />
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-3 md:flex">
            {/* LANGUAGE */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => {
                  setIsShowLanguage(!isShowLanguage);

                  setIsShow(false);
                }}
                className="flex h-11 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.10]"
              >
                <FaEarthAmericas size={16} />

                <span>{t('main.language')}</span>
              </button>

              {/* LANGUAGE DROPDOWN */}
              <div
                className={`absolute right-0 top-14 w-[220px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#253725]/90 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-[30px] transition-all duration-300 ${
                  isShowLanguage
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible -translate-y-2 opacity-0'
                }`}
              >
                {/* HEADER */}
                <div className="border-b border-white/[0.06] p-4">
                  <div className="text-sm font-semibold text-white">
                    {t('main.language')}
                  </div>

                  <div className="mt-1 text-xs text-slate-300">
                    {t('common.select_language')}
                  </div>
                </div>

                {/* LIST */}
                <div className="p-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleChangeLanguage(lang.code)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/[0.08]"
                    >
                      <img src={lang.flag} width={22} alt={lang.name} />

                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* USER */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => {
                  setIsShow(!isShow);

                  setIsShowLanguage(false);
                }}
                className="flex h-11 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.10]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20">
                  <FaUser size={12} />
                </div>

                <span className="max-w-[130px] truncate">{user?.Name}</span>
              </button>

              {/* USER DROPDOWN */}
              <div
                className={`absolute right-0 top-14 w-[220px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#253725]/90 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-[30px] transition-all duration-300 ${
                  isShow
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible -translate-y-2 opacity-0'
                }`}
              >
                {/* HEADER */}
                <div className="border-b border-white/[0.06] p-4">
                  <div className="text-sm font-semibold text-white">
                    {user?.Name}
                  </div>

                  <div className="mt-1 text-xs text-slate-300">
                    {user?.Email}
                  </div>
                </div>

                {/* LIST */}
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-red-500/20"
                  >
                    <IoLogOutOutline size={20} />

                    <span>{t('main.logout')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => {
              setIsShow(false);
              setIsShowLanguage(false);
              setIsOpenSideBar?.(!isOpenSideBar);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-white transition-all duration-300 hover:bg-white/[0.10] md:hidden"
          >
            {isOpenSideBar ? <HiMenuAlt3 size={25} /> : <IoClose size={25} />}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
