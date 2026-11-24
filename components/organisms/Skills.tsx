import SectionHeader from "@/components/molecules/SectionHeader";
import SectionTemplate from "@/components/templates/SectionTemplate";
import { skillGroups } from "@/data/skills";

/** Sección adicional: se puede cambiar por otra, siempre antes del pie de página. */
export default function Skills() {
  return (
    <SectionTemplate id="habilidades">
      <SectionHeader lines={["MIS", "HABILIDADES"]} description="Las tecnologías con las que construyo mis proyectos." />
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.category} className="grid content-start gap-4 rounded-card border border-border bg-surface p-6">
            <h3 className="font-mono text-xs uppercase tracking-[var(--tracking-label)] text-muted">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionTemplate>
  );
}
