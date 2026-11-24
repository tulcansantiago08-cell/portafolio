import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import CurrentYear from "@/components/atoms/CurrentYear";
import Text from "@/components/atoms/Text";
import NavLinks from "@/components/molecules/NavLinks";
import SocialLinks from "@/components/molecules/SocialLinks";
import { socialLinks } from "@/data/contact";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-border py-10">
      <Container className="grid gap-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <NavLinks items={navigation} className="flex-wrap gap-x-6 gap-y-2" />
          <SocialLinks links={socialLinks} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Text variant="small">
              © <CurrentYear /> {profile.name}
            </Text>
            <Text variant="small">Hecho con Next.js y Tailwind CSS</Text>
          </div>
          <Button href="#inicio" variant="ghost" icon="arrow-up">
            Volver arriba
          </Button>
        </div>
      </Container>
    </footer>
  );
}
