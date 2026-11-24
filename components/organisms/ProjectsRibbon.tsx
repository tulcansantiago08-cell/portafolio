"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import StageHeadline from "@/components/molecules/StageHeadline";
import ScrollStage from "@/components/templates/ScrollStage";
import { projects } from "@/data/projects";
import { applyHeadline } from "@/lib/motion/headline";
import { ease, span } from "@/lib/motion/math";
import { useScrollProgress } from "@/lib/motion/useScrollProgress";
import type { Ribbon, RibbonItem } from "@/lib/ribbon/createRibbon";

const items: RibbonItem[] = projects.map((project) => ({
  title: project.title,
  href: project.demo ?? project.github,
  image: project.image,
  video: project.video,
}));

/** Cinta 3D de proyectos que aterriza en una cuadrícula. */
export default function ProjectsRibbon() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<Ribbon | null>(null);
  const progressRef = useRef(0);
  const hoveredRef = useRef<RibbonItem | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const apply = useCallback((p: number) => {
    progressRef.current = p;
    if (trackRef.current) applyHeadline(trackRef.current, p);
    ribbonRef.current?.setProgress(p);
    if (ruleRef.current) {
      ruleRef.current.style.transform = `scaleX(${ease(span(p, 0.72, 0.86))})`;
      ruleRef.current.hidden = ribbonRef.current?.rows !== 2;
    }
  }, []);
  useScrollProgress(trackRef, apply, { mode: "track" });

  // La escena y los videos se cargan solo cuando la sección está cerca.
  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas || !items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isDisposed = false;
    let isNear = false;
    let isLoading = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNear = entry.isIntersecting;
        ribbonRef.current?.setActive(isNear);
        if (!isNear || ribbonRef.current || isLoading) return;

        isLoading = true;
        import("@/lib/ribbon/createRibbon")
          .then(({ createRibbon }) => {
            if (isDisposed) return;
            const ribbon = createRibbon(canvas, items);
            ribbonRef.current = ribbon;
            apply(progressRef.current);
            ribbon.setActive(isNear);
          })
          .catch(() => setIsSupported(false));
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(track);

    return () => {
      isDisposed = true;
      observer.disconnect();
      ribbonRef.current?.dispose();
      ribbonRef.current = null;
    };
  }, [apply]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const pill = pillRef.current;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hit = ribbonRef.current?.hit(x / rect.width, y / rect.height) ?? null;

    hoveredRef.current = hit;
    event.currentTarget.style.cursor = hit ? "pointer" : "";
    if (!pill) return;
    pill.style.opacity = hit ? "1" : "0";
    if (hit) {
      pill.textContent = hit.title;
      pill.style.transform = `translate(${x + 14}px,${y + 16}px)`;
    }
  }

  function handleClick() {
    if (hoveredRef.current) window.open(hoveredRef.current.href, "_blank", "noopener,noreferrer");
  }

  if (!isSupported) return null;

  return (
    <ScrollStage ref={trackRef} trackClassName="h-[900vh] motion-reduce:hidden">
      <div onPointerMove={handlePointerMove} onClick={handleClick} className="absolute inset-0">
        <StageHeadline as="h2" lines={["MIS", "PROYECTOS"]} caption="Explorando ideas con diseño y código." />
        <div
          ref={ruleRef}
          aria-hidden="true"
          className="absolute inset-x-[3.5vw] top-1/2 h-px origin-left scale-x-0 bg-border"
        />
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block size-full" />
        <div
          ref={pillRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 rounded-control bg-primary px-[11px] py-1.5 text-[11.5px] font-semibold tracking-[.04em] whitespace-nowrap text-primary-foreground opacity-0 transition-opacity duration-150"
        />
      </div>
    </ScrollStage>
  );
}
