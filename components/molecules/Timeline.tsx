import DrawLine from "@/components/atoms/DrawLine";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import type { ExperienceItem } from "@/data/experience";

export default function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="relative">
      <DrawLine vertical className="absolute inset-y-0 left-0" />
      <ol>
        {items.map((item) => (
          <li key={`${item.title}-${item.place}`} className="relative mb-8 ml-6 last:mb-0">
            <span aria-hidden="true" className="absolute -left-[28px] top-1.5 size-2.5 rounded-full bg-primary" />
            <Text variant="small">
              {item.startDate} – {item.endDate}
            </Text>
            <Heading level={3} className="mt-1">
              {item.title}
            </Heading>
            <p className="font-medium">{item.place}</p>
            <Text variant="muted" className="mt-2">
              {item.description}
            </Text>
          </li>
        ))}
      </ol>
    </div>
  );
}
