import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "./Input";

export default function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea rows={5} {...props} className={cn(fieldClasses, className)} />;
}
