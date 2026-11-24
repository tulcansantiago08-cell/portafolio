import { mix, out, span } from "./math";

/** Línea de tiempo del titular doble (ver StageHeadline). */
export function applyHeadline(root: HTMLElement, p: number) {
  const rise = (1 - out(span(p, 0, 0.12))) * 34;
  const run = mix(-50, 76, span(p, 0, 0.58));
  const intro = String(1 - span(p, 0, 0.05));
  // Al final del recorrido se ocultan para que ningún nombre largo asome por el borde.
  const lineOpacity = String(1 - span(p, 0.56, 0.58));

  const set = (name: string, write: (style: CSSStyleDeclaration) => void) => {
    const element = root.querySelector<HTMLElement>(`[data-stage="${name}"]`);
    if (element) write(element.style);
  };

  set("line-1", (s) => {
    s.transform = `translate3d(${run}vw,${rise}vh,0)`;
    s.opacity = lineOpacity;
  });
  set("line-2", (s) => {
    s.transform = `translate3d(${-run}vw,${rise}vh,0)`;
    s.opacity = lineOpacity;
  });
  set("caption", (s) => {
    s.opacity = String(1 - span(p, 0.52, 0.57));
    s.transform = `translate(-50%,calc(-50% + ${rise}vh))`;
  });
  set("glow", (s) => (s.opacity = intro));
  set("cross", (s) => (s.opacity = intro));
}
