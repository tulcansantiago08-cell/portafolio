import Avatar from "@/components/atoms/Avatar";
import Text from "@/components/atoms/Text";
import type { Testimonial } from "@/data/testimonials";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col gap-6 rounded-card border border-border bg-background p-6">
      <blockquote className="flex-1">
        <Text>“{testimonial.text}”</Text>
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar name={testimonial.name} initials={testimonial.initials} src={testimonial.photo} />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <Text variant="small">{testimonial.role}</Text>
        </div>
      </figcaption>
    </figure>
  );
}
