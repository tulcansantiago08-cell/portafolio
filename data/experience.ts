// TEXTO DE EJEMPLO: reemplázalo con tu trayectoria.
// Escribe cada lista de lo más reciente a lo más antiguo.

export type ExperienceItem = {
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  description: string;
};

export const academicExperience: ExperienceItem[] = [
  {
    title: "Título o programa de ejemplo",
    place: "Institución de ejemplo",
    startDate: "Año de inicio",
    endDate: "Actualidad",
    description: "Breve descripción de lo que estudias y tus logros.",
  },
  {
    title: "Curso de ejemplo",
    place: "Institución de ejemplo",
    startDate: "Año de inicio",
    endDate: "Año de fin",
    description: "Breve descripción de lo que aprendiste.",
  },
];

export const workExperience: ExperienceItem[] = [
  {
    title: "Cargo de ejemplo",
    place: "Empresa de ejemplo",
    startDate: "Año de inicio",
    endDate: "Actualidad",
    description: "Breve descripción de tus funciones y logros.",
  },
  {
    title: "Práctica o freelance de ejemplo",
    place: "Empresa o cliente de ejemplo",
    startDate: "Año de inicio",
    endDate: "Año de fin",
    description: "Breve descripción de tus funciones y logros.",
  },
];
