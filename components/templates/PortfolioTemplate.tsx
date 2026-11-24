import type { ReactNode } from "react";

type PortfolioTemplateProps = {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

/** Esqueleto de la página: menú, contenido principal y pie. */
export default function PortfolioTemplate({ navbar, footer, children }: PortfolioTemplateProps) {
  return (
    <>
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
