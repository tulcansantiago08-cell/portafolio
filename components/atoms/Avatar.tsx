import Image from "next/image";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { box: string; image: string }> = {
  sm: { box: "size-12 text-sm", image: "48px" },
  md: { box: "size-14 text-base", image: "56px" },
  lg: { box: "size-56 text-4xl md:size-72", image: "(min-width: 768px) 288px, 224px" },
};

type AvatarProps = {
  /** Texto alternativo: nombre de la persona. */
  name: string;
  initials: string;
  src?: string;
  size?: Size;
};

/** Muestra la foto o, si no hay, las iniciales. */
export default function Avatar({ name, initials, src, size = "sm" }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface font-semibold",
        sizes[size].box,
      )}
    >
      {src ? (
        <Image src={src} alt={`Foto de ${name}`} fill sizes={sizes[size].image} className="object-cover" />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  );
}
