"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import SmoothScrollProvider from "./SmoothScrollProvider";

/**
 * Global client-side providers. MotionConfig reducedMotion="user" makes every
 * Framer Motion transform animation respect the OS-level preference, on top
 * of the per-component useReducedMotion guards.
 */
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionConfig>
  );
}
