"use client";

import MagneticButton from "@/components/animations/MagneticButton";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

const EMAIL = "hello@kassoralabs.com";

/**
 * Closing call to action: oversized headline, magnetic CTA button, and the
 * studio's contact details. Footer lives here too — the site ends on the ask.
 */
export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="noise relative overflow-hidden border-t border-zinc-900 pt-32 md:pt-48"
    >
      {/* Backdrop glow */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute bottom-[-30%] left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-gradient-to-t from-emerald-500/15 via-cyan-500/8 to-transparent blur-3xl" />
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.02] tracking-tight text-zinc-50">
          <TextReveal text="Let's build" />
          <br />
          <span className="text-gradient-live">
            <TextReveal text="something alive." delay={0.2} />
          </span>
        </h2>

        <ScrollReveal delay={0.35}>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-400">
            We take on a handful of projects a year, and only the ambitious
            ones. If that sounds like yours, we should talk.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <MagneticButton href={`mailto:${EMAIL}`}>
              Start a project
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </MagneticButton>

            <div className="flex flex-col gap-1">
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg font-semibold text-zinc-100 transition-colors hover:text-emerald-300"
              >
                {EMAIL}
              </a>
              <span className="text-sm text-zinc-500">
                Durban, South Africa
              </span>
            </div>
          </div>
        </ScrollReveal>

        <footer className="mt-28 flex flex-col items-start justify-between gap-6 border-t border-zinc-900 py-10 md:flex-row md:items-center">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Kassora Labs. Built alive in
            Durban.
          </p>
          <div className="flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#work" className="transition-colors hover:text-zinc-100">
              Work
            </a>
            <a
              href="#capabilities"
              className="transition-colors hover:text-zinc-100"
            >
              Capabilities
            </a>
            <a href="#process" className="transition-colors hover:text-zinc-100">
              Process
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
