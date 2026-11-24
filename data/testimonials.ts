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
    name: "Daniela Muñoz",
    initials: "DM",
    role: "Docente",
    text: "Es una persona responsable y dedicada, siempre demuestra interés por aprender y mejorar en cada proyecto.",
  },
  {
    name: "Mateo Guerrero",
    initials: "MG",
    role: "Compañero de clase",
    text: "Tiene facilidad para trabajar en equipo, aporta buenas ideas y busca soluciones cuando se presentan dificultades.",
  },
  {
    name: "Valentina Ortega",
    initials: "VO",
    role: "Compañera de proyecto",
    text: "Es creativo, organizado y atento a los detalles; siempre busca que los resultados sean funcionales y tengan una buena presentación.",
  },
];
