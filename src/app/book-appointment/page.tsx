import type { Metadata } from "next";
import { Calendar, Clock, Shield } from "lucide-react";
import { SITE } from "@/lib/constants";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

export const metadata: Metadata = createMetadata({
  title: "Book Appointment",
  description:
    "Book a counselling or coaching appointment with Bright Hope Counselling & Coaching Centre in Chennai. Choose your service, date and time.",
  path: "/book-appointment",
});

export default function BookAppointmentPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    { name: "Book Appointment", url: `${SITE.url}/book-appointment` },
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
            Book Appointment
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-hope-950 text-balance">
            Begin Your Journey Today
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Fill in the details below and we will confirm your appointment shortly.
            All information is kept strictly confidential.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow max-w-2xl">
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Calendar, label: "Choose Date & Time" },
              { icon: Shield, label: "100% Confidential" },
              { icon: Clock, label: "Quick Confirmation" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border/60 p-4 text-center"
              >
                <item.icon className="h-5 w-5 text-hope-600" aria-hidden="true" />
                <span className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm">
            <AppointmentForm />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
