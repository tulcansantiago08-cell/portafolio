import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Icon, { type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "h-9 bg-primary px-4 text-primary-foreground hover:opacity-85",
  secondary:
    "h-9 border border-foreground/55 px-4 text-foreground hover:bg-foreground hover:text-background",
  ghost: "font-mono font-normal text-muted hover:text-foreground",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: IconName;
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
  /** Abre el enlace en otra pestaña. */
  external?: boolean;
  download?: boolean;
};

type NativeButtonProps = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
};

/** Con `href` se renderiza como enlace; sin él, como botón. */
export default function Button(props: LinkProps | NativeButtonProps) {
  const { children, variant = "primary", icon, className } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-control text-xs font-medium tracking-label uppercase transition disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );
  const content = (
    <>
      {icon && <Icon name={icon} className="size-4" />}
      {children}
    </>
  );

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        download={props.download}
        target={props.external ? "_blank" : undefined}
        rel={props.external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={props.type ?? "button"} disabled={props.disabled} className={classes}>
      {content}
    </button>
  );
}
