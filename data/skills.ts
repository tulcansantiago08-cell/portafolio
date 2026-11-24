// TEXTO DE EJEMPLO: ajusta las habilidades y los niveles a los tuyos.

export type Skill = {
  name: string;
  /** Porcentaje de 0 a 100. */
  level: number;
};

export const skills: Skill[] = [
  { name: "HTML", level: 50 },
  { name: "CSS", level: 50 },
  { name: "TypeScript", level: 50 },
  { name: "React", level: 50 },
  { name: "Next.js", level: 50 },
  { name: "Tailwind CSS", level: 50 },
];
