import SectionHeader from "@/components/molecules/SectionHeader";
import SkillMeter from "@/components/molecules/SkillMeter";
import SectionTemplate from "@/components/templates/SectionTemplate";
import { skills } from "@/data/skills";

/** Sección adicional: se puede cambiar por otra, siempre antes del pie de página. */
export default function Skills() {
  return (
    <SectionTemplate id="habilidades">
      <SectionHeader lines={["MIS", "HABILIDADES"]} description="Mi nivel en las tecnologías que uso." />
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {skills.map((skill) => (
          <SkillMeter key={skill.name} skill={skill} />
        ))}
      </div>
    </SectionTemplate>
  );
}
