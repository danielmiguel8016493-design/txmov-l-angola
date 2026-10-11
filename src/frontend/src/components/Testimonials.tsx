import { Quote } from "lucide-react";
import { useGetTestimonials } from "../hooks/useQueries";

export default function Testimonials() {
  const { data: testimonials = [] } = useGetTestimonials();

  return (
    <section className="container py-16 md:py-24">
      <h2 className="mb-12 max-w-2xl font-serif text-4xl font-medium tracking-tight">
        What the neighborhood says
      </h2>
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id.toString()}
            className="flex flex-col rounded-2xl border border-espresso/10 p-6"
          >
            <Quote className="h-6 w-6 text-clay" />
            <blockquote className="mt-4 flex-1 leading-relaxed text-espresso">
              {testimonial.quote}
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-cocoa">
              {testimonial.author}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
