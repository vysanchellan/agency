"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";
import { SPRING } from "@/lib/animations";

/**
 * A soft radial glow that trails the cursor across the page's dark surface.
 * pointermove is throttled to one update per animation frame, and the glow
 * position runs through springs so it drifts rather than snaps.
 * Hidden entirely under reduced motion and on touch devices (the glow simply
 * never receives a pointermove).
 */
export default function CursorGlow() {
  const reduced = useReducedMotion();

  // Start far off-screen so nothing flashes before the first pointer event.
  const x = useMotionValue(-1200);
  const y = useMotionValue(-1200);
  const glowX = useSpring(x, SPRING.glow);
  const glowY = useSpring(y, SPRING.glow);

  const background = useMotionTemplate`
    radial-gradient(560px circle at ${glowX}px ${glowY}px,
      rgba(194, 154, 69, 0.09),
      rgba(139, 127, 224, 0.05) 38%,
      rgba(46, 39, 120, 0.04) 62%,
      transparent 78%)
  `;

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const onPointerMove = (e: PointerEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        x.set(clientX);
        y.set(clientY);
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background }}
    />
  );
}
