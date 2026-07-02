import type { Transition, Variants } from "framer-motion";

/* ---------------------------------------------------------------------------
 * Shared animation vocabulary for Kassora Labs.
 * Every section pulls timing, easing, and spring physics from here so the
 * whole site moves with one voice.
 * ------------------------------------------------------------------------ */

/** Expo-style ease-out used for nearly every entrance. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.5,
  base: 0.9,
  slow: 1.4,
} as const;

export const SPRING = {
  /** Magnetic button pull — light mass so it snaps to the cursor. */
  magnetic: {
    type: "spring",
    stiffness: 180,
    damping: 16,
    mass: 0.2,
  } satisfies Transition,
  /** Card tilt — heavier damping so the card settles without wobble. */
  tilt: {
    type: "spring",
    stiffness: 200,
    damping: 24,
    mass: 0.6,
  } satisfies Transition,
  /** Cursor glow trailing the pointer. */
  glow: { stiffness: 160, damping: 28, mass: 0.9 },
  /** Scroll progress bar. */
  progress: { stiffness: 140, damping: 30, restDelta: 0.001 },
};

export const STAGGER = {
  words: 0.055,
  chars: 0.02,
  grid: 0.09,
  steps: 0.13,
} as const;

/** Fade + rise + blur-to-sharp. The house entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/**
 * Same entrance as fadeUp but without the blur filter — visually near
 * identical, dramatically cheaper on mobile GPUs. Swapped in on touch
 * devices via useCoarsePointer.
 */
export const fadeUpLite: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/** Reduced-motion fallback — a plain fade, no movement, no blur. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast } },
};

/** Word/char reveal used by TextReveal — rises out of an overflow clip. */
export const textRevealItem: Variants = {
  hidden: { y: "115%", opacity: 0, filter: "blur(8px)" },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/** Blur-free variant of the word reveal for touch devices. */
export const textRevealItemLite: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/** Clip-path wipe for showcase imagery. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

/** Parent orchestrator — stagger children with an optional lead-in delay. */
export const staggerContainer = (
  stagger: number = STAGGER.grid,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});
