// TEXTO DE EJEMPLO: reemplázalo con tus datos.

export type QuickFact = {
  label: string;
  value: string;
};

export type Profile = {
  name: string;
  /** Las dos líneas del titular animado del inicio. */
  headline: [string, string];
  initials: string;
  role: string;
  disciplines: string[];
  tagline: string;
  photo: string;
  cvUrl: string;
  about: string[];
  facts: QuickFact[];
};

export const profile: Profile = {
  name: "Nombre Apellido",
  headline: ["NOMBRE", "APELLIDO"],
  initials: "NA",
  role: "Tu rol o perfil profesional",
  disciplines: ["DISEÑO", "FRONTEND", "UX/UI"],
  tagline: "Una frase corta que describa qué haces y qué te motiva.",
  photo: "/images/placeholder-avatar.svg",
  cvUrl: "/cv.pdf",
  about: [
    "Texto de ejemplo: cuenta en primera persona quién eres, qué estudias y qué te apasiona. La guía recomienda de 3 a 5 líneas, que se puedan leer en unos 20 segundos.",
  ],
  facts: [
    { label: "Ubicación", value: "Tu ciudad" },
    { label: "Semestre", value: "Tu semestre" },
    { label: "Intereses", value: "Tus intereses" },
  ],
};
