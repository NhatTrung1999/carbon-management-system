import { createPortal } from 'react-dom';

// ─── Types ───────────────────────────────────────────────────────────────────

type Props = {
  isOpen      : boolean;
  title      ?: string;
  description?: string;
  confirmText?: string;
  cancelText ?: string;
  variant    ?: 'danger' | 'warning' | 'info';
  onConfirm   : () => void;
  onCancel    : () => void;
};

// ─── Icon by variant ─────────────────────────────────────────────────────────

const VARIANT = {
  danger: {
    icon   : (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        className="h-6 w-6">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
    iconBg    : 'bg-red-400/15 text-red-400',
    confirmBtn: 'border-red-400/40 bg-red-400/20 text-red-300 hover:bg-red-400/30 hover:border-red-400/60',
  },
  warning: {
    icon   : (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        className="h-6 w-6">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    iconBg    : 'bg-amber-400/15 text-amber-400',
    confirmBtn: 'border-amber-400/40 bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 hover:border-amber-400/60',
  },
  info: {
    icon   : (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    iconBg    : 'bg-blue-400/15 text-blue-400',
    confirmBtn: 'border-blue-400/40 bg-blue-400/20 text-blue-300 hover:bg-blue-400/30 hover:border-blue-400/60',
  },
} as const;

const BTN_BASE = `inline-flex items-center justify-center rounded-xl border
  px-5 py-2.5 text-sm font-medium backdrop-blur-sm
  transition-all duration-200 active:scale-[0.97] cursor-pointer`;

// ─── Component ───────────────────────────────────────────────────────────────

const ConfirmDialog = ({
  isOpen,
  title       = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText  = 'Cancel',
  variant     = 'danger',
  onConfirm,
  onCancel,
}: Props) => {
  if (!isOpen) return null;

  const v = VARIANT[variant];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      {/* Panel */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl
        border border-white/[0.14] bg-[#636e61]/90
        shadow-[0_32px_80px_rgba(0,0,0,0.55)] backdrop-blur-[48px]">

        {/* Top shimmer */}
        <div className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col items-center gap-4 px-6 py-7 text-center">

          {/* Icon */}
          <div className={`flex h-14 w-14 items-center justify-center
            rounded-2xl ${v.iconBg}`}>
            {v.icon}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/60">{description}</p>
          </div>

          {/* Actions */}
          <div className="flex w-full gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className={`${BTN_BASE} flex-1
                border-white/[0.10] bg-white/[0.06] text-white/70
                hover:bg-white/[0.10] hover:border-white/20 hover:text-white`}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`${BTN_BASE} flex-1 ${v.confirmBtn}`}
            >
              {confirmText}
            </button>
          </div>

        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmDialog;