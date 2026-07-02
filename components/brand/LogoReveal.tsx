"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";
import { BRAND, KASSORA_PATHS } from "@/components/brand/KassoraMark";
import { EASE, SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * The hero centerpiece: a cinematic, brand-film style reveal of the Kassora
 * mark, built entirely in code.
 *
 * Sequence — each shape traces itself on as a thin gold line (pathLength),
 * then fills; once formed, the mark stays alive: a slow float, a breathing
 * glow, a shimmer that sweeps the gold every few seconds, and a subtle
 * parallax that leans the mark toward the cursor.
 *
 * Reduced motion renders the finished mark with a plain fade.
 */

const SHAPES = [
  { d: KASSORA_PATHS.stem, fill: "url(#lr-gold)", delay: 0.4 },
  { d: KASSORA_PATHS.sweep, fill: "url(#lr-gold)", delay: 0.9 },
  { d: KASSORA_PATHS.chevron, fill: "url(#lr-indigo)", delay: 1.5 },
];

export default function LogoReveal({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  // Cursor parallax — the mark leans gently toward the pointer.
  const tiltX = useSpring(useMotionValue(0), SPRING.tilt);
  const tiltY = useSpring(useMotionValue(0), SPRING.tilt);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        tiltY.set(px * 14);
        tiltX.set(py * -10);
        frame = 0;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, tiltX, tiltY]);

  return (
    <div className={cn("relative", className)} style={{ perspective: 1200 }}>
      {/* Breathing glow bed behind the mark */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="absolute inset-[-20%] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(194,154,69,0.16), rgba(46,39,120,0.12) 55%, transparent 75%)",
            filter: "blur(30px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        style={{ rotateX: reduced ? 0 : tiltX, rotateY: reduced ? 0 : tiltY }}
        className="will-change-transform"
      >
        <motion.svg
          viewBox="100 90 400 430"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-full w-full drop-shadow-[0_0_45px_rgba(194,154,69,0.25)]"
          role="img"
          aria-label="Kassora logo animation"
          animate={reduced ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="lr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={BRAND.goldBright} />
              <stop offset="55%" stopColor={BRAND.gold} />
              <stop offset="100%" stopColor={BRAND.goldDeep} />
            </linearGradient>
            <linearGradient id="lr-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A3FA8" />
              <stop offset="100%" stopColor={BRAND.indigo} />
            </linearGradient>
            {/* Shimmer band that sweeps across the gold every few seconds */}
            <linearGradient id="lr-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.55" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <clipPath id="lr-clip-gold">
              <path d={KASSORA_PATHS.stem} />
              <path d={KASSORA_PATHS.sweep} />
            </clipPath>
          </defs>

          {SHAPES.map((shape) => (
            <g key={shape.d}>
              {/* Fill fades in after its outline finishes tracing */}
              <motion.path
                d={shape.d}
                fill={shape.fill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={
                  reduced
                    ? { duration: 0.6 }
                    : { duration: 1.1, ease: EASE, delay: shape.delay + 0.7 }
                }
              />
              {/* Trace-on outline */}
              {!reduced && (
                <motion.path
                  d={shape.d}
                  fill="none"
                  stroke={
                    shape.fill === "url(#lr-indigo)"
                      ? BRAND.indigoBright
                      : BRAND.goldBright
                  }
                  strokeWidth={2.5}
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: 0 }}
                  transition={{
                    pathLength: {
                      duration: 1.4,
                      ease: "easeInOut",
                      delay: shape.delay,
                    },
                    opacity: { duration: 0.8, delay: shape.delay + 1.6 },
                  }}
                />
              )}
            </g>
          ))}

          {/* Light sweep across the gold shapes, looping */}
          {!reduced && (
            <g clipPath="url(#lr-clip-gold)">
              <motion.rect
                x="60"
                y="80"
                width="120"
                height="460"
                fill="url(#lr-shimmer)"
                style={{ mixBlendMode: "overlay" }}
                initial={{ x: -180, skewX: -18 }}
                animate={{ x: 520 }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 3.2,
                  ease: "easeInOut",
                  delay: 3,
                }}
              />
            </g>
          )}
        </motion.svg>
      </motion.div>
    </div>
  );
}
