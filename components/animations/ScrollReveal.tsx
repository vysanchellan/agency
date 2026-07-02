"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after entering the viewport. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  once?: boolean;
};

/**
 * Fade + rise + blur-to-sharp entrance when the element scrolls into view.
 * Degrades to a plain fade under prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 36,
  once = true,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, filter: "blur(10px)" }}
      whileInView={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: reduced ? DURATION.fast : DURATION.base,
        ease: EASE,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
