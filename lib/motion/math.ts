export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** Suaviza inicio y final. */
export const ease = (t: number) => t * t * (3 - 2 * t);
/** Arranca rápido y frena al llegar. */
export const out = (t: number) => 1 - (1 - t) ** 3;
/** Convierte `p` en 0–1 dentro del tramo [a, b]. */
export const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
