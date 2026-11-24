import ProgressBar from "@/components/atoms/ProgressBar";
import type { Skill } from "@/data/skills";

export default function SkillMeter({ skill }: { skill: Skill }) {
  return (
    <div className="grid gap-2">
      <div className="flex justify-between text-sm font-medium">
        <span>{skill.name}</span>
        <span className="text-muted">{skill.level}%</span>
      </div>
      <ProgressBar value={skill.level} label={`Nivel de ${skill.name}`} />
    </div>
  );
}
