"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/components/brand/KassoraMark";

export type CoverId = "panelpro" | "travelsa" | "pointtaken";

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

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  },
});

/* -------------------------------------------------------------------------
 * PanelPro Auto — a vibrant auto-body garage scene
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
      {/* garage ceiling / wall backdrop */}
      <rect x="0" y="0" width="480" height="200" fill="#181621" />
      <rect x="0" y="200" width="480" height="80" fill="#100e18" />

      {/* fluorescent garage lights */}
      <rect x="40" y="6" width="100" height="8" rx="4" fill="#3f3f46" />
      {!reduced && (
        <motion.rect
          x="44" y="8" width="92" height="4" rx="2" fill="#e4c273"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <rect x="190" y="6" width="100" height="8" rx="4" fill="#3f3f46" />
      {!reduced && (
        <motion.rect
          x="194" y="8" width="92" height="4" rx="2" fill="#e4c273"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      )}
      <rect x="340" y="6" width="100" height="8" rx="4" fill="#3f3f46" />
      {!reduced && (
        <motion.rect
          x="344" y="8" width="92" height="4" rx="2" fill="#e4c273"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      )}

      {/* tool pegboard on left wall */}
      <rect x="8" y="30" width="40" height="160" rx="3" fill="#2a2735" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={`shelf-${i}`} x="12" y={40 + i * 32} width="32" height="2" rx="1" fill="#3f3f46" />
      ))}
      {/* tools */}
      <rect x="16" y="44" width="4" height="20" rx="1" fill="#71717a" />
      <rect x="28" y="48" width="4" height="16" rx="1" fill="#a1a1aa" />
      <rect x="20" y="80" width="3" height="24" rx="1" fill="#8f6f2c" />
      <rect x="16" y="112" width="6" height="6" rx="1" fill="#c29a45" />
      <rect x="28" y="116" width="4" height="14" rx="1" fill="#71717a" />

      {/* spray-paint mist clouds */}
      {!reduced && (
        <>
          <motion.circle cx="120" cy="140" r="50" fill={BRAND.gold} opacity={0.08}
            animate={{ r: [45, 60, 45], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(20px)" }}
          />
          <motion.circle cx="360" cy="160" r="60" fill={BRAND.indigoBright} opacity={0.06}
            animate={{ r: [50, 70, 50], opacity: [0.04, 0.1, 0.04] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            style={{ filter: "blur(24px)" }}
          />
        </>
      )}

      {/* car — side profile with filled body panels */}
      <motion.g variants={fadeIn(0.2)}>
        {/* car body (filled) */}
        <motion.path
          d="M56 176 C56 158 70 140 90 136 L110 132 C130 126 150 122 180 118 C226 112 276 114 316 124 C346 132 370 148 396 158 C412 164 424 170 432 176"
          fill="none" stroke={BRAND.gold} strokeWidth={3} strokeLinecap="round"
          variants={draw(0.3)}
        />
        {/* lower body / rocker panel */}
        <motion.path
          d="M76 176 L416 176"
          fill="none" stroke={BRAND.goldBright} strokeWidth={4} strokeLinecap="round"
          variants={draw(0.6)}
        />
        {/* hood */}
        <motion.path
          d="M170 116 L260 112 C290 110 310 118 330 130"
          fill="none" stroke={BRAND.gold} strokeWidth={2.5} strokeLinecap="round"
          variants={draw(0.8)}
        />
        {/* windshield */}
        <motion.path
          d="M105 134 L136 118 C146 114 158 112 168 112"
          fill="none" stroke="#a1a1aa" strokeWidth={2} strokeLinecap="round"
          variants={draw(1)}
        />
        {/* rear window */}
        <motion.path
          d="M350 124 C370 130 390 142 400 150"
          fill="none" stroke="#a1a1aa" strokeWidth={2} strokeLinecap="round"
          variants={draw(1.1)}
        />
        {/* wheels */}
        <motion.circle cx="130" cy="176" r="20"
          fill="none" stroke={BRAND.goldBright} strokeWidth={4}
          variants={draw(0.7)}
        />
        <motion.circle cx="130" cy="176" r="8"
          fill="none" stroke="#71717a" strokeWidth={2}
          variants={draw(0.75)}
        />
        <motion.circle cx="340" cy="176" r="20"
          fill="none" stroke={BRAND.goldBright} strokeWidth={4}
          variants={draw(0.85)}
        />
        <motion.circle cx="340" cy="176" r="8"
          fill="none" stroke="#71717a" strokeWidth={2}
          variants={draw(0.9)}
        />
        {/* headlight */}
        <motion.circle cx="98" cy="140" r="4"
          fill={BRAND.goldBright} opacity={0.6}
          variants={fadeIn(1.2)}
        />
        {!reduced && (
          <motion.circle cx="98" cy="140" r="10"
            fill={BRAND.goldBright} opacity={0.08}
            animate={{ r: [8, 14, 8], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(4px)" }}
          />
        )}
        {/* taillight */}
        <motion.circle cx="432" cy="148" r="3"
          fill="#ef4444" opacity={0.7}
          variants={fadeIn(1.3)}
        />

        {/* pinstripe detailing */}
        <motion.path
          d="M200 120 C240 116 280 118 310 126"
          fill="none" stroke={BRAND.goldDeep} strokeWidth={1.5} strokeLinecap="round"
          variants={draw(1.4)}
        />
      </motion.g>

      {/* hydraulic lift arms */}
      <motion.path
        d="M60 230 L60 180 M420 230 L420 180"
        fill="none" stroke="#52525b" strokeWidth={4} strokeLinecap="round"
        variants={draw(0.2)}
      />
      <motion.path
        d="M50 230 L430 230"
        fill="none" stroke="#3f3f46" strokeWidth={3} strokeLinecap="round"
        variants={draw(0.15)}
      />

      {/* brand watermark */}
      <motion.text
        x="240" y="260"
        textAnchor="middle"
        fill="#27272a" fontSize="14" fontWeight="bold" letterSpacing="8"
        variants={fadeIn(1.5)}
      >
        PANELPRO AUTO
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------
 * Travelling South Africa — a vibrant travel map / landscape scene
 * ---------------------------------------------------------------------- */
const TRAVEL_ROUTE = "M40 220 C90 180 140 198 200 160 C250 130 300 150 350 116 C380 98 410 92 444 74";

function TravelScene({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 480 280"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* sky gradient */}
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1040" />
          <stop offset="60%" stopColor="#2a2050" />
          <stop offset="100%" stopColor="#3a2a5a" />
        </linearGradient>
        <linearGradient id="sun-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BRAND.goldBright} stopOpacity="0.3" />
          <stop offset="100%" stopColor={BRAND.goldBright} stopOpacity="0" />
        </linearGradient>
        <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0 H0 V30" fill="none" stroke="#2a2740" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="480" height="280" fill="url(#sky-grad)" />
      <rect x="0" y="0" width="480" height="280" fill="url(#map-grid)" opacity={0.3} />

      {/* sun glow */}
      <motion.ellipse
        cx="240" cy="30" rx="120" ry="60"
        fill="url(#sun-glow)" opacity={0.5}
        variants={fadeIn(0.1)}
      />
      {/* sun */}
      <motion.circle
        cx="240" cy="46" r="22"
        fill={BRAND.gold}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ filter: "drop-shadow(0 0 24px rgba(228,194,115,0.5))" }}
      />

      {/* sun rays */}
      {!reduced && (
        <g opacity={0.15}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <motion.line
              key={angle}
              x1={240 + Math.cos(angle * Math.PI / 180) * 26}
              y1={46 + Math.sin(angle * Math.PI / 180) * 26}
              x2={240 + Math.cos(angle * Math.PI / 180) * 50}
              y2={46 + Math.sin(angle * Math.PI / 180) * 50}
              stroke={BRAND.goldBright} strokeWidth={1.5} strokeLinecap="round"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + angle * 0.002 }}
            />
          ))}
        </g>
      )}

      {/* clouds */}
      <g className={reduced ? undefined : "cover-drift"} opacity={0.25}>
        <rect x="60" y="50" width="80" height="10" rx="5" fill="#a1a1aa" />
        <rect x="100" y="64" width="56" height="8" rx="4" fill="#71717a" />
        <rect x="320" y="44" width="70" height="9" rx="4.5" fill="#a1a1aa" />
      </g>

      {/* mountain range — back layer */}
      <motion.path
        d="M0 200 L50 130 L100 170 L160 100 L220 160 L280 90 L340 150 L400 110 L460 160 L480 140 L480 280 L0 280 Z"
        fill={BRAND.indigo} opacity={0.35}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.35, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.3 }}
      />
      {/* mountain range — mid layer */}
      <motion.path
        d="M0 220 L70 150 L140 200 L220 120 L300 180 L370 130 L440 190 L480 160 L480 280 L0 280 Z"
        fill="#1b163f" opacity={0.8}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.5 }}
      />
      {/* mountain range — front layer */}
      <motion.path
        d="M0 240 L60 190 L130 230 L200 170 L280 220 L360 180 L430 230 L480 200 L480 280 L0 280 Z"
        fill="#120e28" opacity={0.9}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7 }}
      />

      {/* route path */}
      <motion.path
        d={TRAVEL_ROUTE}
        fill="none" stroke={BRAND.goldBright} strokeWidth={3.5}
        strokeLinecap="round" strokeDasharray="10 12"
        className={reduced ? undefined : "cover-dash"}
        variants={draw(0.6)}
      />
      {/* travelling dot */}
      {!reduced && (
        <circle
          r="6" fill={BRAND.goldBright}
          className="cover-travel"
          style={{
            offsetPath: `path("${TRAVEL_ROUTE}")`,
            filter: "drop-shadow(0 0 8px rgba(228,194,115,0.9))",
          }}
        />
      )}

      {/* destination pin */}
      <motion.g variants={fadeIn(1.4)}>
        <path d="M444 74 m0 -10 a10 10 0 1 1 -0.1 0 M444 64 v-14"
          fill="none" stroke={BRAND.goldBright} strokeWidth={3}
        />
        <circle cx="444" cy="74" r="4" fill={BRAND.goldBright} />
      </motion.g>

      {/* compass rose */}
      <motion.g opacity={0.2} variants={fadeIn(1)}>
        <circle cx="56" cy="56" r="16" fill="none" stroke={BRAND.gold} strokeWidth={1} />
        <path d="M56 36 L56 76 M36 56 L76 56" stroke={BRAND.gold} strokeWidth={0.8} />
        <path d="M56 36 L50 44 L62 44 Z" fill={BRAND.gold} />
      </motion.g>

      {/* grass / land at bottom */}
      <motion.rect
        x="0" y="250" width="480" height="30" fill="#0f0f1a" opacity={0.6}
        variants={fadeIn(1.2)}
      />

      {/* watermark */}
      <motion.text
        x="240" y="268"
        textAnchor="middle"
        fill="#27272a" fontSize="11" fontWeight="bold" letterSpacing="6"
        variants={fadeIn(1.6)}
      >
        TRAVELLING SOUTH AFRICA
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------
 * Point-Taken Group — a logistics dashboard / command center
 * ---------------------------------------------------------------------- */
const LANE = "M60 200 C130 150 190 190 260 130 C300 90 360 110 420 74";

const NODES = [
  { x: 60, y: 200, label: "CPT", delay: 0.2 },
  { x: 190, y: 168, label: "PE", delay: 0.4 },
  { x: 260, y: 130, label: "JHB", delay: 0.6 },
  { x: 340, y: 106, label: "DBN", delay: 0.8 },
  { x: 420, y: 74, label: "LUN", delay: 1.0 },
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
      {/* dark dashboard backdrop */}
      <rect x="0" y="0" width="480" height="280" fill="#0a0915" />

      {/* radar / grid overlay */}
      <defs>
        <pattern id="pt-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0 H0 V36" fill="none" stroke="#1a1840" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="480" height="280" fill="url(#pt-grid)" opacity={0.6} />

      {/* radar rings */}
      {[80, 160, 240].map((r, i) => (
        <motion.circle
          key={`ring-${i}`}
          cx="240" cy="150"
          r={r}
          fill="none"
          stroke="#2a2760" strokeWidth={0.8}
          opacity={0.3 - i * 0.08}
          variants={i === 0 ? fadeIn(0.1) : undefined}
        />
      ))}
      {!reduced && (
        <motion.circle
          cx="240" cy="150" r="240"
          fill="none" stroke={BRAND.indigoBright}
          strokeWidth={1} opacity={0.08}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "240px 150px" }}
        />
      )}

      {/* data panels (decorative dashboard UI) */}
      <motion.g variants={fadeIn(0.3)}>
        <rect x="12" y="10" width="90" height="36" rx="4" fill="#16132a" stroke="#2a2760" strokeWidth="1" />
        <rect x="16" y="16" width="36" height="6" rx="2" fill={BRAND.gold} opacity={0.6} />
        <rect x="16" y="26" width="54" height="4" rx="2" fill="#3f3f46" />
        <rect x="16" y="34" width="28" height="4" rx="2" fill="#3f3f46" />
      </motion.g>
      <motion.g variants={fadeIn(0.35)}>
        <rect x="378" y="10" width="90" height="36" rx="4" fill="#16132a" stroke="#2a2760" strokeWidth="1" />
        <rect x="430" y="16" width="8" height="8" rx="2" fill="#22c55e" opacity={0.8} />
        {!reduced && (
          <motion.rect x="430" y="16" width="8" height="8" rx="2" fill="#22c55e"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <rect x="384" y="28" width="60" height="3" rx="1.5" fill="#3f3f46" />
        <rect x="384" y="34" width="40" height="3" rx="1.5" fill="#3f3f46" />
      </motion.g>

      {/* bar chart */}
      <motion.g opacity={0.15} variants={fadeIn(0.5)}>
        {[50, 70, 40, 90, 60, 80].map((h, i) => (
          <rect key={`bar-${i}`} x={400 + i * 10} y={240 - h} width="6" height={h}
            rx="2" fill={BRAND.gold}
          />
        ))}
      </motion.g>

      {/* warehouses / buildings */}
      <motion.g variants={fadeIn(0.4)}>
        <rect x="50" y="210" width="28" height="22" rx="2" fill="#1a1640" stroke="#3a3570" strokeWidth="1" />
        <rect x="54" y="214" width="8" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
        <rect x="66" y="214" width="8" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
        <rect x="140" y="210" width="20" height="22" rx="2" fill="#1a1640" stroke="#3a3570" strokeWidth="1" />
        <rect x="144" y="214" width="6" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
        <rect x="154" y="214" width="6" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
        <rect x="280" y="210" width="24" height="22" rx="2" fill="#1a1640" stroke="#3a3570" strokeWidth="1" />
        <rect x="284" y="214" width="7" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
        <rect x="295" y="214" width="7" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
      </motion.g>

      {/* main freight lane */}
      <motion.path
        d={LANE}
        fill="none" stroke={BRAND.gold} strokeWidth={3.5}
        strokeLinecap="round" strokeDasharray="12 10"
        className={reduced ? undefined : "cover-dash"}
        variants={draw(0.4)}
      />
      {/* secondary lanes */}
      <motion.path
        d="M60 200 C120 230 200 238 280 218 C340 204 380 184 420 74 M190 168 C220 196 280 196 340 106"
        fill="none" stroke={BRAND.indigoBright} strokeWidth={1.5} opacity={0.3}
        variants={draw(1)}
      />

      {/* shipment dot */}
      {!reduced && (
        <rect width="10" height="10" rx="2" fill={BRAND.goldBright}
          className="cover-travel"
          style={{
            offsetPath: `path("${LANE}")`,
            filter: "drop-shadow(0 0 8px rgba(228,194,115,0.8))",
          }}
        />
      )}

      {/* nodes with labels */}
      {NODES.map((n) => (
        <g key={n.label}>
          <motion.circle cx={n.x} cy={n.y} r="6"
            fill="#0a0910" stroke={BRAND.goldBright} strokeWidth={2.5}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: n.delay, type: "spring" }}
          />
          {!reduced && (
            <motion.circle cx={n.x} cy={n.y} r="6"
              fill="none" stroke={BRAND.indigoBright} strokeWidth={1.5}
              animate={{ r: [6, 18], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: n.delay, ease: "easeOut" }}
            />
          )}
          <motion.text x={n.x} y={n.y + 18}
            textAnchor="middle" fill="#71717a" fontSize="6" fontWeight="bold" letterSpacing="2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: n.delay + 0.3 }}
          >
            {n.label}
          </motion.text>
        </g>
      ))}

      {/* truck icon at origin */}
      <motion.g variants={fadeIn(1.2)} opacity={0.4}>
        <rect x="50" y="192" width="16" height="8" rx="2" fill={BRAND.gold} />
        <rect x="66" y="194" width="10" height="6" rx="1" fill={BRAND.goldBright} />
        <circle cx="56" cy="202" r="3" fill="#0a0915" stroke={BRAND.gold} strokeWidth="1" />
        <circle cx="70" cy="202" r="3" fill="#0a0915" stroke={BRAND.gold} strokeWidth="1" />
      </motion.g>

      {/* watermark */}
      <motion.text
        x="240" y="268"
        textAnchor="middle"
        fill="#1a1840" fontSize="11" fontWeight="bold" letterSpacing="6"
        variants={fadeIn(1.6)}
      >
        POINT-TAKEN GROUP
      </motion.text>
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
      {!reduced && (
        <div
          aria-hidden
          className="cover-sheen pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent"
        />
      )}
    </div>
  );
}
