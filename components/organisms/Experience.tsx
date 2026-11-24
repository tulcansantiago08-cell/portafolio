import Heading from "@/components/atoms/Heading";
import FlyIn from "@/components/molecules/FlyIn";
import SectionHeader from "@/components/molecules/SectionHeader";
import Timeline from "@/components/molecules/Timeline";
import SectionTemplate from "@/components/templates/SectionTemplate";
import { academicExperience, workExperience } from "@/data/experience";

export default function Experience() {
  return (
    <SectionTemplate id="experiencia">
      <SectionHeader lines={["EXPERIENCIA", "ACADÉMICA Y LABORAL"]} />
      <div className="grid gap-12 md:grid-cols-2">
        <FlyIn x={-24}>
          <Heading level={3} className="mb-6">
            Experiencia académica
          </Heading>
          <Timeline items={academicExperience} />
        </FlyIn>
        <FlyIn x={24}>
          <Heading level={3} className="mb-6">
            Experiencia laboral
          </Heading>
          <Timeline items={workExperience} />
        </FlyIn>
      </div>
    </SectionTemplate>
  );
}
