import { cacheLife } from "next/cache";

/** Año actual. Se guarda en caché porque Cache Components no permite `new Date()` directo. */
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
