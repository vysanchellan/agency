"use client";

const CLIENTS = [
  "PanelPro Auto",
  "Travelling South Africa",
  "Point-Taken Group",
  "Lulalend",
  "Yoco",
  "SnapScan",
];

/**
 * Infinite horizontal marquee of the studio's client roster. The track holds
 * two copies of the list and a CSS keyframe slides it exactly -50%, so the
 * loop is seamless. Reduced motion pauses the animation via globals.css.
 */
export default function ClientMarquee() {
  const row = [...CLIENTS, ...CLIENTS];

  return (
    <section
      aria-label="Clients and collaborations"
      className="relative border-y border-zinc-900 bg-base-soft py-10"
    >
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-16 pr-16 will-change-transform">
          {row.map((client, i) => (
            <span
              key={`${client}-${i}`}
              aria-hidden={i >= CLIENTS.length}
              className="flex items-center gap-16 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500 transition-colors duration-300 hover:text-zinc-200"
            >
              {client}
              <span className="h-1 w-1 rounded-full bg-zinc-700" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
