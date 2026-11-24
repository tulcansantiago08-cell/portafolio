import Icon from "@/components/atoms/Icon";
import type { SocialLink } from "@/data/contact";

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <ul className="flex gap-4">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="block text-muted transition hover:text-foreground"
          >
            <Icon name={link.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
