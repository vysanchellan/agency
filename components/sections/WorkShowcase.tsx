"use client";

import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import TiltCard from "@/components/animations/TiltCard";
import { clipReveal, fadeOnly } from "@/lib/animations";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CaseStudy = {
  name: string;
  description: string;
  discipline: string;
  year: string;
  /** Tailwind gradient classes for the placeholder artwork. */
  art: string;
  accent: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    name: "Aurelia Finance",
    description:
      "A private-wealth brand rebuilt around motion — markets that breathe on screen.",
    discipline: "Brand Identity",
    year: "2025",
    art: "from-emerald-500/50 via-teal-600/35 to-zinc-900",
    accent: "text-emerald-300",
  },
  {
    name: "Nova Athletics",
    description:
      "A commerce experience where every product spins, stretches, and sells itself.",
    discipline: "Web Experience",
    year: "2025",
    art: "from-cyan-400/50 via-sky-600/35 to-zinc-900",
    accent: "text-cyan-300",
  },
  {
    name: "Orbital Music",
    description:
      "A streaming product with a UI that pulses to whatever you're playing.",
    discipline: "Product Design",
    year: "2024",
    art: "from-violet-500/50 via-purple-700/35 to-zinc-900",
    accent: "text-violet-300",
  },
  {
    name: "Sable Hotels",
    description:
      "Booking flow as slow luxury — a site that makes you want the stay before the stay.",
    discipline: "Web Experience",
    year: "2024",
    art: "from-amber-400/45 via-orange-600/30 to-zinc-900",
    accent: "text-amber-300",
  },
  {
    name: "Helix Biotech",
    description:
      "Protein structures rendered live in WebGL for a science brand that shows, not tells.",
    discipline: "3D & WebGL",
    year: "2023",
    art: "from-emerald-400/40 via-cyan-600/35 to-zinc-900",
    accent: "text-teal-300",
  },
];

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const reduced = useReducedMotion();

  return (
    <TiltCard className="group relative flex h-[62vh] min-h-[420px] w-[82vw] max-w-[560px] shrink-0 flex-col overflow-hidden rounded-3xl bg-zinc-900/60 backdrop-blur-sm md:w-[44vw]">
      {/* Placeholder artwork with clip-path wipe reveal */}
      <motion.div
        variants={reduced ? fadeOnly : clipReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={cn(
          "noise relative m-3 flex-1 overflow-hidden rounded-2xl bg-gradient-to-br",
          study.art,
        )}
      >
        <span className="absolute bottom-4 right-5 z-[2] font-mono text-8xl font-bold text-white/10 transition-colors duration-500 group-hover:text-white/20">
          0{index + 1}
        </span>
      </motion.div>

      <div className="flex items-end justify-between gap-6 p-7">
        <div>
          <p
            className={cn(
              "mb-2 text-xs font-semibold uppercase tracking-[0.24em]",
              study.accent,
            )}
          >
            {study.discipline} — {study.year}
          </p>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-zinc-50 md:text-3xl">
            {study.name}
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
            {study.description}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}

/**
 * The centerpiece interaction: the section pins to the viewport and vertical
 * scroll scrubs the case-study track horizontally, 1:1 with scroll position.
 * Under reduced motion the pin is skipped and the track becomes a plain
 * swipeable horizontal scroller.
 */
export default function WorkShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const track = trackRef.current;
      if (!track) return;

      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${distance()}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative flex h-screen flex-col justify-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-10 md:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400">
          Selected work
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-zinc-50 md:text-6xl">
          Proof, not promises.
        </h2>
      </div>

      <div
        ref={trackRef}
        className={cn(
          "flex items-stretch gap-6 pl-6 pr-[20vw] will-change-transform md:pl-10",
          reduced && "overflow-x-auto pb-6",
        )}
      >
        {CASE_STUDIES.map((study, i) => (
          <CaseCard key={study.name} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}
