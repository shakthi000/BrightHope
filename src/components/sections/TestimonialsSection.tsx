import Link from "next/link";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import {
  AnimatedSection,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";

export function TestimonialsSection() {
  return (
    <AnimatedSection className="section-padding premium-gradient" id="testimonials">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Client Stories"
          title="Voices of Transformation"
          description="Real experiences from individuals and families who found hope and healing with us."
        />

        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <article className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm h-full flex flex-col">
                <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold-400 text-gold-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="flex-1">
                  <p className="font-serif text-lg italic text-hope-800 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <footer className="mt-6 pt-6 border-t border-border/40">
                  <cite className="not-italic">
                    <span className="font-semibold text-hope-900">
                      {testimonial.author}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-0.5">
                      {testimonial.location}
                    </span>
                  </cite>
                </footer>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 text-center">
          <Link href="/testimonials">
            <Button variant="outline">Read More Stories</Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
