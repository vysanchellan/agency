"use client";

import { BRAND } from "@/components/brand/KassoraMark";

export type CoverId = "panelpro" | "travelsa" | "pointtaken";

/* -------------------------------------------------------------------------
 * PanelPro Auto — garage workshop scene with car on lift
 * ---------------------------------------------------------------------- */
function PanelProScene() {
  return (
    <svg viewBox="0 0 480 280" className="h-full w-full">
      {/* wall */}
      <rect x="0" y="0" width="480" height="200" fill="#181621" />
      <rect x="0" y="200" width="480" height="80" fill="#100e18" />

      {/* fluorescent lights */}
      <rect x="40" y="6" width="100" height="8" rx="4" fill="#3f3f46" />
      <rect x="44" y="8" width="92" height="4" rx="2" fill="#e4c273" opacity={0.5} />
      <rect x="190" y="6" width="100" height="8" rx="4" fill="#3f3f46" />
      <rect x="194" y="8" width="92" height="4" rx="2" fill="#e4c273" opacity={0.5} />
      <rect x="340" y="6" width="100" height="8" rx="4" fill="#3f3f46" />
      <rect x="344" y="8" width="92" height="4" rx="2" fill="#e4c273" opacity={0.5} />

      {/* tool pegboard */}
      <rect x="8" y="30" width="40" height="160" rx="3" fill="#2a2735" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={`shelf-${i}`} x="12" y={40 + i * 32} width="32" height="2" rx="1" fill="#3f3f46" />
      ))}
      <rect x="16" y="44" width="4" height="20" rx="1" fill="#71717a" />
      <rect x="28" y="48" width="4" height="16" rx="1" fill="#a1a1aa" />
      <rect x="20" y="80" width="3" height="24" rx="1" fill="#8f6f2c" />
      <rect x="16" y="112" width="6" height="6" rx="1" fill="#c29a45" />
      <rect x="28" y="116" width="4" height="14" rx="1" fill="#71717a" />

      {/* spray paint glow */}
      <circle cx="120" cy="140" r="50" fill={BRAND.gold} opacity={0.1} style={{ filter: "blur(20px)" }} />
      <circle cx="360" cy="160" r="60" fill={BRAND.indigoBright} opacity={0.08} style={{ filter: "blur(24px)" }} />

      {/* car body outline */}
      <path d="M56 176 C56 158 70 140 90 136 L110 132 C130 126 150 122 180 118 C226 112 276 114 316 124 C346 132 370 148 396 158 C412 164 424 170 432 176"
        fill="none" stroke={BRAND.gold} strokeWidth={3} strokeLinecap="round"
      />
      {/* rocker panel */}
      <path d="M76 176 L416 176" fill="none" stroke={BRAND.goldBright} strokeWidth={4} strokeLinecap="round" />
      {/* hood */}
      <path d="M170 116 L260 112 C290 110 310 118 330 130" fill="none" stroke={BRAND.gold} strokeWidth={2.5} strokeLinecap="round" />
      {/* windshield */}
      <path d="M105 134 L136 118 C146 114 158 112 168 112" fill="none" stroke="#a1a1aa" strokeWidth={2} strokeLinecap="round" />
      {/* rear window */}
      <path d="M350 124 C370 130 390 142 400 150" fill="none" stroke="#a1a1aa" strokeWidth={2} strokeLinecap="round" />
      {/* wheels */}
      <circle cx="130" cy="176" r="20" fill="none" stroke={BRAND.goldBright} strokeWidth={4} />
      <circle cx="130" cy="176" r="8" fill="none" stroke="#71717a" strokeWidth={2} />
      <circle cx="340" cy="176" r="20" fill="none" stroke={BRAND.goldBright} strokeWidth={4} />
      <circle cx="340" cy="176" r="8" fill="none" stroke="#71717a" strokeWidth={2} />
      {/* headlight */}
      <circle cx="98" cy="140" r="4" fill={BRAND.goldBright} opacity={0.8} />
      <circle cx="98" cy="140" r="10" fill={BRAND.goldBright} opacity={0.1} style={{ filter: "blur(4px)" }} />
      {/* taillight */}
      <circle cx="432" cy="148" r="3" fill="#ef4444" opacity={0.9} />
      <circle cx="432" cy="148" r="8" fill="#ef4444" opacity={0.08} style={{ filter: "blur(4px)" }} />
      {/* pinstripe */}
      <path d="M200 120 C240 116 280 118 310 126" fill="none" stroke={BRAND.goldDeep} strokeWidth={1.5} strokeLinecap="round" />

      {/* lift arms */}
      <path d="M60 230 L60 180 M420 230 L420 180" fill="none" stroke="#52525b" strokeWidth={4} strokeLinecap="round" />
      <path d="M50 230 L430 230" fill="none" stroke="#3f3f46" strokeWidth={3} strokeLinecap="round" />

      {/* floor line */}
      <line x1="0" y1="232" x2="480" y2="232" stroke="#27272a" strokeWidth="1" />

      {/* watermark */}
      <text x="240" y="260" textAnchor="middle" fill="#27272a" fontSize="14" fontWeight="bold" letterSpacing="8">
        PANELPRO AUTO
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------
 * Travelling South Africa — layered landscape with route map
 * ---------------------------------------------------------------------- */
function TravelScene() {
  return (
    <svg viewBox="0 0 480 280" className="h-full w-full">
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

      <rect width="480" height="280" fill="url(#sky-grad)" />
      <rect width="480" height="280" fill="url(#map-grid)" opacity={0.3} />

      {/* sun glow */}
      <ellipse cx="240" cy="30" rx="120" ry="60" fill="url(#sun-glow)" opacity={0.5} />
      {/* sun */}
      <circle cx="240" cy="46" r="22" fill={BRAND.gold} style={{ filter: "drop-shadow(0 0 24px rgba(228,194,115,0.5))" }} />

      {/* mountain back */}
      <path d="M0 200 L50 130 L100 170 L160 100 L220 160 L280 90 L340 150 L400 110 L460 160 L480 140 L480 280 L0 280 Z" fill={BRAND.indigo} opacity={0.35} />
      {/* mountain mid */}
      <path d="M0 220 L70 150 L140 200 L220 120 L300 180 L370 130 L440 190 L480 160 L480 280 L0 280 Z" fill="#1b163f" opacity={0.8} />
      {/* mountain front */}
      <path d="M0 240 L60 190 L130 230 L200 170 L280 220 L360 180 L430 230 L480 200 L480 280 L0 280 Z" fill="#120e28" opacity={0.9} />

      {/* route path */}
      <path d="M40 220 C90 180 140 198 200 160 C250 130 300 150 350 116 C380 98 410 92 444 74"
        fill="none" stroke={BRAND.goldBright} strokeWidth={3.5} strokeLinecap="round"
        strokeDasharray="10 12"
      />
      {/* destination pin */}
      <path d="M444 74 m0 -10 a10 10 0 1 1 -0.1 0 M444 64 v-14" fill="none" stroke={BRAND.goldBright} strokeWidth={3} />
      <circle cx="444" cy="74" r="4" fill={BRAND.goldBright} />

      {/* compass */}
      <circle cx="56" cy="56" r="16" fill="none" stroke={BRAND.gold} strokeWidth={1} opacity={0.2} />
      <path d="M56 36 L56 76 M36 56 L76 56" stroke={BRAND.gold} strokeWidth={0.8} opacity={0.2} />
      <path d="M56 36 L50 44 L62 44 Z" fill={BRAND.gold} opacity={0.2} />

      {/* bottom land */}
      <rect x="0" y="250" width="480" height="30" fill="#0f0f1a" opacity={0.6} />

      {/* watermark */}
      <text x="240" y="268" textAnchor="middle" fill="#27272a" fontSize="11" fontWeight="bold" letterSpacing="6">
        TRAVELLING SOUTH AFRICA
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------
 * Point-Taken Group — logistics command center dashboard
 * ---------------------------------------------------------------------- */
function PointTakenScene() {
  return (
    <svg viewBox="0 0 480 280" className="h-full w-full">
      {/* bg */}
      <rect width="480" height="280" fill="#0a0915" />

      <defs>
        <pattern id="pt-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0 H0 V36" fill="none" stroke="#1a1840" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="480" height="280" fill="url(#pt-grid)" opacity={0.6} />

      {/* radar rings */}
      <circle cx="240" cy="150" r="240" fill="none" stroke="#2a2760" strokeWidth={0.8} opacity={0.22} />
      <circle cx="240" cy="150" r="160" fill="none" stroke="#2a2760" strokeWidth={0.8} opacity={0.14} />
      <circle cx="240" cy="150" r="80" fill="none" stroke="#2a2760" strokeWidth={0.8} opacity={0.08} />

      {/* data panels */}
      <rect x="12" y="10" width="90" height="36" rx="4" fill="#16132a" stroke="#2a2760" strokeWidth="1" />
      <rect x="16" y="16" width="36" height="6" rx="2" fill={BRAND.gold} opacity={0.6} />
      <rect x="16" y="26" width="54" height="4" rx="2" fill="#3f3f46" />
      <rect x="16" y="34" width="28" height="4" rx="2" fill="#3f3f46" />

      <rect x="378" y="10" width="90" height="36" rx="4" fill="#16132a" stroke="#2a2760" strokeWidth="1" />
      <rect x="430" y="16" width="8" height="8" rx="2" fill="#22c55e" opacity={0.8} />
      <rect x="384" y="28" width="60" height="3" rx="1.5" fill="#3f3f46" />
      <rect x="384" y="34" width="40" height="3" rx="1.5" fill="#3f3f46" />

      {/* bar chart */}
      <g opacity={0.15}>
        {[50, 70, 40, 90, 60, 80].map((h, i) => (
          <rect key={`bar-${i}`} x={400 + i * 10} y={240 - h} width="6" height={h} rx="2" fill={BRAND.gold} />
        ))}
      </g>

      {/* warehouses */}
      <rect x="50" y="210" width="28" height="22" rx="2" fill="#1a1640" stroke="#3a3570" strokeWidth="1" />
      <rect x="54" y="214" width="8" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
      <rect x="66" y="214" width="8" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
      <rect x="140" y="210" width="20" height="22" rx="2" fill="#1a1640" stroke="#3a3570" strokeWidth="1" />
      <rect x="144" y="214" width="6" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
      <rect x="154" y="214" width="6" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
      <rect x="280" y="210" width="24" height="22" rx="2" fill="#1a1640" stroke="#3a3570" strokeWidth="1" />
      <rect x="284" y="214" width="7" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />
      <rect x="295" y="214" width="7" height="6" rx="1" fill={BRAND.gold} opacity={0.4} />

      {/* freight lane */}
      <path d="M60 200 C130 150 190 190 260 130 C300 90 360 110 420 74"
        fill="none" stroke={BRAND.gold} strokeWidth={3.5} strokeLinecap="round"
        strokeDasharray="12 10"
      />
      {/* secondary lanes */}
      <path d="M60 200 C120 230 200 238 280 218 C340 204 380 184 420 74 M190 168 C220 196 280 196 340 106"
        fill="none" stroke={BRAND.indigoBright} strokeWidth={1.5} opacity={0.3}
      />

      {/* nodes */}
      {[
        { x: 60, y: 200, label: "CPT" },
        { x: 190, y: 168, label: "PE" },
        { x: 260, y: 130, label: "JHB" },
        { x: 340, y: 106, label: "DBN" },
        { x: 420, y: 74, label: "LUN" },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="6" fill="#0a0910" stroke={BRAND.goldBright} strokeWidth={2.5} />
          <text x={n.x} y={n.y + 18} textAnchor="middle" fill="#71717a" fontSize="6" fontWeight="bold" letterSpacing="2">
            {n.label}
          </text>
        </g>
      ))}

      {/* truck */}
      <g opacity={0.4}>
        <rect x="50" y="192" width="16" height="8" rx="2" fill={BRAND.gold} />
        <rect x="66" y="194" width="10" height="6" rx="1" fill={BRAND.goldBright} />
        <circle cx="56" cy="202" r="3" fill="#0a0915" stroke={BRAND.gold} strokeWidth="1" />
        <circle cx="70" cy="202" r="3" fill="#0a0915" stroke={BRAND.gold} strokeWidth="1" />
      </g>

      {/* watermark */}
      <text x="240" y="268" textAnchor="middle" fill="#1a1840" fontSize="11" fontWeight="bold" letterSpacing="6">
        POINT-TAKEN GROUP
      </text>
    </svg>
  );
}

const SCENES: Record<CoverId, () => React.ReactElement> = {
  panelpro: PanelProScene,
  travelsa: TravelScene,
  pointtaken: PointTakenScene,
};

export default function ProjectCover({ id }: { id: CoverId }) {
  const Scene = SCENES[id];
  return (
    <div className="absolute inset-0">
      <Scene />
      <div
        aria-hidden
        className="cover-sheen pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent"
      />
    </div>
  );
}
