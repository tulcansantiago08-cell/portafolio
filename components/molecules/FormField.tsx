import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  /** Debe coincidir con el `id` del campo que recibe. */
  htmlFor: string;
  children: ReactNode;
};

export default function FormField({ label, htmlFor, children }: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
