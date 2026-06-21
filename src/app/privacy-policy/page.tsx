import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE.name}. Learn how we collect, use, and protect your personal information.`,
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="pt-32 pb-12 hero-gradient">
        <div className="container-narrow max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-hope-950">
            Privacy Policy
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
              1. Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {SITE.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Appointment and service preferences</li>
              <li>Messages and communications you send through our contact forms</li>
              <li>Technical data such as IP address, browser type, and device information</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To respond to your inquiries and appointment requests</li>
              <li>To provide counselling and coaching services</li>
              <li>To send appointment confirmations and related communications</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              4. Confidentiality
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All counselling sessions and personal information shared during sessions are treated with strict confidentiality, in accordance with professional ethical standards. Information is only disclosed when required by law or with your explicit consent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              5. Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at {SITE.email}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-hope-900 mb-4">
              7. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
                {SITE.email}
              </a>{" "}
              or call {SITE.phoneFormatted}.
            </p>
          </section>
        </div>
      </AnimatedSection>
    </>
  );
}
