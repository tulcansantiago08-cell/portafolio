"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion/math";
import { useScrollProgress } from "@/lib/motion/useScrollProgress";

type DrawLineProps = {
  vertical?: boolean;
  className?: string;
};

/** Línea fina que se dibuja con el scroll y se borra al volver. */
export default function DrawLine({ vertical, className }: DrawLineProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const apply = useCallback(
    (p: number) => {
      if (!lineRef.current) return;
      const scale = ease(p);
      lineRef.current.style.transform = vertical ? `scaleY(${scale})` : `scaleX(${scale})`;
    },
    [vertical],
  );
  useScrollProgress(outerRef, apply, { mode: vertical ? "pass" : "enter" });

  return (
    <div ref={outerRef} aria-hidden="true" className={cn(vertical ? "h-full w-px" : "h-px w-full", className)}>
      <div ref={lineRef} className={cn("size-full bg-border", vertical ? "origin-top" : "origin-left")} />
    </div>
  );
}
