import type { NavItem } from "@/data/navigation";
import { cn } from "@/lib/cn";

type NavLinksProps = {
  items: NavItem[];
  className?: string;
  /** Se ejecuta al elegir un enlace, por ejemplo para cerrar el menú móvil. */
  onNavigate?: () => void;
};

export default function NavLinks({ items, className, onNavigate }: NavLinksProps) {
  return (
    <ul className={cn("flex font-mono text-[11.5px] tracking-label uppercase", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} onClick={onNavigate} className="text-muted transition hover:text-foreground">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
