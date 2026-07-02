"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeOnly, fadeUp, staggerContainer, STAGGER } from "@/lib/animations";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    body: "We interrogate the brief until it confesses. Positioning, audience, ambition — before a single pixel moves.",
    accent: "text-emerald-400",
  },
  {
    number: "02",
    title: "Design",
    body: "Direction, identity, and interaction designed together. Motion is decided here, not bolted on later.",
    accent: "text-cyan-400",
  },
  {
    number: "03",
    title: "Build",
    body: "Production-grade engineering — 60fps animation, obsessive performance budgets, zero jank tolerated.",
    accent: "text-violet-400",
  },
  {
    number: "04",
    title: "Launch",
    body: "We ship, measure, and tune. A Kassora site leaves the building alive and stays that way.",
    accent: "text-amber-400",
  },
];

/**
 * The studio process as four sequenced steps. Each step fades, sharpens from
 * a blur, and rises into place, staggered ~0.13s apart via a Framer Motion
 * orchestrated container.
 */
export default function Process() {
  const reduced = useReducedMotion();

  return (
    <section id="process" className="relative border-t border-zinc-900 py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-violet-400">
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
              variants={reduced ? fadeOnly : fadeUp}
              className="relative will-change-transform"
            >
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
