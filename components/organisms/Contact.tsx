import ContactChannelList from "@/components/molecules/ContactChannelList";
import FlyIn from "@/components/molecules/FlyIn";
import SectionHeader from "@/components/molecules/SectionHeader";
import ContactForm from "@/components/organisms/ContactForm";
import SectionTemplate from "@/components/templates/SectionTemplate";
import { contactChannels } from "@/data/contact";

export default function Contact() {
  return (
    <SectionTemplate id="contacto" alternate>
      <SectionHeader lines={["MIS", "CONTACTOS"]} description="Escríbeme por el formulario o por cualquiera de estos medios." />
      <div className="grid gap-12 md:grid-cols-2">
        <FlyIn x={-24}>
          <ContactChannelList channels={contactChannels} />
        </FlyIn>
        <FlyIn x={24}>
          <ContactForm />
        </FlyIn>
      </div>
    </SectionTemplate>
  );
}
