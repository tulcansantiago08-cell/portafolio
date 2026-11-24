import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const fieldClasses =
  "w-full rounded-control border border-border bg-background px-4 py-3 text-sm placeholder:text-muted";

export default function Input({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(fieldClasses, className)} />;
}
