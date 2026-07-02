"use client";

import CountUp from "@/components/animations/CountUp";
import Parallax from "@/components/animations/Parallax";
import ScrollReveal from "@/components/animations/ScrollReveal";

const STATS = [
  { value: 300, suffix: "%", decimals: 0, label: "Avg. pipeline growth" },
  { value: 48, suffix: "h", decimals: 0, label: "Launch turnaround" },
  { value: 99.9, suffix: "%", decimals: 1, label: "System uptime" },
  { value: 24, suffix: "h", decimals: 0, label: "Response time" },
];

/**
 * Studio numbers, counted up from zero on entry. The gradient backdrop sits
 * inside a Parallax wrapper moving slower than the stats themselves, so the
 * section reads with depth as it scrolls past.
 */
export default function Stats() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      {/* Parallax background layer */}
      <div aria-hidden className="absolute inset-0">
        <Parallax speed={0.5} className="h-full">
          <div className="absolute top-0 left-[10%] h-[45vmax] w-[45vmax] rounded-full bg-gold/8 blur-3xl" />
          <div className="absolute bottom-0 right-[5%] h-[40vmax] w-[40vmax] rounded-full bg-brand-indigo/20 blur-3xl" />
          <div className="absolute top-[20%] right-[30%] h-[30vmax] w-[30vmax] rounded-full bg-brand-indigo-bright/8 blur-3xl" />
        </Parallax>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            The numbers
          </p>
          <h2 className="mb-16 max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 md:mb-24 md:text-6xl">
            Ambition, quantified.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col gap-3">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  className="text-6xl font-bold tracking-tighter text-zinc-50 tabular-nums md:text-7xl"
                />
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
