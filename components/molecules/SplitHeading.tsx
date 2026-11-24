"use client";

import { useCallback, useRef } from "react";
import { out } from "@/lib/motion/math";
import { useScrollProgress } from "@/lib/motion/useScrollProgress";

const TRAVEL_VW = 40;

/** Título de dos líneas que llegan desde lados opuestos. */
export default function SplitHeading({ lines }: { lines: [string, string] }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);

  const apply = useCallback((p: number) => {
    const offset = (1 - out(p)) * TRAVEL_VW;
    if (firstRef.current) firstRef.current.style.transform = `translate3d(${-offset}vw,0,0)`;
    if (secondRef.current) secondRef.current.style.transform = `translate3d(${offset}vw,0,0)`;
  }, []);
  useScrollProgress(headingRef, apply);

  return (
    <h2
      ref={headingRef}
      aria-label={lines.join(" ")}
      className="flex flex-col font-heading text-section leading-none font-normal tracking-display whitespace-nowrap"
    >
      <span ref={firstRef} aria-hidden="true" className="self-start will-change-transform">
        {lines[0]}
      </span>
      <span ref={secondRef} aria-hidden="true" className="self-end will-change-transform">
        {lines[1]}
      </span>
    </h2>
  );
}
