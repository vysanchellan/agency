"use client";

import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * One oversized client quote. GSAP SplitText breaks it into words and a
 * scrubbed ScrollTrigger reveals them in reading order as the section moves
 * through the viewport. Words inside the key phrase inherit the living
 * gradient treatment (background position drifts via CSS keyframes).
 * Reduced motion falls back to a single fade from ScrollReveal semantics.
 */
export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !quoteRef.current) return;

      const split = SplitText.create(quoteRef.current, {
        type: "words",
        wordsClass: "quote-word",
      });

      // Words sitting inside the marked phrase carry the animated gradient —
      // applied per-word because background-clip:text doesn't survive the
      // split from a parent span.
      split.words.forEach((word) => {
        if (word.closest("[data-gradient]")) {
          word.classList.add("text-gradient-live");
        }
      });

      gsap.from(split.words, {
        opacity: 0.08,
        y: 14,
        filter: "blur(6px)",
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.6,
        },
      });

      return () => split.revert();
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-zinc-900 py-32 md:py-44"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <ScrollReveal>
          <p className="mb-12 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400">
            What clients say
          </p>
        </ScrollReveal>

        <blockquote>
          <p
            ref={quoteRef}
            className="text-3xl font-bold leading-[1.2] tracking-tight text-zinc-100 md:text-5xl"
          >
            &ldquo;Kassora didn&rsquo;t redesign our website — they{" "}
            <span data-gradient className="text-gradient-live">
              gave the brand a pulse.
            </span>{" "}
            Six months on, every product demo starts with someone asking who
            built the site.&rdquo;
          </p>

          <ScrollReveal delay={0.2}>
            <footer className="mt-12 flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-500/30 text-sm font-bold text-emerald-200"
              >
                NM
              </span>
              <div>
                <p className="font-semibold text-zinc-100">Naledi Mokoena</p>
                <p className="text-sm text-zinc-500">CEO, Aurelia Finance</p>
              </div>
            </footer>
          </ScrollReveal>
        </blockquote>
      </div>
    </section>
  );
}
