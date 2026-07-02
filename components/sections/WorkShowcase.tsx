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
  url: string;
  tech: string;
  /** Tailwind gradient classes for the placeholder artwork. */
  art: string;
  accent: string;
};

/** Real Kassora projects — every card links to the live site. */
const CASE_STUDIES: CaseStudy[] = [
  {
    name: "PanelPro Auto",
    description:
      "A complete digital presence for a Cape Town auto body shop — spray painting, detailing, and refurbishments, with before-and-after showcases and instant quote requests.",
    discipline: "Web Experience",
    url: "https://panelproauto.co.za",
    tech: "Next.js · TypeScript · Tailwind",
    art: "from-gold/45 via-gold-deep/30 to-zinc-950",
    accent: "text-gold-bright",
  },
  {
    name: "Travelling South Africa",
    description:
      "A travel platform covering all nine provinces and 862+ towns — interactive trip planning, currency converter, local slang guide, and a full business directory.",
    discipline: "Web Platform",
    url: "https://travellingsouthafrica.co.za",
    tech: "Next.js · TypeScript · PostgreSQL",
    art: "from-brand-indigo-bright/40 via-brand-indigo/35 to-zinc-950",
    accent: "text-brand-indigo-bright",
  },
  {
    name: "Top Notch Creations",
    description:
      "Digital home for a Cape Town construction studio — eight trades under one roof, 500+ completed projects, from full renovations to custom-built motor homes.",
    discipline: "Web Experience",
    url: "https://top-notch-pi.vercel.app",
    tech: "Next.js · TypeScript · Tailwind",
    art: "from-amber-500/35 via-stone-700/40 to-zinc-950",
    accent: "text-amber-300",
  },
  {
    name: "OnlySA",
    description:
      "A South African social platform for anonymous, province-tagged conversation — rants, confessions, hot takes, and reviews from GP to KZN to WC.",
    discipline: "Product Design",
    url: "https://onlysa.vercel.app",
    tech: "Next.js · TypeScript · Tailwind",
    art: "from-violet-500/40 via-brand-indigo/40 to-zinc-950",
    accent: "text-violet-300",
  },
  {
    name: "Just Lance",
    description:
      "Brand and web presence for Dubai's premier DJ — a booking-first site built to feel like the events he plays.",
    discipline: "Brand & Web",
    url: "https://justlance.vercel.app",
    tech: "Next.js · TypeScript · Tailwind",
    art: "from-gold-bright/35 via-brand-indigo/35 to-zinc-950",
    accent: "text-gold",
  },
];

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const reduced = useReducedMotion();

  return (
    <TiltCard className="group relative flex h-[62vh] min-h-[420px] w-[82vw] max-w-[560px] shrink-0 flex-col overflow-hidden rounded-3xl bg-zinc-900/60 backdrop-blur-sm md:w-[44vw]">
      <a
        href={study.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
      >
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
          <span className="absolute top-5 left-5 z-[2] rounded-full border border-white/15 bg-black/30 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-200 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            Visit live site ↗
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
              {study.discipline}
            </p>
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-zinc-50 md:text-3xl">
              {study.name}
            </h3>
            <p className="mb-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              {study.description}
            </p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-zinc-600">
              {study.tech}
            </p>
          </div>
        </div>
      </a>
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
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Portfolio
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-zinc-50 md:text-6xl">
          Ships we&rsquo;ve launched.
        </h2>
        <p className="mt-4 max-w-lg text-zinc-500">
          Real projects, real results. Every site we build is engineered for
          performance.
        </p>
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
