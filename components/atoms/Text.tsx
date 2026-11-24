import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "lead" | "body" | "muted" | "small";

const variants: Record<Variant, string> = {
  lead: "text-lg leading-8 text-muted md:text-xl",
  body: "leading-7",
  muted: "leading-7 text-muted",
  small: "text-sm text-muted",
};

type TextProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export default function Text({ children, variant = "body", className }: TextProps) {
  return <p className={cn(variants[variant], className)}>{children}</p>;
}
