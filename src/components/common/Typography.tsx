// ─── Types ───────────────────────────────────────────────────────────────────

import type { JSX } from "react";

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle' | 'body' | 'caption' | 'label';

type Props = {
  name       : string;
  variant   ?: Variant;
  className ?: string;
};

// ─── Variant map ─────────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<Variant, { tag: keyof JSX.IntrinsicElements; base: string }> = {
  h1:       { tag: 'h1',   base: 'text-3xl font-bold tracking-tight text-white/90' },
  h2:       { tag: 'h2',   base: 'text-2xl font-bold tracking-tight text-white/90' },
  h3:       { tag: 'h3',   base: 'text-xl  font-semibold text-white/85' },
  h4:       { tag: 'h4',   base: 'text-lg  font-semibold text-white/80' },
  subtitle: { tag: 'p',    base: 'text-sm  font-medium  text-white/55' },
  body:     { tag: 'p',    base: 'text-sm  font-normal  text-white/70 leading-relaxed' },
  caption:  { tag: 'span', base: 'text-xs  font-normal  text-white/40' },
  label:    { tag: 'span', base: 'text-xs  font-semibold uppercase tracking-[0.12em] text-white/50' },
};

// ─── Component ───────────────────────────────────────────────────────────────

const Typography = ({ name, variant = 'body', className }: Props) => {
  const { tag: Tag, base } = VARIANT_STYLES[variant];

  return (
    <Tag className={`${base} ${className ?? ''}`}>
      {name}
    </Tag>
  );
};

export default Typography;