import { useEffect, useRef, type RefObject } from 'react';

/**
 * Calls `onOutside` on a mousedown outside all of `refs`.
 * Pass several refs when a popup is rendered in a portal apart from its trigger.
 */
export const useClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  onOutside: () => void,
  enabled = true,
) => {
  const latest = useRef({ refs, onOutside });
  useEffect(() => {
    latest.current = { refs, onOutside };
  });

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inside = latest.current.refs.some((r) =>
        r.current?.contains(target),
      );
      if (!inside) latest.current.onOutside();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [enabled]);
};
