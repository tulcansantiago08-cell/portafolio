type StageHeadlineProps = {
  /** Etiqueta del título: h1 en el inicio, h2 en las demás escenas. */
  as: "h1" | "h2";
  lines: [string, string];
  caption: string;
  /** Lleva la leyenda debajo del titular, para escenas que se detienen en el cruce. */
  captionBelow?: boolean;
};

import { cn } from "@/lib/cn";

const lineClasses =
  "absolute inset-x-0 text-center font-heading text-display leading-none font-normal tracking-display whitespace-nowrap will-change-transform";

/**
 * Titular doble y decoración de la primera imagen de una escena.
 * lib/motion/headline.ts lo anima mediante los atributos data-stage.
 */
export default function StageHeadline({ as: Tag, lines, caption, captionBelow }: StageHeadlineProps) {
  return (
    <>
      <Tag aria-label={lines.join(" ")}>
        <div data-stage="line-1" aria-hidden="true" className={`${lineClasses} top-[calc(50%-.98em)]`}>
          <span className="mr-[15vw] inline-block">{lines[0]}</span>
        </div>
        <div data-stage="line-2" aria-hidden="true" className={`${lineClasses} top-[calc(50%+.03em)]`}>
          <span className="ml-[15vw] inline-block">{lines[1]}</span>
        </div>
      </Tag>
      <p
        data-stage="caption"
        className={cn(
          "absolute left-1/2 w-[15em] -translate-x-1/2 -translate-y-1/2 text-center leading-[1.3] font-medium tracking-[.03em] uppercase",
          captionBelow
            ? "top-[calc(50%+var(--text-display)*1.45)] w-[24em] text-[clamp(11px,1vw,16px)]"
            : "top-1/2 text-[clamp(10px,.8vw,14px)]",
        )}
      >
        {caption}
      </p>
      <div
        data-stage="glow"
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[42%] bg-linear-to-b from-foreground/10 to-transparent"
      />
      <div data-stage="cross" aria-hidden="true" className="absolute inset-x-8 top-[37.5%] h-px bg-border">
        <i className="absolute -top-[.62em] left-1/2 -ml-[.3em] bg-background px-[.3em] font-mono text-[13px] leading-[1.2] text-muted not-italic">
          +
        </i>
      </div>
    </>
  );
}
