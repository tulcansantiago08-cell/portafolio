"use client";

import { useEffect, type RefObject } from "react";
import { clamp } from "./math";

/**
 * Cómo se convierte el scroll en un número de 0 a 1:
 * - track: recorrido completo de un contenedor con escena fija (sticky).
 * - enter: desde que el elemento entra por abajo hasta el 55% de la pantalla.
 * - pass: mientras el elemento pasa, proporcional a su altura.
 */
export type ScrollMode = "track" | "enter" | "pass";

const SMOOTHING = 0.09;
const SNAP = 0.00005;

function readProgress(element: HTMLElement, mode: ScrollMode) {
  const rect = element.getBoundingClientRect();
  const viewport = window.innerHeight;

  if (mode === "track") {
    const distance = rect.height - viewport;
    return distance > 0 ? clamp(-rect.top / distance) : 1;
  }
  if (mode === "pass") {
    return clamp((viewport * 0.85 - rect.top) / rect.height);
  }
  return clamp((viewport - rect.top) / (viewport * 0.45));
}

/* Un solo requestAnimationFrame para todas las animaciones de la página. */
const subscribers = new Set<() => void>();
let frame = 0;

function tick() {
  subscribers.forEach((run) => run());
  frame = subscribers.size ? requestAnimationFrame(tick) : 0;
}

function subscribe(run: () => void) {
  subscribers.add(run);
  if (!frame) frame = requestAnimationFrame(tick);
  return () => {
    subscribers.delete(run);
  };
}

type Options = {
  mode?: ScrollMode;
  /** Valor inicial; si se omite, arranca donde esté el scroll. */
  from?: number;
  /** Transforma el progreso, por ejemplo para usar solo un tramo. Debe ser estable. */
  map?: (progress: number) => number;
  /** Valor fijo cuando el usuario pide reducir el movimiento. */
  reducedValue?: number;
};

/**
 * Llama a `apply` con el progreso suavizado (p += (objetivo - p) * .09).
 * Mide `ref`, así que ese elemento no debe recibir las transformaciones.
 * `apply` debe ser estable (useCallback).
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  apply: (progress: number) => void,
  { mode = "enter", from, map, reducedValue = 1 }: Options = {},
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(reducedValue);
      return;
    }

    const read = () => {
      const progress = readProgress(element, mode);
      return map ? map(progress) : progress;
    };

    let current = from ?? read();
    let last = Number.NaN;

    return subscribe(() => {
      const target = read();
      current += (target - current) * SMOOTHING;
      if (Math.abs(target - current) < SNAP) current = target;
      if (current !== last) {
        last = current;
        apply(current);
      }
    });
  }, [ref, apply, mode, from, map, reducedValue]);
}
