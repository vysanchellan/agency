"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  /** How strongly the button follows the cursor (0–1). */
  strength?: number;
  onClick?: () => void;
};

/**
 * A button that pulls toward the cursor while hovered and springs back to
 * center on leave. Renders an anchor when href is given. Under reduced
 * motion the pull is disabled entirely.
 */
export default function MagneticButton({
  children,
  className,
  href,
  strength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING.magnetic);
  const springY = useSpring(y, SPRING.magnetic);

  function handlePointerMove(e: React.PointerEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedClass = cn(
    "group relative inline-flex cursor-pointer items-center gap-3 rounded-full",
    "bg-zinc-50 px-8 py-4 text-base font-semibold text-zinc-950",
    "transition-colors duration-300 hover:bg-emerald-300",
    "will-change-transform select-none",
    className,
  );

  const style = { x: springX, y: springY };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        style={style}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={sharedClass}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className={sharedClass}
    >
      {children}
    </motion.button>
  );
}
