"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import LogoReveal from "@/components/brand/LogoReveal";
import TextReveal from "@/components/animations/TextReveal";
import { DURATION, EASE } from "@/lib/animations";
import { useCoarsePointer } from "@/lib/hooks";

export default function Hero() {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  // Entrance states: full blur-to-sharp on desktop, transform/opacity-only on
  // touch devices (identical motion, no animated filters), plain fade when
  // the user prefers reduced motion.
  const rise = (delay: number) => ({
    initial: reduced
      ? { opacity: 0 }
      : coarse
        ? { opacity: 0, y: 20 }
        : { opacity: 0, y: 20, filter: "blur(8px)" },
    // The target always clears the filter — the coarse flag flips just after
    // first render, and a target without a filter key would leave the
    // captured blur frozen on screen.
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: DURATION.base, ease: EASE, delay },
  });

  return (
    <section
      id="top"
      className="noise relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* Layered gradient mesh backdrop in brand gold + indigo.
          Radial gradients instead of blur filters — the soft-orb look is
          identical, but there is no per-frame filter cost, which is what
          made mobile scrolling stutter. */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-blob absolute -top-1/4 left-[8%] h-[60vmax] w-[60vmax] bg-[radial-gradient(closest-side,rgba(194,154,69,0.13),transparent_72%)]" />
        <div className="animate-blob-slow absolute top-[30%] -right-[15%] h-[55vmax] w-[55vmax] bg-[radial-gradient(closest-side,rgba(46,39,120,0.32),transparent_72%)]" />
        <div className="animate-blob absolute -bottom-[30%] left-[30%] h-[50vmax] w-[50vmax] bg-[radial-gradient(closest-side,rgba(139,127,224,0.12),transparent_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-60% to-base" />
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pt-28 pb-16 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:px-10">
        <div>
          <motion.p
            {...rise(0.05)}
            className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.28em] text-zinc-400"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold" />
            Kassora — Durban, South Africa
          </motion.p>

          <h1 className="text-[clamp(2.75rem,7.5vw,6.5rem)] font-bold leading-[0.98] tracking-tight text-zinc-50">
            <TextReveal text="Market" delay={0.15} />{" "}
            <TextReveal
              text="beyond"
              delay={0.28}
              wordClassName="text-gradient-live"
            />
            <br />
            <TextReveal text="limits." delay={0.4} />
          </h1>

          <motion.p
            {...rise(0.55)}
            className="mt-10 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl"
          >
            Kassora gives ambitious companies the intelligence to dominate
            their market. From brand positioning to conversion architecture —
            built for the companies that refuse to be average.
          </motion.p>

          <motion.div {...rise(0.75)} className="mt-12 flex flex-wrap gap-10">
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
          </motion.div>
        </div>

        <div className="mx-auto w-[70vw] max-w-[300px] md:w-full md:max-w-[440px]">
          <LogoReveal />
        </div>
      </div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: DURATION.base }}
          className="flex flex-col items-center gap-3 text-zinc-500"
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
}
