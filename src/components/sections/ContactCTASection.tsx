import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";

export function ContactCTASection() {
  return (
    <AnimatedSection className="section-padding relative overflow-hidden" id="contact-cta">
      <div className="absolute inset-0 bg-gradient-to-br from-hope-600 via-hope-700 to-hope-900" aria-hidden="true" />
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-hope-300 blur-[120px]" />
      </div>

      <div className="container-narrow relative z-10 text-center text-white">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-balance">
          Ready to Begin Your Journey?
        </h2>
        <p className="mt-4 text-lg text-hope-100 max-w-2xl mx-auto leading-relaxed">
          Take the first step towards healing, confidence and growth. We are here
          to walk alongside you every step of the way.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/book-appointment">
            <Button variant="gold" size="xl">
              Book Your Appointment
              <ArrowRight className="ml-1" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <a
            href={`tel:+91${SITE.phone}`}
            className="flex flex-col items-center gap-2 text-hope-100 hover:text-white transition-colors"
            aria-label={`Call ${SITE.phoneFormatted}`}
          >
            <Phone className="h-6 w-6" aria-hidden="true" />
            <span className="text-sm">{SITE.phoneFormatted}</span>
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex flex-col items-center gap-2 text-hope-100 hover:text-white transition-colors break-all"
          >
            <Mail className="h-6 w-6 shrink-0" aria-hidden="true" />
            <span className="text-sm">{SITE.email}</span>
          </a>
          <div className="flex flex-col items-center gap-2 text-hope-100">
            <MapPin className="h-6 w-6" aria-hidden="true" />
            <span className="text-sm text-center">Pammal, Chennai</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
