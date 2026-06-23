"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS } from "@/lib/constants";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 hero-gradient" aria-hidden="true" /> }
);

const trustIndicators = [
  { icon: Shield, label: "Confidential & Safe" },
  { icon: Award, label: "10+ Years Experience" },
  { icon: Users, label: "500+ Lives Transformed" },
  { icon: Sparkles, label: "Holistic Approach" },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient"
      aria-labelledby="hero-heading"
    >
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />

      <div className="container-wide relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-hope-200 bg-white/60 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-hope-700 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-hope-500 animate-pulse" />
              Journey From Struggle To Hope
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-hope-950 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Guiding You Towards{" "}
            <span className="gradient-text">Healing, Confidence & Growth</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Professional counselling, mentoring and academic guidance to help
            you thrive emotionally, personally and academically.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link href="/book-appointment">
              <Button variant="gold" size="xl">
                Book Appointment
                <ArrowRight className="ml-1" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="xl">
                Explore Services
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {trustIndicators.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 px-4 py-3"
              >
                <item.icon className="h-5 w-5 text-hope-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-medium text-hope-800">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          aria-hidden="true"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-card px-6 py-4 text-center min-w-[140px]"
            >
              <div className="font-display text-2xl font-bold text-hope-700">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-hope-300 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-hope-500" />
        </div>
      </motion.div>
    </section>
  );
}
