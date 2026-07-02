# Kassora

Marketing site for **Kassora** — a Durban-based studio giving ambitious
companies the intelligence to dominate their market. The site is the studio's
own flagship demo: every animation on it is a selling point.

> Market beyond limits.

Live portfolio: [PanelPro Auto](https://panelproauto.co.za),
[Travelling South Africa](https://travellingsouthafrica.co.za),
[Point-Taken Group](https://pointtaken.co.za).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (+ tailwindcss-animate)
- **Framer Motion** — entrances, scroll progress, parallax, magnetic button, tilt, count-up
- **GSAP** + ScrollTrigger + SplitText — pinned horizontal work showcase, scrubbed testimonial reveal
- **Lenis** — inertia smooth scrolling, driven by the GSAP ticker
- **SVG brand animation** — the Kassora "K" traces itself on, fills with the
  gold/indigo brand gradients, then floats with a breathing glow, shimmer
  sweeps, and cursor parallax (`components/brand/LogoReveal.tsx`)

## Run it

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build && npm start
```

## Deploy

Zero backend, zero env vars. Push to GitHub and import into
[Vercel](https://vercel.com/new) — the defaults just work.

## Where things live

```
app/                    layout (Lenis provider, cursor glow, scroll progress), page, global CSS
components/animations/  ScrollReveal, TextReveal, Parallax, MagneticButton,
                        CursorGlow, CountUp, TiltCard, ScrollProgress
components/brand/       KassoraMark (SVG logo), LogoReveal (hero animation)
components/sections/    SiteHeader, Hero, ClientMarquee, WorkShowcase (pinned),
                        Capabilities (bento), Process, Stats, Testimonial, ContactCTA
lib/animations.ts       shared easing, springs, stagger configs, and variants
```

## Accessibility & performance

- `prefers-reduced-motion` is respected everywhere: Lenis switches to native
  scroll, the pinned showcase becomes a plain horizontal scroller, text
  reveals collapse to fades, and the logo renders fully formed with a fade.
- All animation is transform/opacity only; pointer listeners are
  rAF-throttled; zero WebGL, zero external media — the hero brand film is
  pure SVG + Framer Motion.
