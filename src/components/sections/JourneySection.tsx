import { JOURNEY_STEPS } from "@/lib/constants";
import {
  AnimatedSection,
  SectionHeading,
} from "@/components/animations/AnimatedSection";

export function JourneySection() {
  return (
    <AnimatedSection className="section-padding premium-gradient" id="journey">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Your Transformation Journey"
          title="From First Step to Lasting Change"
          description="Every journey begins with a single step. Here is how we walk alongside you."
        />

        <div className="relative">
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-hope-300 via-gold-400 to-hope-300 md:-translate-x-px hidden sm:block"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {JOURNEY_STEPS.map((step, index) => (
              <div
                key={step.step}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="md:w-1/2 md:text-right flex md:justify-end">
                  <div
                    className={`max-w-sm ${
                      index % 2 === 0 ? "md:ml-auto md:text-right" : "md:mr-auto md:text-left"
                    } ${index % 2 !== 0 ? "md:order-2" : ""}`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                      Step {step.step}
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-hope-900 mt-1">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-hope-400 shadow-lg z-10 hidden sm:flex"
                  aria-hidden="true"
                >
                  <span className="font-display text-xl font-bold text-hope-600">
                    {step.step}
                  </span>
                </div>

                <div className="md:w-1/2" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
