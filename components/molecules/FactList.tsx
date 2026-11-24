import type { QuickFact } from "@/data/profile";

export default function FactList({ facts }: { facts: QuickFact[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="text-sm text-muted">{fact.label}</dt>
          <dd className="font-semibold">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
