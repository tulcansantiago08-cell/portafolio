import Image from "next/image";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Tag from "@/components/atoms/Tag";
import Text from "@/components/atoms/Text";
import type { Project } from "@/data/projects";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid gap-6 border-b border-border py-8 md:grid-cols-[12rem_1fr_auto] md:items-center">
      <div className="relative aspect-video overflow-hidden rounded-card bg-surface">
        <Image src={project.image} alt={`Captura de ${project.title}`} fill sizes="(min-width: 768px) 192px, 100vw" className="object-cover" />
      </div>
      <div className="grid gap-3">
        <Heading level={3}>{project.title}</Heading>
        <Text variant="muted">{project.description}</Text>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href={project.github} external variant="secondary" icon="github">
          GitHub
        </Button>
        {project.demo && (
          <Button href={project.demo} external icon="external">
            Demo
          </Button>
        )}
      </div>
    </article>
  );
}
