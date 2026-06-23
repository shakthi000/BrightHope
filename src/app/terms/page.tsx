import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms of Service for ${SITE.name}. Please read these terms carefully before using our website and services.`,
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-12 hero-gradient">
        <div className="container-narrow max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-hope-950">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: June 2025
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow max-w-3xl prose prose-lg">
          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the {SITE.name} website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              2. Services
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We provide psychological counselling, mentoring and academic coaching services. Our services are not a substitute for emergency medical or psychiatric care. If you are experiencing a mental health emergency, please contact emergency services immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              3. Appointments
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Appointment requests submitted through our website are subject to confirmation</li>
              <li>Please provide accurate contact information for appointment confirmations</li>
              <li>Cancellations should be made at least 24 hours in advance</li>
              <li>Repeated no-shows may result in restricted booking privileges</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              4. Website Use
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to use our website only for lawful purposes. You may not use our website to transmit harmful, offensive, or spam content. We reserve the right to restrict access to users who violate these terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including text, graphics, logos and images, is the property of {SITE.name} and is protected by applicable intellectual property laws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {SITE.name} shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our liability is limited to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              7. Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
                {SITE.email}
              </a>.
            </p>
          </section>
        </div>
      </AnimatedSection>
    </>
  );
}
