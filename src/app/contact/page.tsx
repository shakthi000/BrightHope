import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/constants";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import { AnimatedSection, SectionHeading } from "@/components/animations/AnimatedSection";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Bright Hope Counselling & Coaching Centre in Pammal, Chennai. Call 9962261841 or send us a message.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    { name: "Contact", url: `${SITE.url}/contact` },
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
            Contact Us
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-hope-950 text-balance">
            We Are Here to Listen
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reach out to us for counselling, coaching, or any questions. Our team
            will review your enquiry and get back to you.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <SectionHeading
                eyebrow="Get In Touch"
                title="Contact Information"
                align="left"
              />

              <ul className="space-y-6" role="list">
                <li>
                  <a
                    href={`tel:+91${SITE.phone}`}
                    className="flex items-start gap-4 group"
                    aria-label={`Call ${SITE.phoneFormatted}`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hope-100 text-hope-600 group-hover:bg-hope-500 group-hover:text-white transition-colors">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-hope-900">Phone</p>
                      <p className="text-muted-foreground">{SITE.phoneFormatted}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hope-100 text-hope-600 group-hover:bg-hope-500 group-hover:text-white transition-colors">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-hope-900">Email</p>
                      <p className="text-muted-foreground break-all">{SITE.email}</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hope-100 text-hope-600">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-hope-900">Address</p>
                    <address className="not-italic text-muted-foreground leading-relaxed">
                      {SITE.address.full}
                    </address>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hope-100 text-hope-600">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-hope-900">Hours</p>
                    <p className="text-muted-foreground">
                      Mon – Sat: 9:00 AM – 6:00 PM
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm">
                <h2 className="font-display text-2xl font-semibold text-hope-900 mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
