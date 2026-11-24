import Avatar from "@/components/atoms/Avatar";
import Heading from "@/components/atoms/Heading";
import Tag from "@/components/atoms/Tag";
import Text from "@/components/atoms/Text";
import FactList from "@/components/molecules/FactList";
import FlyIn from "@/components/molecules/FlyIn";
import SectionHeader from "@/components/molecules/SectionHeader";
import SectionTemplate from "@/components/templates/SectionTemplate";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";

export default function About() {
  return (
    <SectionTemplate id="sobre-mi">
      <SectionHeader lines={["ACERCA", "DE MÍ"]} />
      <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
        <FlyIn x={-30} tilt={-6} className="justify-self-center">
          <Avatar name={profile.name} initials={profile.initials} src={profile.photo} size="lg" />
        </FlyIn>
        <FlyIn x={30} tilt={3} className="grid gap-8">
          <div className="grid gap-8">
            <div className="grid gap-4">
              {profile.about.map((paragraph) => (
                <Text key={paragraph}>{paragraph}</Text>
              ))}
            </div>
            <FactList facts={profile.facts} />
            <div>
              <Heading level={3}>Tecnologías que manejo</Heading>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Tag key={skill.name}>{skill.name}</Tag>
                ))}
              </div>
            </div>
          </div>
        </FlyIn>
      </div>
    </SectionTemplate>
  );
}
