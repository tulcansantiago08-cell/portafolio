"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { out } from "@/lib/motion/math";
import { useScrollProgress } from "@/lib/motion/useScrollProgress";

type FlyInProps = {
  children: ReactNode;
  /** Desde dónde llega, en vw. */
  x?: number;
  /** Desde dónde llega, en vh. */
  y?: number;
  /** Inclinación inicial, en grados. */
  tilt?: number;
  className?: string;
};

/** Lleva su contenido a su lugar con el scroll, igual que las tarjetas de la cinta. */
export default function FlyIn({ children, x = 0, y = 0, tilt = 0, className }: FlyInProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const apply = useCallback(
    (p: number) => {
      if (!innerRef.current) return;
      const rest = 1 - out(p);
      innerRef.current.style.transform = `translate3d(${x * rest}vw,${y * rest}vh,0) rotate(${tilt * rest}deg)`;
    },
    [x, y, tilt],
  );
  useScrollProgress(outerRef, apply);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
