"use client";

import { useCallback, useRef } from "react";
import { ease } from "@/lib/motion/math";
import { useScrollProgress } from "@/lib/motion/useScrollProgress";

type ProgressBarProps = {
  /** Porcentaje de 0 a 100. */
  value: number;
  label: string;
};

/** La barra se llena con el scroll hasta llegar a `value`. */
export default function ProgressBar({ value, label }: ProgressBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const apply = useCallback((p: number) => {
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${ease(p)})`;
  }, []);
  useScrollProgress(trackRef, apply);

  return (
    <div
      ref={trackRef}
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-px bg-border"
    >
      <div ref={fillRef} className="h-full origin-left bg-primary" style={{ width: `${value}%` }} />
    </div>
  );
}
