"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="container-wide flex h-18 items-center justify-between py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3 mr-2 lg:mr-0 lg:flex-initial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label={`${SITE.name} - Home`}
        >
          <div className="relative flex h-9 w-9 shrink-0 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-hope-500 to-hope-700 shadow-md transition-transform group-hover:scale-105">
            <span className="font-display text-base sm:text-lg font-bold text-white">B</span>
            <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-sm" />
          </div>
          <div className="min-w-0 flex-1 lg:flex-initial">
            <span className="font-display text-sm sm:text-xl font-semibold text-hope-800 block truncate leading-tight">
              Bright Hope
            </span>
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-muted-foreground truncate leading-tight max-[359px]:hidden">
              Counselling & Coaching
            </span>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:+91${SITE.phone}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            aria-label={`Call us at ${SITE.phoneFormatted}`}
          >
            <Phone className="h-4 w-4" />
            <span>{SITE.phoneFormatted}</span>
          </a>
          <Link href="/book-appointment">
            <Button variant="gold" size="default">
              Book Appointment
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden shrink-0 p-2 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="container-wide py-4 space-y-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 px-4">
                <Link href="/book-appointment" className="block">
                  <Button variant="gold" className="w-full">
                    Book Appointment
                  </Button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
