export type NavItem = {
  label: string;
  href: `#${string}`;
};

/** Mismo orden en que aparecen las secciones en app/page.tsx. */
export const navigation: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
  { label: "Habilidades", href: "#habilidades" },
];
