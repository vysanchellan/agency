"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/animations/TiltCard";
import { cn } from "@/lib/utils";

type Capability = {
  title: string;
  blurb: string;
  span: string;
  glow: string;
  accent: string;
  /** Reveal delay — deliberately non-uniform so the grid fills organically. */
  delay: number;
};

const CAPABILITIES: Capability[] = [
  {
    title: "Brand Identity",
    blurb:
      "Identities engineered to move — logo systems, voice, and worlds a brand can actually live in.",
    span: "md:col-span-4 md:row-span-2",
    glow: "from-emerald-500/25",
    accent: "bg-emerald-400",
    delay: 0,
  },
  {
    title: "Web Experience Design",
    blurb: "Websites people describe to their friends. That's the metric.",
    span: "md:col-span-2",
    glow: "from-cyan-500/25",
    accent: "bg-cyan-400",
    delay: 0.14,
  },
  {
    title: "Product Design",
    blurb: "Interfaces that feel inevitable — from first flow to final polish.",
    span: "md:col-span-2",
    glow: "from-violet-500/25",
    accent: "bg-violet-400",
    delay: 0.07,
  },
  {
    title: "Motion & Interaction",
    blurb:
      "Choreography for the cursor. Every hover, scroll, and transition on purpose.",
    span: "md:col-span-2",
    glow: "from-amber-500/25",
    accent: "bg-amber-400",
    delay: 0.2,
  },
  {
    title: "3D & WebGL",
    blurb:
      "Real-time graphics in the browser — shaders, scenes, and objects with presence.",
    span: "md:col-span-4",
    glow: "from-cyan-500/20",
    accent: "bg-teal-400",
    delay: 0.11,
  },
  {
    title: "Design Systems",
    blurb: "The boring superpower: consistency that scales with your team.",
    span: "md:col-span-2",
    glow: "from-violet-500/20",
    accent: "bg-fuchsia-400",
    delay: 0.25,
  },
];

/**
 * Bento grid of studio capabilities. Cells vary in span for hierarchy and
 * reveal with intentionally uneven delays so the grid cascades in organically
 * rather than as one uniform block.
 */
export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
            Capabilities
          </p>
          <h2 className="mb-16 max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 md:mb-20 md:text-6xl">
            Three disciplines. One obsession with motion.
          </h2>
        </ScrollReveal>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {CAPABILITIES.map((cap) => (
            <ScrollReveal key={cap.title} delay={cap.delay} className={cap.span}>
              <TiltCard maxTilt={5} className="h-full">
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900/50 p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-zinc-900/80">
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -top-1/2 -right-1/4 h-full w-2/3 rounded-full bg-gradient-to-b to-transparent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100",
                      cap.glow,
                    )}
                  />
                  <span
                    className={cn("mb-6 inline-block h-2 w-2 rounded-full", cap.accent)}
                  />
                  <div>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-zinc-50 md:text-2xl">
                      {cap.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {cap.blurb}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
