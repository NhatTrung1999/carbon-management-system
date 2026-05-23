import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { type InputProps } from '../../types/input';

// ─── Date picker helpers ──────────────────────────────────────────────────────

const MONTHS     = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
const DAYS_SHORT = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const EASE       = 'cubic-bezier(0.4, 0, 0.2, 1)';

const toISO = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const parseISO = (iso?: string | number) => {
  if (!iso) return null;
  const [y, m, d] = String(iso).split('-').map(Number);
  return { year: y, month: m - 1, day: d };
};

const formatDisplay = (iso?: string | number) => {
  const p = parseISO(iso);
  if (!p) return '';
  return `${String(p.day).padStart(2,'0')}/${String(p.month+1).padStart(2,'0')}/${p.year}`;
};

const getDaysInMonth   = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const getFirstDayOfWeek = (y: number, m: number) => new Date(y, m, 1).getDay();

// ─── Shared UI pieces ─────────────────────────────────────────────────────────

const ErrorMsg = ({ text }: { text?: string | null }) =>
  text ? (
    <p className="flex items-center gap-1.5 text-xs text-red-400">
      <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1zm0 7.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM5.25 4.5a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1-1.5 0v-2z" />
      </svg>
      {text}
    </p>
  ) : null;

// ─── CalendarSelect (inline dropdown, no Portal — already inside one) ────────

type CalendarSelectProps = {
  value   : number;
  options : { label: string; value: number }[];
  onChange: (v: number) => void;
};

const CalendarSelect = ({ value, options, onChange }: CalendarSelectProps) => {
  const [open, setOpen]   = useState(false);
  const ref               = useRef<HTMLDivElement>(null);
  const selected          = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); setOpen((v) => !v); }}
        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1
          text-sm font-semibold text-white outline-none
          transition-all duration-150
          ${open
            ? 'border-emerald-400/50 bg-emerald-400/10'
            : 'border-white/[0.10] bg-white/[0.06] hover:border-white/25 hover:bg-white/[0.10]'
          }`}
      >
        {selected?.label}
        <svg
          viewBox="0 0 10 10" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: `transform 200ms ${EASE}` }}
          className={`h-2.5 w-2.5 shrink-0 text-white/60 ${open ? 'rotate-180 text-emerald-400' : ''}`}
        >
          <polyline points="1,3 5,7 9,3" />
        </svg>
      </button>

      {/* Dropdown list */}
      <div
        style={{
          transition     : `opacity 160ms ${EASE}, transform 160ms ${EASE}`,
          transformOrigin: 'top center',
        }}
        className={`absolute left-0 top-[calc(100%+4px)] z-10
          max-h-[180px] min-w-full overflow-y-auto rounded-xl
          border border-white/[0.12] bg-[#23301e]
          shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-[40px] py-1
          [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
          [&::-webkit-scrollbar]:w-[3px]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-emerald-400/20
          ${open
            ? 'pointer-events-auto opacity-100 translate-y-0 scale-y-100'
            : 'pointer-events-none opacity-0 -translate-y-1 scale-y-95'
          }`}
      >
        {options.map((opt) => {
          const isSel = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); onChange(opt.value); setOpen(false); }}
              className={`flex w-full items-center justify-between gap-3
                px-3 py-1.5 text-sm transition-colors duration-100
                ${isSel
                  ? 'bg-emerald-400/15 text-emerald-300'
                  : 'text-white hover:bg-white/[0.06]'
                }`}
            >
              {opt.label}
              {isSel && (
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor"
                  strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-2.5 w-2.5 shrink-0 text-emerald-400">
                  <polyline points="1,5 3.5,8 9,2" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── DateInput (internal) ─────────────────────────────────────────────────────

const DateInput = (props: InputProps) => {
  const {
    name, value, label, placeholder = 'DD/MM/YYYY',
    helperText, onChange, classNameLabel, customClassNameInput,
    readonly, disabled,
  } = props;

  const today   = new Date();
  const parsed  = parseISO(value);
  const hasError = Boolean(helperText);

  const [open, setOpen]       = useState(false);
  const [pos,  setPos]        = useState<{ top:number; left:number; width:number; openUp:boolean } | null>(null);
  const [viewYear,  setYear]  = useState(parsed?.year  ?? today.getFullYear());
  const [viewMonth, setMonth] = useState(parsed?.month ?? today.getMonth());

  const triggerRef  = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parsed) { setYear(parsed.year); setMonth(parsed.month); }
  }, [value]);

  const calcPos = useCallback(() => {
    if (!triggerRef.current) return null;
    const r = triggerRef.current.getBoundingClientRect();
    const openUp = (window.innerHeight - r.bottom) < 320 && r.top > 320;
    const margin = 12;
    const width = Math.min(Math.max(r.width, 288), window.innerWidth - margin * 2);
    const left = Math.min(Math.max(r.left, margin), window.innerWidth - width - margin);
    return { top: openUp ? r.top - 6 : r.bottom + 6, left, width, openUp };
  }, []);

  const openPicker  = () => { if (readonly || disabled) return; setPos(calcPos()); setOpen(true); };
  const closePicker = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const upd = () => setPos(calcPos());
    window.addEventListener('scroll', upd, true);
    window.addEventListener('resize', upd);
    return () => { window.removeEventListener('scroll', upd, true); window.removeEventListener('resize', upd); };
  }, [open, calcPos]);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !dropdownRef.current?.contains(t)) closePicker();
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  const emitChange = (iso: string) => {
    const el = document.createElement('input');
    el.type = 'date'; el.name = name ?? ''; el.value = iso;
    onChange?.({ target: el, currentTarget: el } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSelectDay = (day: number) => { emitChange(toISO(viewYear, viewMonth, day)); closePicker(); };
  const handleToday     = () => { emitChange(toISO(today.getFullYear(), today.getMonth(), today.getDate())); closePicker(); };
  const handleClear     = () => { emitChange(''); closePicker(); };

  const prevMonth = () => viewMonth === 0  ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1);
  const nextMonth = () => viewMonth === 11 ? (setMonth(0),  setYear(y => y + 1)) : setMonth(m => m + 1);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDow    = getFirstDayOfWeek(viewYear, viewMonth);
  const cells       = Array.from({ length: firstDow + daysInMonth }, (_, i) => i < firstDow ? null : i - firstDow + 1);

  const isSelected = (d: number) => parsed?.year === viewYear && parsed?.month === viewMonth && parsed?.day === d;
  const isToday    = (d: number) => today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === d;

  const triggerClass = `flex w-full items-center justify-between gap-2 rounded-xl border
    bg-white/[0.06] px-4 py-2.5 text-left text-sm backdrop-blur-sm outline-none
    transition-all duration-200
    ${hasError
      ? 'border-red-400/40 focus:border-red-400/60 focus:ring-2 focus:ring-red-400/15'
      : open
        ? 'border-emerald-400/50 ring-2 ring-emerald-400/15'
        : 'border-white/[0.10] hover:border-white/20'
    }
    ${readonly || disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
    ${customClassNameInput ?? ''}`;

  const calendar = pos && createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: pos.openUp ? undefined : pos.top,
        bottom: pos.openUp ? window.innerHeight - pos.top : undefined,
        left: pos.left,
        width: pos.width,
        zIndex: 9999,
        transformOrigin: pos.openUp ? 'bottom center' : 'top center',
        transition: `opacity 200ms ${EASE}, transform 200ms ${EASE}`,
        opacity: open ? 1 : 0,
        transform: open ? 'scaleY(1) translateY(0)' : `scaleY(0.94) translateY(${pos.openUp ? '4px' : '-4px'})`,
        pointerEvents: open ? 'auto' : 'none',
      }}
      className="overflow-hidden rounded-2xl border border-white/[0.14] shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-[48px]"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="p-4">

        {/* Navigation */}
        <div className="mb-4 flex items-center justify-between">
          <button type="button" onClick={prevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white hover:bg-white/[0.08] transition-colors duration-150">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <polyline points="8,2 4,6 8,10" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <CalendarSelect
              value={viewMonth}
              onChange={(v) => setMonth(v)}
              options={MONTHS.map((m, i) => ({ label: m, value: i }))}
            />
            <CalendarSelect
              value={viewYear}
              onChange={(v) => setYear(v)}
              options={Array.from({ length: 30 }, (_, i) => {
                const y = today.getFullYear() - 10 + i;
                return { label: String(y), value: y };
              })}
            />
          </div>

          <button type="button" onClick={nextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white hover:bg-white/[0.08] transition-colors duration-150">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <polyline points="4,2 8,6 4,10" />
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="mb-1 grid grid-cols-7 gap-1">
          {DAYS_SHORT.map((d) => (
            <div key={d} className="py-1 text-center text-[11px] font-semibold uppercase tracking-wide text-white/40">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />;
            const sel = isSelected(day);
            const tod = isToday(day);
            return (
              <button key={day} type="button"
                onMouseDown={(e) => { e.preventDefault(); handleSelectDay(day); }}
                className={`relative flex h-9 w-full items-center justify-center rounded-lg
                  text-sm font-medium transition-all duration-150
                  ${sel
                    ? 'bg-emerald-400/25 text-emerald-300 ring-1 ring-emerald-400/50'
                    : 'text-white cursor-pointer hover:bg-white/[0.08]'
                  }`}
              >
                {day}
                {tod && !sel && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
          <button type="button" onClick={handleToday}
            className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-150">
            Today
          </button>
          <button type="button" onClick={handleClear}
            className="text-xs font-medium text-white/40 hover:text-white transition-colors duration-150">
            Clear
          </button>
        </div>

      </div>
    </div>,
    document.body,
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className={`text-xs font-semibold uppercase tracking-[0.12em]
          ${hasError ? 'text-red-400' : 'text-white'} ${classNameLabel ?? ''}`}>
          {label}
        </label>
      )}

      <button ref={triggerRef} type="button" disabled={disabled} onClick={openPicker} className={triggerClass}>
        <span className={value ? 'text-white' : 'text-white/40'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          className={`h-4 w-4 shrink-0 transition-colors duration-200 ${open ? 'text-emerald-400' : 'text-white'}`}
          aria-hidden="true">
          <rect x="2" y="3" width="14" height="13" rx="2" />
          <path d="M6 1v4M12 1v4M2 8h14" />
        </svg>
      </button>

      {calendar}
      <ErrorMsg text={helperText} />
    </div>
  );
};

// ─── Input (main export) ──────────────────────────────────────────────────────

const Input = (props: InputProps) => {
  // Delegate to custom date picker when type="date"
  if (props.type === 'date') return <DateInput {...props} />;

  const {
    label, type = 'text', name, value, helperText,
    onChange, classNameLabel, customClassNameInput,
    readonly, autoComplete = 'off', placeholder, disabled,
  } = props;

  const hasError = Boolean(helperText);

  return (
    <div className="flex flex-col gap-1.5">

      {label && (
        <label htmlFor={name}
          className={`text-xs font-semibold uppercase tracking-[0.12em]
            ${hasError ? 'text-red-400' : 'text-white'} ${classNameLabel ?? ''}`}>
          {label}
        </label>
      )}

      <input
        id={name} type={type} name={name} value={value}
        onChange={onChange} autoComplete={autoComplete}
        readOnly={readonly} placeholder={placeholder} disabled={disabled}
        className={`w-full rounded-xl border bg-white/[0.06] px-4 py-2.5
          text-sm text-white placeholder:text-white/30 backdrop-blur-sm outline-none
          transition-all duration-200
          ${hasError
            ? 'border-red-400/40 focus:border-red-400/70 focus:ring-2 focus:ring-red-400/20'
            : 'border-white/[0.10] focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15'
          }
          ${readonly  ? 'cursor-default opacity-60 focus:border-white/[0.10] focus:ring-0' : ''}
          ${disabled  ? 'cursor-not-allowed opacity-40' : ''}
          ${customClassNameInput ?? ''}`}
      />

      <ErrorMsg text={helperText} />
    </div>
  );
};

export default Input;
