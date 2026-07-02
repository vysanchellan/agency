"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BRAND, KASSORA_PATHS } from "@/components/brand/KassoraMark";
import { cn } from "@/lib/utils";

const SHAPES = [
  { d: KASSORA_PATHS.stem, fill: "url(#lr-gold)", delay: 0.4 },
  { d: KASSORA_PATHS.sweep, fill: "url(#lr-gold)", delay: 0.9 },
  { d: KASSORA_PATHS.chevron, fill: "url(#lr-indigo)", delay: 1.5 },
];

export default function LogoReveal({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
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

      <motion.svg
        viewBox="115 105 370 392"
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
            <path d={shape.d} fill={shape.fill} />
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
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: shape.delay,
                  },
                  opacity: { duration: 0.4, delay: shape.delay + 0.6 },
                }}
              />
            )}
          </g>
        ))}

        {!reduced && (
          <g clipPath="url(#lr-clip-gold)" className="lr-shimmer">
            <rect
              x="60" y="80" width="120" height="460"
              fill="url(#lr-shimmer)"
              style={{ mixBlendMode: "overlay" }}
            />
          </g>
        )}
      </motion.svg>
    </div>
  );
}
