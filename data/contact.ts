// TEXTO DE EJEMPLO: reemplázalo con tus datos.
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
  { label: "GitHub", href: "https://github.com/tu-usuario", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tu-usuario", icon: "linkedin" },
];

export const contactChannels: ContactChannel[] = [
  { label: "Correo", value: "correo@ejemplo.com", href: "mailto:correo@ejemplo.com", icon: "mail" },
  { label: "LinkedIn", value: "linkedin.com/in/tu-usuario", href: "https://linkedin.com/in/tu-usuario", icon: "linkedin" },
  { label: "GitHub", value: "github.com/tu-usuario", href: "https://github.com/tu-usuario", icon: "github" },
  { label: "Teléfono (opcional)", value: "+00 000 000 0000", href: "tel:+000000000000", icon: "phone" },
];

/**
 * URL del servicio que envía el formulario, por ejemplo Formspree:
 * "https://formspree.io/f/tu-id". Mientras esté vacía, el formulario
 * avisa que es de ejemplo y no envía nada.
 */
export const contactFormEndpoint = "";
