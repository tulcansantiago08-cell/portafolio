import type { ReactNode } from "react";
import Container from "@/components/atoms/Container";
import { cn } from "@/lib/cn";

type SectionTemplateProps = {
  id: string;
  children: ReactNode;
  /** Fondo alterno para separar visualmente las secciones. */
  alternate?: boolean;
  className?: string;
};

/**
 * Espaciado y ancho comunes. `scroll-mt` evita que el menú fijo tape el título y
 * `overflow-x-clip` recorta lo que llega volando desde los lados.
 */
export default function SectionTemplate({ id, children, alternate, className }: SectionTemplateProps) {
  return (
    <section id={id} className={cn("scroll-mt-16 overflow-x-clip py-24", alternate && "bg-surface", className)}>
      <Container>{children}</Container>
    </section>
  );
}
