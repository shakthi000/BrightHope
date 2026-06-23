import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { TESTIMONIALS, SITE } from "@/lib/constants";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  AnimatedSection,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createMetadata({
  title: "Testimonials",
  description:
    "Read testimonials from clients who found healing, confidence and transformation through Bright Hope Counselling & Coaching Centre in Chennai.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    { name: "Testimonials", url: `${SITE.url}/testimonials` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="pt-32 pb-16 hero-gradient">
        <div className="container-narrow text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Client Stories
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-hope-950 text-balance">
            Voices of Hope & Transformation
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real experiences from individuals and families who found healing,
            confidence and growth with Bright Hope.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow">
          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <article className="rounded-2xl border border-border/60 bg-gradient-to-b from-hope-50/30 to-white p-8 shadow-sm h-full">
                  <div
                    className="flex gap-1 mb-4"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-gold-400 text-gold-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote>
                    <p className="font-serif text-xl italic text-hope-800 leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>
                  <footer className="mt-6 pt-6 border-t border-border/40">
                    <cite className="not-italic">
                      <span className="font-semibold text-hope-900 text-lg">
                        {testimonial.author}
                      </span>
                      <span className="block text-sm text-muted-foreground mt-1">
                        {testimonial.location}
                      </span>
                    </cite>
                  </footer>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-16 text-center rounded-2xl bg-hope-950 text-white p-12">
            <SectionHeading
              title="Ready to Write Your Own Story?"
              description="Take the first step towards healing and transformation today."
            />
            <Link href="/book-appointment">
              <Button variant="gold" size="lg">
                Book Your Appointment
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
