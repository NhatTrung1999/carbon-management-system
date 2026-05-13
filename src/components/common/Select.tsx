import { useState, useRef, useEffect, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SelectOption {
  name  : string;
  value : string | number;
}

export interface SelectProps {
  options               : SelectOption[];
  name                  : string;
  label                ?: string;
  value                ?: string | number;
  helperText           ?: string | null;
  onChange             ?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classNameLabel       ?: string;
  customClassNameSelect?: string;
  showAllSelect        ?: boolean;
  isShowAllSelect      ?: boolean;
  readOnly             ?: boolean;
}

// ─── Dropdown rect state ─────────────────────────────────────────────────────

type DropdownPos = {
  top   : number;
  left  : number;
  width : number;
  openUp: boolean; // flip upward when near bottom of viewport
};

// ─── Constants ───────────────────────────────────────────────────────────────

const EASE           = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DROPDOWN_H     = 280; // max expected dropdown height
const GAP            = 6;

// ─── Component ───────────────────────────────────────────────────────────────

const Select = (props: SelectProps) => {
  const {
    label,
    options,
    name,
    value,
    helperText,
    onChange,
    classNameLabel,
    customClassNameSelect,
    showAllSelect,
    isShowAllSelect,
    readOnly,
  } = props;

  const [open, setOpen]         = useState(false);
  const [search, setSearch]     = useState('');
  const [pos, setPos]           = useState<DropdownPos | null>(null);

  const triggerRef              = useRef<HTMLButtonElement>(null);
  const dropdownRef             = useRef<HTMLDivElement>(null);
  const searchRef               = useRef<HTMLInputElement>(null);
  const listboxId               = useId();
  const hasError                = Boolean(helperText);

  // Full option list
  const allOptions: SelectOption[] = [
    ...(isShowAllSelect ? [{ name: showAllSelect ? 'ALL' : 'All', value: 'ALL' }] : []),
    ...(options ?? []),
  ];

  const filtered = search.trim()
    ? allOptions.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()))
    : allOptions;

  const selected = allOptions.find((o) => String(o.value) === String(value));

  // ── Calculate position from trigger rect ──────────────────────────────────
  const calcPos = useCallback((): DropdownPos | null => {
    if (!triggerRef.current) return null;
    const r      = triggerRef.current.getBoundingClientRect();
    const spaceB = window.innerHeight - r.bottom;
    const openUp = spaceB < DROPDOWN_H + GAP && r.top > DROPDOWN_H + GAP;
    return {
      top   : openUp ? r.top - GAP : r.bottom + GAP,
      left  : r.left,
      width : r.width,
      openUp,
    };
  }, []);

  // ── Open / close ──────────────────────────────────────────────────────────
  const openDropdown = () => {
    if (readOnly) return;
    const p = calcPos();
    setPos(p);
    setOpen(true);
  };

  const closeDropdown = () => {
    setOpen(false);
    setSearch('');
  };

  // ── Reposition on scroll / resize while open ──────────────────────────────
  useEffect(() => {
    if (!open) return;
    const update = () => setPos(calcPos());
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, calcPos]);

  // ── Close on outside click ────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // ── Focus search on open ──────────────────────────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape')               { closeDropdown(); return; }
    if (e.key === 'Enter' || e.key === ' ') { if (!open) openDropdown(); }
  };

  // ── Select an option ──────────────────────────────────────────────────────
  const handleSelect = (option: SelectOption) => {
    if (readOnly) return;

    // Synthesise ChangeEvent — keeps existing onChange API identical
    const nativeSelect = document.createElement('select');
    const nativeOption = document.createElement('option');
    nativeOption.value = String(option.value);
    nativeSelect.appendChild(nativeOption);
    nativeSelect.value = String(option.value);
    Object.defineProperty(nativeSelect, 'name', { value: name });

    onChange?.({
      target       : nativeSelect,
      currentTarget: nativeSelect,
    } as unknown as React.ChangeEvent<HTMLSelectElement>);

    closeDropdown();
  };

  // ─── Dropdown panel (rendered via Portal) ─────────────────────────────────
  const dropdown = pos && createPortal(
    <div
      ref={dropdownRef}
      style={{
        position       : 'fixed',
        top            : pos.openUp ? undefined : pos.top,
        bottom         : pos.openUp ? window.innerHeight - pos.top : undefined,
        left           : pos.left,
        width          : pos.width,
        zIndex         : 9999,
        transformOrigin: pos.openUp ? 'bottom center' : 'top center',
        transition     : `opacity 200ms ${EASE}, transform 200ms ${EASE}`,
        opacity        : open ? 1 : 0,
        transform      : open ? 'scaleY(1) translateY(0)' : `scaleY(0.94) translateY(${pos.openUp ? '4px' : '-4px'})`,
        pointerEvents  : open ? 'auto' : 'none',
      }}
      className="overflow-hidden rounded-xl border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-[40px]"
    >
      {/* Top shimmer */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Search (only when options > 6) */}
      {allOptions.length > 6 && (
        <div className="border-b border-white/[0.07] px-3 py-2">
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.05]
              px-3 py-1.5 text-xs text-white placeholder:text-white/30
              outline-none transition-colors duration-150
              focus:border-emerald-400/40 focus:bg-white/[0.07]"
          />
        </div>
      )}

      {/* List */}
      <ul
        id={listboxId}
        role="listbox"
        className="max-h-[220px] overflow-y-auto py-1.5
          [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
          [&::-webkit-scrollbar]:w-[3px]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-emerald-400/20"
      >
        {filtered.length === 0 ? (
          <li className="px-4 py-3 text-center text-xs text-white/50">
            No results
          </li>
        ) : (
          filtered.map((option, i) => {
            const isSelected = String(option.value) === String(value);
            return (
              <li
                key={i}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(option); }}
                className={`mx-1.5 flex cursor-pointer items-center justify-between
                  gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150
                  ${isSelected
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : 'text-white hover:bg-white/[0.06]'
                  }`}
              >
                <span className="truncate">{option.name}</span>
                {isSelected && (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    className="h-3 w-3 shrink-0 text-emerald-400" aria-hidden="true">
                    <polyline points="1.5,6 4.5,9.5 10.5,2.5" />
                  </svg>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>,
    document.body,
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-1.5">

      {/* Label */}
      {label && (
        <label
          id={`${listboxId}-label`}
          className={`text-xs font-semibold uppercase tracking-[0.12em]
            ${hasError ? 'text-red-400' : 'text-white'}
            ${classNameLabel ?? ''}`}
        >
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={label ? `${listboxId}-label` : undefined}
        disabled={readOnly}
        onClick={openDropdown}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border
          bg-white/[0.06] px-4 py-2.5 text-left text-sm backdrop-blur-sm
          outline-none transition-all duration-200
          ${hasError
            ? 'border-red-400/40 focus:border-red-400/60 focus:ring-2 focus:ring-red-400/15'
            : open
              ? 'border-emerald-400/50 ring-2 ring-emerald-400/15'
              : 'border-white/[0.10] hover:border-white/20'
          }
          ${readOnly ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
          ${customClassNameSelect ?? ''}`}
      >
        <span className={selected ? 'text-white' : 'text-white/40'}>
          {selected?.name ?? 'Select…'}
        </span>

        <svg
          viewBox="0 0 12 12" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: `transform 250ms ${EASE}` }}
          className={`h-3.5 w-3.5 shrink-0 text-white
            ${open ? 'rotate-180 text-emerald-400' : ''}`}
          aria-hidden="true"
        >
          <polyline points="2,4 6,8 10,4" />
        </svg>
      </button>

      {/* Portal dropdown */}
      {dropdown}

      {/* Helper / error */}
      {hasError && (
        <p className="flex items-center gap-1.5 text-xs text-red-400/90">
          <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0"
            fill="currentColor" aria-hidden="true">
            <path d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1zm0 7.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM5.25 4.5a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1-1.5 0v-2z" />
          </svg>
          {helperText}
        </p>
      )}

    </div>
  );
};

export default Select;