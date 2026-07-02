"use client";

import MagneticButton from "@/components/animations/MagneticButton";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import KassoraMark from "@/components/brand/KassoraMark";

const EMAIL = "hello@kassora-tech.co.za";

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
        <div className="absolute bottom-[-30%] left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(194,154,69,0.14),rgba(46,39,120,0.12)_50%,transparent_74%)]" />
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.02] tracking-tight text-zinc-50">
          <TextReveal text="Let's build something" />
          <br />
          <TextReveal
            text="legendary."
            delay={0.2}
            wordClassName="text-gradient-live"
          />
        </h2>

        <ScrollReveal delay={0.35}>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-400">
            Whether you&rsquo;re launching your first product or scaling an
            established platform, we want to hear your story. Tell us what
            you&rsquo;re building.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <MagneticButton href={`mailto:${EMAIL}`}>
              Launch with Kassora
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
                className="text-lg font-semibold text-zinc-100 transition-colors hover:text-gold-bright"
              >
                {EMAIL}
              </a>
              <span className="text-sm text-zinc-500">
                Durban, South Africa · Response within 24h
              </span>
            </div>
          </div>
        </ScrollReveal>

        <footer className="mt-28 flex flex-col items-start justify-between gap-6 border-t border-zinc-900 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <KassoraMark className="h-7 w-7" />
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} Kassora. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#work" className="transition-colors hover:text-zinc-100">
              Portfolio
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
            <a href="#contact" className="transition-colors hover:text-zinc-100">
              Contact
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
