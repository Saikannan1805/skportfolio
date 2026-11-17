"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"a"> {
  variant?: "primary" | "ghost";
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.a
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-medium",
        "transition-[background-color,color,box-shadow,translate] duration-[450ms] ease-butter",
        // Tonal fill: pale tint of the hue with deep-shade text; deepens one step and lifts on hover
        variant === "primary" &&
          "bg-soft text-on-soft hover:bg-soft-hover hover:-translate-y-px hover:shadow-[0_12px_24px_-14px_var(--color-accent)]",
        // Ghost: just text, a faint tint fades in behind it
        variant === "ghost" &&
          "text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
        className
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
