import type { ChangeEvent, ReactNode } from 'react';

// Inline controls for editable table rows (glass style).

const FIELD =
  'rounded-lg border border-emerald-400/40 bg-white/[0.08] px-3 py-1.5 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15';

export const EditInput = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    autoFocus
    className={`w-full min-w-[160px] placeholder:text-white/30 ${FIELD}`}
  />
);

export const EditSelect = ({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="relative min-w-[180px]">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full appearance-none pr-8 cursor-pointer [&>option]:bg-[#0a1f18] [&>option]:text-white ${FIELD}`}
    >
      <option value="" className="bg-[#0a1f18]" />
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#0a1f18]">
          {opt}
        </option>
      ))}
    </select>
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-white/50"
    >
      <polyline points="1,3 5,7 9,3" />
    </svg>
  </div>
);

const TONES = {
  emerald:
    'border-emerald-400/20 bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 hover:border-emerald-400/40',
  red: 'border-red-400/20 bg-red-400/10 text-red-400 hover:bg-red-400/20 hover:border-red-400/40',
  amber:
    'border-amber-400/20 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 hover:border-amber-400/40',
  blue: 'border-blue-400/20 bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 hover:border-blue-400/40',
} as const;

export const ActionBtn = ({
  onClick,
  title,
  tone,
  disabled,
  children,
}: {
  onClick: () => void;
  title: string;
  tone: keyof typeof TONES;
  disabled?: boolean;
  children: ReactNode;
}) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${TONES[tone]}`}
  >
    {children}
  </button>
);

export const Spinner = ({ className }: { className: string }) => (
  <span
    className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-transparent ${className}`}
  />
);
