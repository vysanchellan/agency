"use client";

import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useCoarsePointer } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const SUPPORTING = [
  {
    quote:
      "The level of polish and attention to detail is unlike anything we've seen. From the clean codebase to the pixel-perfect UI — every deliverable exceeded expectations. Our users noticed immediately.",
    name: "Riaan Botha",
    role: "Software Engineer, Yoco",
    initials: "RB",
  },
  {
    quote:
      "Working with Kassora felt less like hiring an agency and more like gaining a product team. Their data-driven approach to design and relentless focus on accessibility set a new bar for our product.",
    name: "Lerato Mokoena",
    role: "UX Designer, SnapScan",
    initials: "LM",
  },
];

/**
 * The lead client quote, split into words by GSAP SplitText and revealed in
 * reading order as a scrubbed ScrollTrigger moves through the viewport. Words
 * inside the marked phrase carry the living gradient. Two supporting quotes
 * follow with standard scroll reveals.
 */
export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

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

      // Scrubbing an animated blur across dozens of word spans is the kind
      // of load mobile GPUs can't sustain — touch devices keep the identical
      // opacity/rise reveal without the filter.
      gsap.from(split.words, {
        opacity: 0.08,
        y: 14,
        ...(coarse ? {} : { filter: "blur(6px)" }),
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
    { scope: sectionRef, dependencies: [reduced, coarse] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-zinc-900 py-32 md:py-44"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <ScrollReveal>
          <p className="mb-12 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Trusted by builders
          </p>
        </ScrollReveal>

        <blockquote>
          <p
            ref={quoteRef}
            className="text-3xl font-bold leading-[1.2] tracking-tight text-zinc-100 md:text-5xl"
          >
            &ldquo;Kassora completely transformed how we approach our
            go-to-market strategy. The conversion architecture they designed{" "}
            <span data-gradient className="text-gradient-live">
              doubled our trial-to-paid rate
            </span>{" "}
            within the first month. Absolutely game-changing.&rdquo;
          </p>

          <ScrollReveal delay={0.2}>
            <footer className="mt-12 flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold/40 to-brand-indigo/50 text-sm font-bold text-gold-bright"
              >
                TN
              </span>
              <div>
                <p className="font-semibold text-zinc-100">Thandi Ndlovu</p>
                <p className="text-sm text-zinc-500">
                  Product Manager, Lulalend
                </p>
              </div>
            </footer>
          </ScrollReveal>
        </blockquote>

        <div className="mt-24 grid gap-6 md:grid-cols-2">
          {SUPPORTING.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <figure className="flex h-full flex-col justify-between rounded-3xl bg-zinc-900/50 p-8 md:backdrop-blur-sm">
                <blockquote className="text-base leading-relaxed text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-indigo/60 to-gold/30 text-xs font-bold text-zinc-100"
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">
                      {t.name}
                    </p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
