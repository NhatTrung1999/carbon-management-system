// import { type ButtonProps } from '../../types/button';
export type ButtonVariant = 'primary' | 'secondary' | 'danger';
 
export type ButtonProps = {
  label       : React.ReactNode;
  type       ?: 'button' | 'submit' | 'reset';
  className  ?: string;
  onClick    ?: () => void;
  imgSrc     ?: string;
  disabled   ?: boolean;
  variant    ?: ButtonVariant;   // ← thêm mới
};

// ─── Variant styles ───────────────────────────────────────────────────────────

const VARIANTS = {
  primary: `bg-emerald-500/20 border-emerald-400/40 text-emerald-300
    hover:bg-emerald-500/30 hover:border-emerald-400/60 hover:text-emerald-200
    focus-visible:ring-emerald-400/40
    disabled:bg-emerald-900/10 disabled:border-emerald-900/20 disabled:text-emerald-700`,

  secondary: `bg-white/[0.06] border-white/[0.12] text-white/70
    hover:bg-white/[0.10] hover:border-white/[0.20] hover:text-white
    focus-visible:ring-white/20
    disabled:bg-white/[0.02] disabled:border-white/[0.06] disabled:text-white/20`,

  danger: `bg-red-500/15 border-red-400/30 text-red-300
    hover:bg-red-500/25 hover:border-red-400/50 hover:text-red-200
    focus-visible:ring-red-400/40
    disabled:bg-red-900/10 disabled:border-red-900/20 disabled:text-red-800`,
} as const;

const BASE = `relative inline-flex items-center justify-center gap-2 overflow-hidden
  max-w-full whitespace-normal rounded-xl border px-4 py-2.5 text-center sm:px-5 sm:whitespace-nowrap
  text-sm font-medium backdrop-blur-sm
  transition-all duration-200
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0
  disabled:cursor-not-allowed disabled:pointer-events-none
  active:scale-[0.97]`;

// ─── Component ────────────────────────────────────────────────────────────────

const Button = (props: ButtonProps) => {
  const {
    label,
    type    = 'button',
    className,
    onClick,
    imgSrc,
    disabled,
    variant = 'primary',
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE} ${VARIANTS[variant as keyof typeof VARIANTS] ?? VARIANTS.primary} ${className ?? ''}`}
    >
      {/* Shimmer overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r
          from-white/[0.07] via-white/[0.03] to-transparent opacity-0
          transition-opacity duration-300 group-hover:opacity-100"
      />

      {imgSrc && (
        <img src={imgSrc} alt="" aria-hidden="true" className="h-5 w-5 shrink-0 object-contain" />
      )}

      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default Button;
