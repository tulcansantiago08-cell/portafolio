// Cada lista va de lo más reciente a lo más antiguo.

export type ExperienceItem = {
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  description: string;
};

export const academicExperience: ExperienceItem[] = [
  {
    title: "Ingeniería de Software",
    place: "Universidad Cooperativa de Colombia, Campus Pasto",
    startDate: "2024",
    endDate: "Actualidad",
    description:
      "Quinto semestre. Programación, patrones de diseño, estructuras de datos, bases de datos y desarrollo de aplicaciones móviles y web.",
  },
];

export const workExperience: ExperienceItem[] = [
  {
    title: "Desarrollador de aplicaciones móviles y web",
    place: "Proyectos académicos y personales",
    startDate: "2024",
    endDate: "Actualidad",
    description:
      "Diseño y desarrollo de apps completas para Android, Wear OS y macOS, integrando Firebase, mapas e IA, con control de versiones en Git y pruebas automatizadas en GitHub Actions.",
  },
];
