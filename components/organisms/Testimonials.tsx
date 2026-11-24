import FlyIn from "@/components/molecules/FlyIn";
import SectionHeader from "@/components/molecules/SectionHeader";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import SectionTemplate from "@/components/templates/SectionTemplate";
import { testimonials } from "@/data/testimonials";

/* Como en la cuadrícula de proyectos: las de los extremos llegan desde los lados. */
const COLUMNS = 3;

export default function Testimonials() {
  return (
    <SectionTemplate id="testimonios" alternate>
      <SectionHeader lines={["MIS", "TESTIMONIOS"]} description="Lo que dicen quienes han trabajado conmigo." />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => {
          const side = (index % COLUMNS) - 1;
          return (
            <FlyIn key={testimonial.name} x={side * 34} y={side === 0 ? 40 : 14} tilt={side * 5 || 3}>
              <TestimonialCard testimonial={testimonial} />
            </FlyIn>
          );
        })}
      </div>
    </SectionTemplate>
  );
}
