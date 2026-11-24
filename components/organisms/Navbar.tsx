"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import Icon from "@/components/atoms/Icon";
import NavLinks from "@/components/molecules/NavLinks";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur">
      <Container>
        <nav aria-label="Principal" className="flex h-16 items-center justify-between gap-6">
          <a href="#inicio" aria-label={`${profile.name}: ir al inicio`} className="text-lg font-semibold tracking-[.09em]">
            {profile.initials}
          </a>

          <NavLinks items={navigation} className="hidden gap-6 lg:flex" />

          <div className="flex items-center gap-2 lg:hidden">
            <Button href="#contacto" variant="secondary">
              Hablemos
            </Button>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="menu-movil"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="grid size-9 place-items-center rounded-control border border-foreground/55"
            >
              <Icon name={isOpen ? "close" : "menu"} className="size-4" />
            </button>
          </div>
        </nav>

        {isOpen && (
          <div id="menu-movil" className="pb-6 lg:hidden">
            <NavLinks items={navigation} className="flex-col gap-4" onNavigate={() => setIsOpen(false)} />
          </div>
        )}
      </Container>
    </header>
  );
}
