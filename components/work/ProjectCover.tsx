"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/components/brand/KassoraMark";

export type CoverId = "panelpro" | "travelsa" | "pointtaken";

/**
 * Animated cover art for the portfolio cards — each is a small SVG scene
 * themed to the project, drawn in the brand palette. Strokes trace themselves
 * on when the card enters the viewport, then loop subtle ambient motion
 * (flowing dashes, a travelling dot, drifting clouds, a sheen sweep).
 * All motion is transform/stroke based and disabled under reduced motion.
 */

const draw = (delay: number) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.6, ease: "easeInOut" as const, delay },
      opacity: { duration: 0.3, delay },
    },
  },
});

/* -------------------------------------------------------------------------
 * PanelPro Auto — a coupe silhouette sprayed on in gold, wheels tracing,
 * paint-mist glows pulsing behind, sheen sweeping the body.
 * ---------------------------------------------------------------------- */
function PanelProScene({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 480 280"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* paint mist */}
      {!reduced && (
        <>
          <motion.circle
            cx="120"
            cy="90"
            r="70"
            fill={BRAND.gold}
            opacity={0.1}
            animate={{ r: [60, 80, 60], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(22px)" }}
          />
          <motion.circle
            cx="370"
            cy="200"
            r="80"
            fill={BRAND.indigoBright}
            opacity={0.08}
            animate={{ r: [70, 90, 70], opacity: [0.05, 0.11, 0.05] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            style={{ filter: "blur(26px)" }}
          />
        </>
      )}

      {/* coupe body */}
      <motion.path
        d="M48 196 H80 C96 196 100 188 112 172 C132 146 168 128 216 124 C268 120 312 132 344 156 C360 168 384 176 412 180 C428 182 434 188 432 196 H400"
        fill="none"
        stroke={BRAND.gold}
        strokeWidth={5}
        strokeLinecap="round"
        variants={draw(0.2)}
      />
      {/* belt line + spoiler hint */}
      <motion.path
        d="M150 168 C190 150 250 146 300 158 M330 130 L352 118"
        fill="none"
        stroke={BRAND.goldBright}
        strokeWidth={3}
        strokeLinecap="round"
        variants={draw(1.2)}
      />
      {/* wheels */}
      <motion.circle
        cx="146"
        cy="196"
        r="26"
        fill="none"
        stroke={BRAND.goldBright}
        strokeWidth={5}
        variants={draw(0.9)}
      />
      <motion.circle
        cx="356"
        cy="196"
        r="26"
        fill="none"
        stroke={BRAND.goldBright}
        strokeWidth={5}
        variants={draw(1.05)}
      />
      {/* ground */}
      <motion.path
        d="M36 232 H444"
        fill="none"
        stroke="#3f3f46"
        strokeWidth={2}
        strokeDasharray="14 10"
        className={reduced ? undefined : "cover-dash"}
        variants={draw(0.4)}
      />
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------
 * Travelling South Africa — layered peaks, a pulsing gold sun, drifting
 * clouds, and a route that draws itself with a dot forever travelling it.
 * ---------------------------------------------------------------------- */
const TRAVEL_ROUTE =
  "M40 236 C110 190 150 214 200 170 C250 126 300 160 350 122 C380 100 414 96 444 78";

function TravelScene({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 480 280"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* sun */}
      <motion.circle
        cx="392"
        cy="64"
        r="26"
        fill={BRAND.gold}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ filter: "drop-shadow(0 0 18px rgba(194,154,69,0.65))" }}
      />
      {/* clouds */}
      <g className={reduced ? undefined : "cover-drift"} opacity={0.35}>
        <rect x="70" y="52" width="84" height="12" rx="6" fill="#a1a1aa" />
        <rect x="100" y="72" width="56" height="10" rx="5" fill="#71717a" />
      </g>
      {/* mountain layers */}
      <motion.path
        d="M0 280 L90 160 L170 250 L250 140 L330 240 L410 170 L480 280 Z"
        fill={BRAND.indigo}
        opacity={0.55}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.55, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.2 }}
      />
      <motion.path
        d="M0 280 L120 200 L210 270 L320 190 L400 260 L480 210 L480 280 Z"
        fill="#1b163f"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.45 }}
      />
      {/* route */}
      <motion.path
        d={TRAVEL_ROUTE}
        fill="none"
        stroke={BRAND.goldBright}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeDasharray="10 12"
        className={reduced ? undefined : "cover-dash"}
        variants={draw(0.8)}
      />
      {/* travelling dot */}
      {!reduced && (
        <circle
          r="7"
          fill={BRAND.goldBright}
          className="cover-travel"
          style={{
            offsetPath: `path("${TRAVEL_ROUTE}")`,
            filter: "drop-shadow(0 0 8px rgba(228,194,115,0.9))",
          }}
        />
      )}
      {/* destination pin */}
      <motion.path
        d="M444 78 m0 -10 a10 10 0 1 1 -0.1 0 M444 68 v-16"
        fill="none"
        stroke={BRAND.goldBright}
        strokeWidth={3}
        variants={draw(2)}
      />
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------
 * Point-Taken Group — a national logistics network: grid backdrop, nodes
 * pulsing across the map, freight lanes flowing, one shipment always moving.
 * ---------------------------------------------------------------------- */
const LANE = "M70 200 C150 150 210 190 260 130 C300 84 360 110 416 74";

const NODES = [
  { x: 70, y: 200, delay: 0.3 },
  { x: 190, y: 172, delay: 0.55 },
  { x: 260, y: 130, delay: 0.8 },
  { x: 340, y: 106, delay: 1.05 },
  { x: 416, y: 74, delay: 1.3 },
];

function PointTakenScene({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 480 280"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* blueprint grid */}
      <defs>
        <pattern id="pt-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0 H0 V40"
            fill="none"
            stroke="#27272a"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="480" height="280" fill="url(#pt-grid)" opacity={0.5} />

      {/* secondary lanes */}
      <motion.path
        d="M70 200 C130 236 220 240 300 216 C356 200 396 160 416 74 M190 172 C240 210 320 196 340 106"
        fill="none"
        stroke={BRAND.indigoBright}
        strokeWidth={1.5}
        opacity={0.35}
        variants={draw(1.2)}
      />
      {/* main freight lane */}
      <motion.path
        d={LANE}
        fill="none"
        stroke={BRAND.gold}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="12 10"
        className={reduced ? undefined : "cover-dash"}
        variants={draw(0.5)}
      />
      {/* shipment dot */}
      {!reduced && (
        <rect
          width="12"
          height="12"
          rx="3"
          fill={BRAND.goldBright}
          className="cover-travel"
          style={{
            offsetPath: `path("${LANE}")`,
            filter: "drop-shadow(0 0 8px rgba(228,194,115,0.8))",
          }}
        />
      )}
      {/* nodes */}
      {NODES.map((n) => (
        <g key={`${n.x}-${n.y}`}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="7"
            fill="#0a0910"
            stroke={BRAND.goldBright}
            strokeWidth={2.5}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: n.delay, type: "spring" }}
          />
          {!reduced && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="7"
              fill="none"
              stroke={BRAND.indigoBright}
              strokeWidth={1.5}
              animate={{ r: [7, 20], opacity: [0.7, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: n.delay,
                ease: "easeOut",
              }}
            />
          )}
        </g>
      ))}
    </motion.svg>
  );
}

const SCENES: Record<
  CoverId,
  (props: { reduced: boolean }) => React.ReactElement
> = {
  panelpro: PanelProScene,
  travelsa: TravelScene,
  pointtaken: PointTakenScene,
};

export default function ProjectCover({ id }: { id: CoverId }) {
  const reduced = useReducedMotion() ?? false;
  const Scene = SCENES[id];

  return (
    <div className="absolute inset-0">
      <Scene reduced={reduced} />
      {/* sheen sweep across the whole cover */}
      {!reduced && (
        <div
          aria-hidden
          className="cover-sheen pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent"
        />
      )}
    </div>
  );
}
