"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";
import { AnimatedSection, SectionHeading } from "@/components/animations/AnimatedSection";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const numericPart = parseInt(value.replace(/\D/g, ""), 10);
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * numericPart);
            setDisplay(String(current));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericPart]);

  return (
    <span ref={ref}>
      {display}
      {hasPlus && "+"}
      {hasPercent && "%"}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <AnimatedSection className="section-padding bg-white" id="stats">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Our Impact"
          title="Numbers That Reflect Trust & Transformation"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-2xl border border-border/60 bg-gradient-to-b from-hope-50/50 to-white p-8 transition-shadow hover:shadow-md"
            >
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text">
                <AnimatedCounter value={stat.value} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
