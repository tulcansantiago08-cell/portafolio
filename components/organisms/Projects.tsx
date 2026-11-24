import Container from "@/components/atoms/Container";
import Text from "@/components/atoms/Text";
import ProjectRow from "@/components/molecules/ProjectRow";
import ProjectsRibbon from "@/components/organisms/ProjectsRibbon";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="proyectos">
      <ProjectsRibbon />
      <Container className="py-20">
        <Text variant="muted" className="mb-6 font-mono text-xs tracking-label uppercase">
          Detalle de cada proyecto
        </Text>
        <div className="border-t border-border">
          {projects.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
