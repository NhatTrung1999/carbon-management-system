import type React from 'react';

type Props = {
  title    : string;
  id       : string;
  name    ?: string;
  checked ?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ title, id, name, checked, onChange }: Props) => (
  <label
    htmlFor={id}
    className="group inline-flex cursor-pointer items-center gap-2.5
      rounded-xl border border-white/[0.10] bg-white/[0.05] px-3 py-2
      backdrop-blur-sm transition-all duration-200
      hover:border-emerald-400/30 hover:bg-emerald-400/10"
  >
    {/* Hidden native input — still accessible */}
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      className="peer sr-only"
    />

    {/* Custom checkbox box */}
    <span
      className="relative flex h-5 w-5 shrink-0 items-center justify-center
        rounded-md border border-white/[0.20] bg-white/[0.06]
        transition-all duration-200
        peer-checked:border-emerald-400/60 peer-checked:bg-emerald-400/20
        peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400/50 peer-focus-visible:ring-offset-0
        group-hover:border-white/30"
    >
      {/* Checkmark — scale in when checked */}
      <svg
        viewBox="0 0 12 12"
        className="h-3 w-3 text-emerald-300 transition-all duration-200
          scale-0 opacity-0 peer-checked:scale-100 peer-checked:opacity-100
          [.peer:checked~span>&]:scale-100 [.peer:checked~span>&]:opacity-100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="1.5,6 4.5,9.5 10.5,2.5" />
      </svg>
    </span>

    {/* Label */}
    <span className="select-none text-sm font-medium text-white
      transition-colors duration-200
      group-hover:text-white/80
      peer-checked:text-white/90
      [.peer:checked~span+&]:text-white/90">
      {title}
    </span>
  </label>
);

export default Checkbox;