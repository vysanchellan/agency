"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Crosshair,
  Palette,
  Hammer,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  fadeOnly,
  fadeUp,
  fadeUpLite,
  staggerContainer,
  STAGGER,
} from "@/lib/animations";
import { useCoarsePointer } from "@/lib/hooks";

const STEPS: Array<{
  number: string;
  title: string;
  body: string;
  accent: string;
  icon: LucideIcon;
  iconColor: string;
}> = [
  {
    number: "01",
    title: "Discover",
    body: "We interrogate the brief until it confesses. Positioning, audience, ambition — before a single pixel moves.",
    accent: "text-gold",
    icon: Crosshair,
    iconColor: "text-gold/20",
  },
  {
    number: "02",
    title: "Design",
    body: "Brand, interaction, and conversion architecture designed together. Every pixel has a job: convert.",
    accent: "text-brand-indigo-bright",
    icon: Palette,
    iconColor: "text-brand-indigo-bright/20",
  },
  {
    number: "03",
    title: "Build",
    body: "Full-stack execution at velocity — production-grade engineering, obsessive performance budgets, zero jank.",
    accent: "text-gold-bright",
    icon: Hammer,
    iconColor: "text-gold-bright/20",
  },
  {
    number: "04",
    title: "Launch",
    body: "48-hour launch turnaround, then we measure and tune. Continuous A/B experiments compound the gains.",
    accent: "text-amber-400",
    icon: Rocket,
    iconColor: "text-amber-400/20",
  },
];

/**
 * The studio process as four sequenced steps. Each step fades, sharpens from
 * a blur, and rises into place, staggered ~0.13s apart via a Framer Motion
 * orchestrated container.
 */
export default function Process() {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

  return (
    <section id="process" className="relative border-t border-zinc-900 py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Process
          </p>
          <h2 className="mb-16 max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 md:mb-24 md:text-6xl">
            Four steps. No mystery, all method.
          </h2>
        </ScrollReveal>

        <motion.ol
          variants={staggerContainer(STAGGER.steps)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8"
        >
          {STEPS.map((step) => (
              <motion.li
                key={step.number}
                variants={reduced ? fadeOnly : coarse ? fadeUpLite : fadeUp}
                className="group relative will-change-transform"
              >
                <step.icon
                  aria-hidden
                  className={cn(
                    "absolute -top-3 -right-3 h-28 w-28 transition-all duration-700 group-hover:scale-110",
                    step.iconColor,
                  )}
                  strokeWidth={1}
                />
                <span
                  className={`font-mono text-sm font-semibold tracking-widest ${step.accent}`}
                >
                  {step.number}
                </span>
                <div className="mt-4 mb-5 h-px w-full bg-gradient-to-r from-zinc-700 to-transparent" />
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-zinc-50">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
              </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
