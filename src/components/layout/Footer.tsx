import Link from "next/link";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hope-950 text-hope-100" role="contentinfo">
      <div className="container-wide section-padding pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-hope-500 to-gold-500">
                <span className="font-display text-lg font-bold text-white">B</span>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-white">
                  Bright Hope
                </h2>
                <p className="text-xs text-hope-300">Counselling & Coaching</p>
              </div>
            </div>
            <p className="text-sm text-hope-300 leading-relaxed">
              Transforming lives through professional counselling, mentoring and
              education — nurturing emotional well-being and personal empowerment.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-hope-300 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book-appointment"
                  className="text-sm text-gold-400 hover:text-gold-300 transition-colors font-medium"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`tel:+91${SITE.phone}`}
                  className="flex items-start gap-3 text-sm text-hope-300 hover:text-white transition-colors"
                  aria-label={`Call ${SITE.phoneFormatted}`}
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  {SITE.phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-3 text-sm text-hope-300 hover:text-white transition-colors break-all"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-hope-300">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <address className="not-italic leading-relaxed">
                  {SITE.address.full}
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-hope-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-hope-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-hope-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-hope-400">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-hope-400">
            Made with <Heart className="h-3.5 w-3.5 text-gold-400 fill-gold-400" aria-hidden="true" /> for healing & hope
          </p>
        </div>
      </div>
    </footer>
  );
}
