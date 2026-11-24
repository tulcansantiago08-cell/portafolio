// TEXTO DE EJEMPLO: reemplázalo con testimonios reales (mínimo 3).

export type Testimonial = {
  name: string;
  initials: string;
  role: string;
  text: string;
  /** Ruta de la foto. Si no hay, se muestran las iniciales. */
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Persona de ejemplo 1",
    initials: "P1",
    role: "Profesor/a",
    text: "Texto de ejemplo: aquí va la opinión de esta persona sobre tu trabajo.",
  },
  {
    name: "Persona de ejemplo 2",
    initials: "P2",
    role: "Compañero/a",
    text: "Texto de ejemplo: aquí va la opinión de esta persona sobre tu trabajo.",
  },
  {
    name: "Persona de ejemplo 3",
    initials: "P3",
    role: "Cliente",
    text: "Texto de ejemplo: aquí va la opinión de esta persona sobre tu trabajo.",
  },
];
