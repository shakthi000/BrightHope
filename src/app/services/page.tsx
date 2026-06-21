import type { Metadata } from "next";
import Link from "next/link";
import {
  User,
  Heart,
  Shield,
  Users,
  GraduationCap,
  BookOpen,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, SITE } from "@/lib/constants";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  AnimatedSection,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createMetadata({
  title: "Our Services",
  description:
    "Explore counselling and academic services at Bright Hope — individual counselling, cancer support, relationship counselling, academic coaching, and student counselling in Chennai.",
  path: "/services",
});

const iconMap: Record<string, LucideIcon> = {
  User,
  Heart,
  Shield,
  Users,
  GraduationCap,
  BookOpen,
};

export default function ServicesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    { name: "Services", url: `${SITE.url}/services` },
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
            Our Services
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-hope-950 text-balance">
            Support Tailored to Your Unique Journey
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From emotional healing to academic excellence, our comprehensive services
            are designed to help you thrive in every aspect of life.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="Counselling"
            title="Counselling Services"
            description="Professional psychological support in a safe, compassionate environment."
          />

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {SERVICES.counselling.map((service) => {
              const Icon = iconMap[service.icon] || User;
              return (
                <StaggerItem key={service.id}>
                  <article className="group rounded-2xl border border-border/60 p-8 hover:shadow-lg hover:border-hope-200 transition-all duration-300 h-full">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-hope-100 to-hope-50 text-hope-600 group-hover:from-hope-500 group-hover:to-hope-600 group-hover:text-white transition-colors">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-hope-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link href="/book-appointment">
                      <Button variant="outline" size="sm">
                        Book This Service
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding premium-gradient">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="Academic"
            title="Academic Services"
            description="Empowering students with the tools and emotional support needed for academic success."
          />

          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SERVICES.academic.map((service) => {
              const Icon = iconMap[service.icon] || BookOpen;
              return (
                <StaggerItem key={service.id}>
                  <article className="group rounded-2xl border border-border/60 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-100 to-gold-50 text-gold-600 group-hover:from-gold-500 group-hover:to-gold-600 group-hover:text-white transition-colors">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-hope-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link href="/book-appointment">
                      <Button variant="outline" size="sm">
                        Book This Service
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <div className="mt-16 text-center">
            <Link href="/book-appointment">
              <Button variant="gold" size="lg">
                Book Your Appointment
                <ArrowRight className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
