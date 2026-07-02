"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import KassoraMark from "@/components/brand/KassoraMark";

/**
 * Minimal fixed header: the brand mark + wordmark on the left, a single
 * contact action on the right. A blurred backdrop fades in once the page
 * starts scrolling so the header never fights the hero.
 */
export default function SiteHeader() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 160], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        aria-hidden
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 border-b border-white/5 bg-base/70 backdrop-blur-md"
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <KassoraMark className="h-11 w-11 md:h-9 md:w-9" />
          <span className="text-base font-bold uppercase tracking-[0.35em] text-zinc-100 md:text-sm">
            Kassora
          </span>
        </a>
        <a
          href="#contact"
          className="rounded-full border border-gold/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright transition-colors duration-300 hover:border-gold hover:bg-gold/10"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
