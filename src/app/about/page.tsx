import type { Metadata } from "next";
import { Quote, Award, Heart, BookOpen } from "lucide-react";
import { SITE } from "@/lib/constants";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  AnimatedSection,
  SectionHeading,
} from "@/components/animations/AnimatedSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about A Lakshmi, founder of Bright Hope Counselling & Coaching Centre — a cancer survivor, psychological counsellor, and mentor dedicated to transforming lives.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    { name: "About", url: `${SITE.url}/about` },
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
            About Bright Hope
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-hope-950 text-balance">
            A Mission Rooted in Hope & Resilience
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transforming lives through professional counselling, mentoring, and
            education by nurturing emotional well-being and personal empowerment.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow="Our Mission"
                title="Transforming Lives, One Journey at a Time"
                align="left"
              />
              <p className="text-muted-foreground leading-relaxed mb-6">
                To transform lives through professional counselling, mentoring, and
                education by nurturing emotional well-being, resilience,
                self-discovery, academic success, and personal empowerment.
              </p>
              <SectionHeading
                eyebrow="Our Vision"
                title="A World of Emotional Strength"
                align="left"
              />
              <p className="text-muted-foreground leading-relaxed">
                To create a world where individuals and students are equipped with
                the emotional strength, knowledge, confidence, and life skills needed
                to achieve excellence, lead purposeful lives, and positively impact
                their communities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: "Compassionate Care", color: "from-hope-500 to-hope-600" },
                { icon: Award, label: "10+ Years Experience", color: "from-gold-500 to-gold-600" },
                { icon: BookOpen, label: "Academic Expertise", color: "from-hope-400 to-hope-500" },
                { icon: Quote, label: "Trusted Mentor", color: "from-warm-400 to-warm-500" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/60 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white`}
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-hope-800">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding premium-gradient">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-hope-100 to-gold-100 flex items-center justify-center shadow-xl">
              <div className="text-center p-8">
                <div className="mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-hope-500 to-hope-700 shadow-xl">
                  <span className="font-display text-6xl font-bold text-white">AL</span>
                </div>
                <h2 className="font-display text-3xl font-semibold text-hope-900">
                  {SITE.founder.name}
                </h2>
                <p className="mt-2 text-muted-foreground">{SITE.founder.title}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {["Cancer Survivor", "Counsellor", "Mentor", "Academician"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-hope-700"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Founder Story"
                title={`Meet ${SITE.founder.name}`}
                align="left"
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A Lakshmi is a passionate and accomplished Psychological Counsellor
                  dedicated to empowering individuals to rediscover their inner
                  strength and lead fulfilling lives.
                </p>
                <p>
                  She is known for building trust and rapport effortlessly while
                  creating a safe, compassionate, and non-judgmental environment.
                </p>
                <p>
                  As a cancer survivor, she transformed her own journey of resilience
                  into a mission of helping others heal, grow, and find hope. She has
                  successfully supported cancer combatants, students, professionals,
                  homemakers, and individuals from diverse backgrounds.
                </p>
                <p>
                  With more than 10 years of experience in education and student
                  development, she combines psychological insight with educational
                  expertise to deliver holistic support.
                </p>
              </div>

              <blockquote className="mt-8 rounded-2xl border border-hope-200 bg-white/60 p-6">
                <p className="font-serif text-lg italic text-hope-800">
                  &ldquo;{SITE.founder.quote}&rdquo;
                </p>
              </blockquote>

              <Link href="/book-appointment" className="inline-block mt-8">
                <Button variant="gold" size="lg">
                  Book a Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
