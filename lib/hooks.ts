"use client";

import { useEffect, useState } from "react";

/**
 * True on touch-first devices (phones/tablets). Used to swap the expensive
 * blur-filter entrance animations for identical-looking transform/opacity
 * versions — mobile GPUs choke on animated filters, desktops don't.
 */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return coarse;
}
