import type { IconName } from "@/components/atoms/Icon";

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  icon: IconName;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/tulcansantiago08-cell", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/santiago-tulcan-249a91451", icon: "linkedin" },
];

export const contactChannels: ContactChannel[] = [
  { label: "Correo", value: "tulcansantiago08@gmail.com", href: "mailto:tulcansantiago08@gmail.com", icon: "mail" },
  { label: "LinkedIn", value: "linkedin.com/in/santiago-tulcan-249a91451", href: "https://www.linkedin.com/in/santiago-tulcan-249a91451", icon: "linkedin" },
  { label: "GitHub", value: "github.com/tulcansantiago08-cell", href: "https://github.com/tulcansantiago08-cell", icon: "github" },
];

/**
 * URL del servicio que envía el formulario, por ejemplo Formspree:
 * "https://formspree.io/f/tu-id". Mientras esté vacía, el formulario
 * avisa que es de ejemplo y no envía nada.
 */
export const contactFormEndpoint = "";
