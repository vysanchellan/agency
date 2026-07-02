# Kassora Labs

Marketing site for **Kassora Labs** — a Durban-based studio building brand
identity, web experience, and product design. The site is the studio's own
flagship demo: every animation on it is a selling point.

> We build the internet's most alive websites.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (+ tailwindcss-animate)
- **Framer Motion** — entrances, scroll progress, parallax, magnetic button, tilt, count-up
- **GSAP** + ScrollTrigger + SplitText — pinned horizontal work showcase, scrubbed testimonial reveal
- **Lenis** — inertia smooth scrolling, driven by the GSAP ticker
- **Three.js** + React Three Fiber + Drei + Postprocessing — hero blob with `MeshDistortMaterial`, Lightformer environment, contact shadows, bloom

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
components/sections/    Hero, ClientMarquee, WorkShowcase (pinned), Capabilities (bento),
                        Process, Stats, Testimonial, ContactCTA
components/three/       React Three Fiber scenes (kept out of UI components)
lib/animations.ts       shared easing, springs, stagger configs, and variants
```

## Accessibility & performance

- `prefers-reduced-motion` is respected everywhere: Lenis switches to native
  scroll, the pinned showcase becomes a plain horizontal scroller, text
  reveals collapse to fades, and the 3D blob stops morphing.
- All animation is transform/opacity only; pointer listeners are
  rAF-throttled; the WebGL canvas is lazy-loaded client-side.
