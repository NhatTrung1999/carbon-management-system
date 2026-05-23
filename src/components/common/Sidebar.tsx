import { Link, useLocation, useNavigate } from 'react-router';
import { useMemo, useCallback } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoLogOutOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';
import { MENU_SIDEBAR } from '../../utils/constanst';
import { logout } from '../../features/authSlice';

// ─── Types ───────────────────────────────────────────────────────────────────

type Props = {
  isOpenSideBar: boolean;
  setIsOpenSideBar: (value: boolean) => void;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ADMIN_ONLY_PATHS = new Set([
  '/dashboard/user-management',
  '/dashboard/info-factory-management',
  '/dashboard/system-decentralization',
]);

const HR_ONLY_PATH = '/dashboard/data-collection-hr-module';

// Easing dùng chung — material-style standard curve
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

// ─── Component ───────────────────────────────────────────────────────────────

const Sidebar = ({ isOpenSideBar, setIsOpenSideBar }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const role       = user?.Role?.toLowerCase().trim();
  const department = user?.Department?.toLowerCase().trim();

  const visibleMenu = useMemo(() => {
    const canSeeItem = (path: string): boolean => {
      if (department === 'hr') return path === HR_ONLY_PATH;
      if (ADMIN_ONLY_PATHS.has(path)) return role === 'admin';
      if (path === HR_ONLY_PATH) return department === 'esg' || role === 'admin';
      return true;
    };
    return MENU_SIDEBAR
      .map((group) => ({
        ...group,
        sidebarItem: group.sidebarItem.filter((item) => canSeeItem(item.path)),
      }))
      .filter((group) => group.sidebarItem.length > 0);
  }, [role, department]);

  const toggleSidebar = useCallback(
    () => setIsOpenSideBar(!isOpenSideBar),
    [isOpenSideBar, setIsOpenSideBar],
  );

  const closeMobileSidebar = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsOpenSideBar(true);
    }
  }, [setIsOpenSideBar]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
    closeMobileSidebar();
  }, [closeMobileSidebar, dispatch, navigate]);

  const collapsed = isOpenSideBar;

  return (
    <>
      {/* Mobile overlay — fade, không unmount */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden
          transition-[opacity,visibility] duration-300
          ${collapsed ? 'invisible opacity-0' : 'visible opacity-100'}`}
      />

      {/*
        overflow-hidden bắt buộc để clip content trong lúc width đang transition.
        Dùng inline style cho width vì cần custom cubic-bezier (Tailwind không hỗ trợ).
      */}
      <aside
        style={{ transition: `width 320ms ${EASE}, transform 320ms ${EASE}` }}
        className={`fixed bottom-0 left-0 z-40 overflow-hidden
          border-r border-white/[0.12] bg-[#11211d]/70
          backdrop-blur-[40px] shadow-[0_10px_50px_rgba(0,0,0,0.20)]
          top-[78px]
          ${collapsed
            ? '-translate-x-full w-[300px] md:translate-x-0 md:w-[78px]'
            : 'translate-x-0 w-[300px]'}`}
      >
        {/* Ambient gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b
          from-white/[0.06] via-emerald-400/[0.03] to-transparent" />

        <div className="relative flex h-full flex-col">

          {/* ── Scrollable nav ── */}
          <nav className="min-h-[320px] xl:min-h-0 xl:flex-1 overflow-y-auto px-3 py-4
            [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
            [&::-webkit-scrollbar]:w-[3px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-emerald-400/20
            hover:[&::-webkit-scrollbar-thumb]:bg-emerald-400/40">

            {visibleMenu.map((group, gi) => (
              <div key={gi} className="mb-1 last:mb-0">

                {/*
                  Group label — max-height + opacity thay vì unmount.
                  Tạo hiệu ứng slide-up khi collapse, slide-down khi expand.
                */}
                <div
                  style={{
                    transition: `max-height 280ms ${EASE}, opacity 220ms ${EASE}, margin 280ms ${EASE}`,
                  }}
                  className={`overflow-hidden px-3 text-[10px] font-bold
                    uppercase tracking-[0.18em] text-emerald-200/50
                    ${collapsed
                      ? 'max-h-0 opacity-0 mb-0 mt-0'
                      : 'max-h-6 opacity-100 mb-1 mt-4 first:mt-0'}`}
                >
                  {t(group.name)}
                </div>

                <div className="space-y-0.5">
                  {group.sidebarItem.map((item, ii) => (
                    <NavItem
                      key={ii}
                      item={item}
                      isActive={item.path === location.pathname}
                      isCollapsed={collapsed}
                      label={t(item.text)}
                      onNavigate={closeMobileSidebar}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* ── Toggle footer ── */}
          <div className="shrink-0 border-t border-white/[0.08] px-3 py-3">
            <button
              type="button"
              onClick={handleLogout}
              className="mb-3 flex w-full items-center gap-3 rounded-xl border border-red-400/20 bg-red-500/15 px-3 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-500/25 md:hidden"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-400/20">
                <IoLogOutOutline size={20} />
              </span>

              <span className="min-w-0 truncate">
                {t('main.logout')}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleSidebar}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5
                border border-white/[0.08] bg-white/[0.04] text-slate-400
                transition-colors duration-200
                hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
            >
              {/* Arrow xoay 180° — dùng inline style để dùng cùng EASE */}
              <span
                style={{ transition: `transform 320ms ${EASE}` }}
                className={`flex h-5 w-5 shrink-0 items-center justify-center
                  ${collapsed ? 'rotate-180' : 'rotate-0'}`}
              >
                <IoIosArrowBack size={15} />
              </span>

              {/* "Thu gọn" — max-width clip, không unmount */}
              <span
                style={{
                  transition: `max-width 280ms ${EASE}, opacity 200ms ${EASE}`,
                }}
                className={`overflow-hidden whitespace-nowrap
                  text-xs font-semibold tracking-wide
                  ${collapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'}`}
              >
                Narraw
              </span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
};

// ─── NavItem ─────────────────────────────────────────────────────────────────

type NavItemProps = {
  item: (typeof MENU_SIDEBAR)[number]['sidebarItem'][number];
  isActive: boolean;
  isCollapsed: boolean;
  label: string;
  onNavigate: () => void;
};

const NavItem = ({
  item,
  isActive,
  isCollapsed,
  label,
  onNavigate,
}: NavItemProps) => (
  <Link to={item.path} onClick={onNavigate}>
    <div
      className={`group relative flex items-center gap-3 overflow-hidden
        rounded-xl px-3 py-2.5 transition-colors duration-200
        ${isActive
          ? 'bg-emerald-400/20 text-white shadow-[0_4px_16px_rgba(16,185,129,0.10)]'
          : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'}`}
    >
      {/* Active bar — slide in từ trái */}
      <div
        style={{ transition: `opacity 250ms ${EASE}, transform 250ms ${EASE}` }}
        className={`absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-emerald-300
          ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}
      />

      {/* Icon — kích thước cố định, không bị layout shift */}
      <div
        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center
          rounded-lg transition-colors duration-200
          ${isActive
            ? 'bg-emerald-400/25 text-emerald-100'
            : 'bg-white/[0.06] group-hover:bg-white/[0.10]'}`}
      >
        {isActive && item.activeIcon ? item.activeIcon : item.icon}
      </div>

      {/*
        Label — max-width clip + opacity fade, KHÔNG unmount.
        Giúp text không "bật" đột ngột khi sidebar mở ra.
        opacity delay 40ms để chữ bắt đầu fade sau khi width đã mở một chút.
      */}
      <span
        style={{
          transition: `max-width 280ms ${EASE}, opacity 220ms 40ms ${EASE}`,
        }}
        className={`relative z-10 overflow-hidden whitespace-nowrap
          text-sm font-semibold
          ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'}`}
      >
        {label}
      </span>

      {/* Hover shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent
        opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  </Link>
);

export default Sidebar;
