import { cn } from "@/lib/utils";

/**
 * The Kassora "K" drawn as SVG paths so it scales crisply and can be
 * animated stroke-by-stroke. Three shapes, mirroring the brand mark:
 *  - gold stem (with the notched inner edge)
 *  - gold diagonal sweeping into the bottom-left tail
 *  - deep-indigo chevron slotted into the lower-right quadrant
 */

export const KASSORA_PATHS = {
  stem: "M150 140 H258 L212 192 V238 L198 252 V336 Q194 378 150 412 Z",
  sweep:
    "M448 140 H336 L204 292 Q158 342 166 402 L182 462 Q170 398 220 344 L448 140 Z",
  chevron: "M218 470 L330 332 L446 470 H374 L330 416 L286 470 Z",
} as const;

export const BRAND = {
  gold: "#C29A45",
  goldBright: "#E4C273",
  goldDeep: "#8F6F2C",
  indigo: "#2E2778",
  indigoBright: "#8B7FE0",
} as const;

type KassoraMarkProps = {
  className?: string;
  title?: string;
};

export default function KassoraMark({
  className,
  title = "Kassora",
}: KassoraMarkProps) {
  return (
    <svg
      viewBox="120 110 360 390"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="kassora-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND.goldBright} />
          <stop offset="55%" stopColor={BRAND.gold} />
          <stop offset="100%" stopColor={BRAND.goldDeep} />
        </linearGradient>
        <linearGradient id="kassora-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#443A9E" />
          <stop offset="100%" stopColor={BRAND.indigo} />
        </linearGradient>
      </defs>
      <path d={KASSORA_PATHS.stem} fill="url(#kassora-gold)" />
      <path d={KASSORA_PATHS.sweep} fill="url(#kassora-gold)" />
      <path d={KASSORA_PATHS.chevron} fill="url(#kassora-indigo)" />
    </svg>
  );
}
