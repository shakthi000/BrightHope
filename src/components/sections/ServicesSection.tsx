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
import { SERVICES } from "@/lib/constants";
import {
  AnimatedSection,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  User,
  Heart,
  Shield,
  Users,
  GraduationCap,
  BookOpen,
};

function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  const Icon = iconMap[icon] || User;

  return (
    <div className="group relative rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-hope-200 hover:-translate-y-1">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hope-100 to-hope-50 text-hope-600 transition-colors group-hover:from-hope-500 group-hover:to-hope-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-semibold text-hope-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function ServicesSection() {
  return (
    <AnimatedSection className="section-padding bg-white" id="services">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Our Services"
          title="Comprehensive Support for Every Journey"
          description="From individual counselling to academic coaching, we offer tailored support designed to meet your unique needs."
        />

        <div className="mb-12">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-600 mb-6">
            Counselling Services
          </h3>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.counselling.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-600 mb-6">
            Academic Services
          </h3>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {SERVICES.academic.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-12 text-center">
          <Link href="/services">
            <Button variant="default" size="lg">
              View All Services
              <ArrowRight className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
