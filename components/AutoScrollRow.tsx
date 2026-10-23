"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./AutoScrollRow.module.css";

export function AutoScrollRow({ children, className, label = "All departments", disabled = false }: { children: ReactNode; className: string; label?: string; disabled?: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const resumeAt = useRef(0);
  const interacting = useRef(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || disabled) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let position = row.scrollLeft;
    let direction = 1;

    const animate = (now: number) => {
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      const max = row.scrollWidth - row.clientWidth;
      if (!motion.matches && !document.hidden && !interacting.current && now > resumeAt.current && max > 0) {
        if (Math.abs(position - row.scrollLeft) > 2) position = row.scrollLeft;
        position = Math.max(0, Math.min(max, position + direction * elapsed * 0.048));
        row.scrollLeft = position;
        if (position >= max || position <= 0) {
          direction *= -1;
        }
      } else {
        position = row.scrollLeft;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [disabled]);

  const pauseInteraction = () => { resumeAt.current = performance.now() + 180; };

  return (
    <>
      <div
        ref={rowRef}
        className={`${className} ${styles.row}`}
        tabIndex={0}
        role="region"
        aria-label={`${label}. Scroll horizontally to explore.`}
        onPointerDown={() => { interacting.current = true; }}
        onPointerUp={() => { interacting.current = false; pauseInteraction(); }}
        onPointerCancel={() => { interacting.current = false; pauseInteraction(); }}
        onPointerLeave={() => { interacting.current = false; }}
        onWheel={pauseInteraction}
        onKeyDown={pauseInteraction}
      >
        {children}
      </div>

    </>
  );
}
