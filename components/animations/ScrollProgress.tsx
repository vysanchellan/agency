"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { SPRING } from "@/lib/animations";

/**
 * Thin gradient bar fixed to the top of the viewport, scaling with page
 * scroll progress via useScroll. The spring gives the bar a slight glide.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING.progress);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-gold-bright via-gold to-brand-indigo-bright will-change-transform"
      style={{ scaleX }}
    />
  );
}
