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

/** Kassora's real service lines, in the studio's own words. */
const CAPABILITIES: Capability[] = [
  {
    title: "Web Development",
    blurb:
      "From landing pages to full product sites — we build, deploy, and iterate at velocity. Full-stack execution, engineered for performance.",
    span: "md:col-span-4 md:row-span-2",
    glow: "from-gold/25",
    accent: "bg-gold",
    delay: 0,
  },
  {
    title: "Brand Strategy",
    blurb:
      "Systematic brand identity built for scale — visual systems, messaging hierarchies, and positioning that sticks.",
    span: "md:col-span-2",
    glow: "from-brand-indigo-bright/25",
    accent: "bg-brand-indigo-bright",
    delay: 0.14,
  },
  {
    title: "Conversion Architecture",
    blurb:
      "Every pixel designed to convert. Funnels engineered through real behavioral data, not guesswork.",
    span: "md:col-span-2",
    glow: "from-gold-bright/25",
    accent: "bg-gold-bright",
    delay: 0.07,
  },
  {
    title: "Mobile Apps",
    blurb:
      "Native-feeling mobile experiences that carry your product everywhere your customers go.",
    span: "md:col-span-2",
    glow: "from-violet-500/25",
    accent: "bg-violet-400",
    delay: 0.2,
  },
  {
    title: "Analytics & SEO",
    blurb:
      "Custom dashboards and analytics pipelines give you signal from the noise, instantly — and search visibility that compounds.",
    span: "md:col-span-4",
    glow: "from-brand-indigo/30",
    accent: "bg-brand-indigo-bright",
    delay: 0.11,
  },
  {
    title: "DevOps & Performance",
    blurb:
      "Infrastructure, integrations, and a 99.9% uptime record. Fast is a feature.",
    span: "md:col-span-2",
    glow: "from-amber-500/20",
    accent: "bg-amber-400",
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-indigo-bright">
            Capabilities
          </p>
          <h2 className="mb-16 max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 md:mb-20 md:text-6xl">
            What we deploy.
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
