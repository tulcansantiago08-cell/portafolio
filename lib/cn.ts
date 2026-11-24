/** Une clases de Tailwind e ignora los valores vacíos. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
