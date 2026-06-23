import Link from "next/link";
import { Quote, Youtube } from "lucide-react";
import { SITE } from "@/lib/constants";
import {
  AnimatedSection,
  SectionHeading,
} from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";

export function FounderSection() {
  return (
    <AnimatedSection className="section-padding premium-gradient" id="founder">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-gradient-to-br from-hope-100 to-gold-100 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-hope-500 to-hope-700 shadow-xl">
                    <span className="font-display text-5xl font-bold text-white">
                      AL
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-hope-900">
                    {SITE.founder.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {SITE.founder.title}
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-gold-400/30 blur-2xl" aria-hidden="true" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-hope-400/20 blur-3xl" aria-hidden="true" />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Meet Our Founder"
              title="A Story of Resilience & Hope"
              align="left"
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {SITE.founder.name} is a passionate and accomplished Psychological
                Counsellor dedicated to empowering individuals to rediscover their
                inner strength and lead fulfilling lives.
              </p>
              <p>
                She is known for building trust and rapport effortlessly while
                creating a safe, compassionate and non-judgmental environment.
              </p>
              <p>
                As a cancer survivor, she transformed her own journey of resilience
                into a mission of helping others heal, grow and find hope. She has
                successfully supported cancer combatants, students, professionals,
                homemakers and individuals from diverse backgrounds.
              </p>
              <p>
                With more than 10 years of experience in education and student
                development, she combines psychological insight with educational
                expertise.
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-hope-700 mb-3">
                Qualifications
              </h4>
              <ul className="space-y-2" role="list">
                {SITE.founder.qualifications.map((qualification) => (
                  <li
                    key={qualification}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hope-500" aria-hidden="true" />
                    <span>{qualification}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hope-500" aria-hidden="true" />
                  <a
                    href={SITE.founder.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-hope-700 hover:text-hope-900 transition-colors font-medium"
                  >
                    <Youtube className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      Content Creator | {SITE.founder.youtube.channel}
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <blockquote className="mt-8 relative rounded-2xl border border-hope-200 bg-white/60 p-6 backdrop-blur-sm">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-hope-200" aria-hidden="true" />
              <p className="font-serif text-lg italic text-hope-800 leading-relaxed">
                &ldquo;{SITE.founder.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm font-medium text-hope-600">
                — {SITE.founder.name}
              </footer>
            </blockquote>

            <Link href="/about" className="inline-block mt-8">
              <Button variant="outline">Read Full Story</Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
