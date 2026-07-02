"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import {
  fadeOnly,
  staggerContainer,
  STAGGER,
  textRevealItem,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Seconds before the first unit animates. */
  delay?: number;
  /** Split granularity. */
  per?: "word" | "char";
  once?: boolean;
};

/**
 * Splits a string into words or characters and reveals each unit with a
 * staggered rise out of an overflow clip, blurring from soft to sharp.
 * Screen readers get the intact string via aria-label; the split spans are
 * hidden from the accessibility tree.
 */
export default function TextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  per = "word",
  once = true,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const stagger = per === "char" ? STAGGER.chars : STAGGER.words;

  if (reduced) {
    return (
      <Tag className={className}>
        <motion.span
          className="inline-block"
          variants={fadeOnly}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          transition={{ delay }}
        >
          {text}
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag className={cn("inline-block", className)} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={staggerContainer(stagger, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-8% 0px" }}
      >
        {words.map((word, wi) => (
          <span
            key={`${word}-${wi}`}
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          >
            {per === "char" ? (
              Array.from(word).map((char, ci) => (
                <motion.span
                  key={ci}
                  variants={textRevealItem}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              ))
            ) : (
              <motion.span
                variants={textRevealItem}
                className="inline-block will-change-transform"
              >
                {word}
              </motion.span>
            )}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
