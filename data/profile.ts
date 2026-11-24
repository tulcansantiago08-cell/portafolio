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
  name: "Santiago David Rivas Tulcan",
  headline: ["SANTIAGO", "RIVAS"],
  initials: "SR",
  role: "Estudiante de Ingeniería de Software",
  disciplines: ["ANDROID", "FRONTEND", "UX/UI"],
  tagline: "Convierto ideas en aplicaciones claras, útiles y bonitas de usar.",
  photo: "/images/santiago.jpg",
  cvUrl: "/HV-Santiago-Rivas.pdf",
  about: [
    "Soy Santiago, estudiante de quinto semestre de Ingeniería de Software en la Universidad Cooperativa de Colombia. Me apasiona la parte del desarrollo que la gente ve y toca: diseñar interfaces limpias y convertirlas en apps que funcionen bien, en el celular, en el reloj o en el escritorio. Aprendo construyendo proyectos reales, y cada uno me deja algo más que el anterior.",
  ],
  facts: [
    { label: "Ubicación", value: "Pasto, Nariño" },
    { label: "Semestre", value: "5.º semestre" },
    { label: "Universidad", value: "Universidad Cooperativa de Colombia" },
    { label: "Intereses", value: "Diseño de interfaces, videojuegos, música y fotografía" },
  ],
};
