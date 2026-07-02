"use client";

import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Database,
  ExternalLink,
  Globe,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import TiltCard from "@/components/animations/TiltCard";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TECH_ICONS: Record<string, LucideIcon> = {
  "Next.js": Code2,
  TypeScript: Code2,
  PostgreSQL: Database,
  "Supply Chain": Globe,
};

type CaseStudy = {
  name: string;
  description: string;
  discipline: string;
  url: string;
  tech: string;
  /** Real screenshot of the live site, captured into public/work/. */
  image: string;
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
    image: "/work/panelpro.png",
    accent: "text-gold-bright",
  },
  {
    name: "Travelling South Africa",
    description:
      "A travel platform covering all nine provinces and 862+ towns — interactive trip planning, currency converter, local slang guide, and a full business directory.",
    discipline: "Web Platform",
    url: "https://travellingsouthafrica.co.za",
    tech: "Next.js · TypeScript · PostgreSQL",
    image: "/work/travelsa.png",
    accent: "text-brand-indigo-bright",
  },
  {
    name: "Point-Taken Group",
    description:
      "Digital platform for a national supply chain and logistics group — SAHPRA-registered healthcare distribution, government contracts, and nationwide delivery across four cities, with an integrated store and client portal.",
    discipline: "Corporate Web Platform",
    url: "https://pointtaken.co.za",
    tech: "Supply Chain · Store · Client Portal",
    image: "/work/pointtaken.png",
    accent: "text-gold",
  },
];

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <TiltCard className="group relative flex h-[62svh] min-h-[440px] w-[84vw] max-w-[620px] shrink-0 flex-col overflow-hidden rounded-3xl bg-zinc-900/60 md:w-[50vw] md:backdrop-blur-sm">
      <a
        href={study.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
      >
        {/* Real site screenshot as the cover */}
        <div className="relative m-3 flex-1 overflow-hidden rounded-2xl bg-zinc-950">
          <Image
            src={study.image}
            alt={`${study.name} — live site`}
            fill
            sizes="(min-width: 768px) 50vw, 84vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Legibility gradient so the numeral and chip always read */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20"
          />
          <span className="absolute bottom-4 right-5 font-mono text-8xl font-bold text-white/15 transition-colors duration-500 group-hover:text-white/25">
            0{index + 1}
          </span>
          <div className="absolute top-5 left-5 z-[2] flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-200 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <ExternalLink className="h-3 w-3" strokeWidth={2} />
            <span>Visit live site</span>
          </div>
        </div>

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
            <p className="mb-3 max-w-sm text-base leading-relaxed text-zinc-400 md:text-sm">
              {study.description}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {study.tech.split(" · ").map((t) => {
                const TechIcon = TECH_ICONS[t.trim()];
                return (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/60 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-zinc-500"
                  >
                    {TechIcon && (
                      <TechIcon className="h-3 w-3" strokeWidth={1.8} />
                    )}
                    {t.trim()}
                  </span>
                );
              })}
            </div>
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
      className="relative flex h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* Soft gradient bridge from hero into this section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-32 h-48 bg-gradient-to-b from-base via-base/60 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-10 md:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Portfolio
        </p>
        <h2 className="text-5xl font-bold tracking-tight text-zinc-50 md:text-6xl">
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
