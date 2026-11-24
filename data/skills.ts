export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: "Lenguajes", items: ["Kotlin", "Java", "Dart", "TypeScript", "HTML", "CSS"] },
  { category: "Móvil", items: ["Android", "Jetpack Compose", "Wear OS", "Room", "Hilt", "Retrofit"] },
  { category: "Multiplataforma y web", items: ["Flutter", "Next.js", "React", "Tailwind CSS"] },
  { category: "Nube y herramientas", items: ["Firebase", "Git", "GitHub", "GitHub Actions", "Android Studio"] },
];

/** Tecnologías principales que se muestran en "Acerca de mí". */
export const mainSkills: string[] = ["Kotlin", "Jetpack Compose", "Firebase", "Java", "Flutter", "Next.js", "Git"];
