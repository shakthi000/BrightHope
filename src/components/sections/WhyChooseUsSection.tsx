import {
  Sparkles,
  ShieldCheck,
  Sunrise,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";
import {
  AnimatedSection,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AnimatedSection";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  ShieldCheck,
  Sunrise,
  Layers,
};

export function WhyChooseUsSection() {
  return (
    <AnimatedSection className="section-padding bg-hope-950 text-white relative overflow-hidden" id="why-us">
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-hope-600 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold-500 blur-[100px]" />
      </div>

      <div className="container-narrow relative z-10">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="A Sanctuary for Healing & Growth"
          description="We combine professional expertise with genuine compassion to create transformative experiences."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <StaggerItem key={item.title}>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 h-full transition-colors hover:bg-white/10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/20 to-hope-500/20">
                    <Icon className="h-6 w-6 text-gold-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-hope-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
