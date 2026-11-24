import ProgressBar from "@/components/atoms/ProgressBar";
// Ya no se usa: la sección de habilidades muestra etiquetas sin porcentajes.
type Skill = { name: string; level: number };

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
