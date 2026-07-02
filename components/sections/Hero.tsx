"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import TextReveal from "@/components/animations/TextReveal";
import { DURATION, EASE } from "@/lib/animations";

// The WebGL canvas is the heaviest asset on the page — load it after the
// initial paint so the headline lands instantly.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  // The scroll cue dissolves as soon as the visitor starts moving.
  const cueOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  return (
    <section className="noise relative flex min-h-screen flex-col justify-center overflow-hidden">
      {/* Layered gradient mesh backdrop */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-blob absolute -top-1/4 left-[8%] h-[60vmax] w-[60vmax] rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="animate-blob-slow absolute top-[30%] -right-[15%] h-[55vmax] w-[55vmax] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="animate-blob absolute -bottom-[30%] left-[30%] h-[50vmax] w-[50vmax] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base" />
      </div>

      {/* 3D canvas layer */}
      <div className="absolute inset-0 z-[2] md:left-auto md:w-[58%]">
        <HeroScene reducedMotion={reduced ?? false} />
      </div>

      {/* Copy layer */}
      <div className="relative z-[3] mx-auto w-full max-w-7xl px-6 pt-24 md:px-10">
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE, delay: 0.15 }}
          className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.28em] text-zinc-400"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Kassora Labs
        </motion.p>

        <h1 className="max-w-5xl text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.98] tracking-tight text-zinc-50">
          <TextReveal text="We build the" delay={0.35} />
          <br />
          <TextReveal text="internet's most" delay={0.55} />
          <br />
          <span className="text-gradient-live">
            <TextReveal text="alive websites." delay={0.75} />
          </span>
        </h1>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: DURATION.base, ease: EASE, delay: 1.15 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          Durban-based. Building brand, web, and product experiences for
          ambitious clients who refuse to ship anything static.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-10 left-1/2 z-[3] -translate-x-1/2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: DURATION.base }}
          className="flex flex-col items-center gap-3 text-zinc-500"
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="h-12 w-px overflow-hidden bg-zinc-800">
            <motion.div
              animate={reduced ? undefined : { y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
