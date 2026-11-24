import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3;

const sizes: Record<Level, string> = {
  1: "text-display font-normal tracking-display",
  2: "text-section font-normal tracking-display",
  3: "text-lg font-medium",
};

type HeadingProps = {
  level: Level;
  children: ReactNode;
  className?: string;
};

export default function Heading({ level, children, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn("font-heading", sizes[level], className)}>{children}</Tag>;
}
