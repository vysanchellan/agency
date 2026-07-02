"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Relative scroll speed. Positive values drift down as you scroll
   * (background feel), negative values drift up (foreground feel).
   * 0.3 ≈ moves at 30% of a viewport's worth of travel.
   */
  speed?: number;
};

/**
 * Moves children at a different rate than the page scroll, driven by
 * useScroll + useTransform. Transform-only, so it stays on the compositor.
 */
export default function Parallax({
  children,
  className,
  speed = 0.3,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * -160, speed * 160],
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={{ y: reduced ? 0 : y }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
