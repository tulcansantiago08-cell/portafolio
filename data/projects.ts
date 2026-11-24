// TEXTO DE EJEMPLO: reemplázalo con tus proyectos.
// El portafolio presenta 4 proyectos: la animación muestra una tarjeta por cada uno.
//
// IMPORTANTE: los videos de ejemplo son de otra persona y solo sirven para ver
// la animación. Antes de entregar, cámbialos por videos o capturas de tus proyectos.

export type Project = {
  title: string;
  description: string;
  /** Captura del proyecto. También se usa en la cinta si no hay video. */
  image: string;
  /** Video opcional para la cinta animada. Debe permitir CORS si es de otro dominio. */
  video?: string;
  tags: string[];
  github: string;
  demo: string;
};

const SAMPLE_VIDEOS = "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev";
const description = "Describe en una o dos líneas qué hace el proyecto y qué problema resuelve.";

export const projects: Project[] = [
  {
    title: "Proyecto de ejemplo 1",
    description,
    image: "/images/placeholder-project.svg",
    video: `${SAMPLE_VIDEOS}/designs/roadster-3d-car-landing.mp4`,
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/tu-usuario/proyecto-1",
    demo: "https://proyecto-1.vercel.app",
  },
  {
    title: "Proyecto de ejemplo 2",
    description,
    image: "/images/placeholder-project.svg",
    video: `${SAMPLE_VIDEOS}/aaaf/living-portrait-hero.mp4`,
    tags: ["React", "CSS"],
    github: "https://github.com/tu-usuario/proyecto-2",
    demo: "https://proyecto-2.vercel.app",
  },
  {
    title: "Proyecto de ejemplo 3",
    description,
    image: "/images/placeholder-project.svg",
    video: `${SAMPLE_VIDEOS}/aaaf/oraciteslArea.mp4`,
    tags: ["HTML", "JavaScript"],
    github: "https://github.com/tu-usuario/proyecto-3",
    demo: "https://proyecto-3.vercel.app",
  },
  {
    title: "Proyecto de ejemplo 4",
    description,
    image: "/images/placeholder-project.svg",
    video: `${SAMPLE_VIDEOS}/aaaf/medusa-jellyfish-hero.mp4`,
    tags: ["Three.js", "WebGL"],
    github: "https://github.com/tu-usuario/proyecto-4",
    demo: "https://proyecto-4.vercel.app",
  },
];
