"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import LogoReveal from "@/components/brand/LogoReveal";

export default function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  return (
    <section
      id="top"
      className="noise relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      {/* Layered gradient mesh backdrop in brand gold + indigo */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-blob absolute -top-1/4 left-[8%] h-[60vmax] w-[60vmax] rounded-full bg-gold/10 blur-3xl max-md:blur-2xl" />
        <div className="animate-blob-slow absolute top-[30%] -right-[15%] h-[55vmax] w-[55vmax] rounded-full bg-brand-indigo/25 blur-3xl max-md:blur-2xl" />
        <div className="animate-blob absolute -bottom-[30%] left-[30%] h-[50vmax] w-[50vmax] rounded-full bg-brand-indigo-bright/10 blur-3xl max-md:blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-60% to-base" />
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-7xl items-center gap-16 px-6 pt-28 md:grid-cols-[1.15fr_0.85fr] md:px-10">
        <div>
          <p className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.28em] text-zinc-400">
            <span className="inline-block h-2 w-2 rounded-full bg-gold max-md:animate-pulse" />
            Kassora — Durban, South Africa
          </p>

          <h1 className="text-[clamp(2.75rem,7.5vw,6.5rem)] font-bold leading-[0.98] tracking-tight text-zinc-50">
            <span>Market </span>
            <span className="text-gradient-live">beyond</span>
            <br />
            <span>limits.</span>
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Kassora gives ambitious companies the intelligence to dominate
            their market. From brand positioning to conversion architecture —
            built for the companies that refuse to be average.
          </p>

          <div className="mt-12 flex flex-wrap gap-10">
            {[
              { num: "300%", label: "Avg. pipeline growth" },
              { num: "48h", label: "Launch turnaround" },
              { num: "99.9%", label: "System uptime" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold tracking-tight text-gold-bright">
                  {stat.num}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-[70vw] max-w-[300px] md:w-full md:max-w-[440px]">
          <LogoReveal />
        </div>
      </div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-10 left-1/2 z-[3] -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <span className="text-xs font-medium uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="h-12 w-px overflow-hidden bg-zinc-800">
            <motion.div
              animate={reduced ? undefined : { y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-b from-transparent via-gold to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
