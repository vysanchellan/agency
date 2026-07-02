"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  maxTilt?: number;
};

/**
 * 3D tilt-toward-cursor hover. Tracks the pointer within the card bounds and
 * rotates the card on X/Y through springs, resetting smoothly on leave.
 * pointermove work is throttled to one update per frame; only transform is
 * animated so the effect stays compositor-only. Disabled for reduced motion.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 7,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  const rotateX = useSpring(useMotionValue(0), SPRING.tilt);
  const rotateY = useSpring(useMotionValue(0), SPRING.tilt);

  function handlePointerMove(e: React.PointerEvent) {
    if (reduced || !ref.current || frame.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    frame.current = requestAnimationFrame(() => {
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * maxTilt * 2);
      rotateX.set(-py * maxTilt * 2);
      frame.current = 0;
    });
  }

  function handlePointerLeave() {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("h-full will-change-transform", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
