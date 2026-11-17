"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLMotionProps<"span"> {
  className?: string;
}

export default function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center rounded-full bg-surface-elevated px-3 py-1 font-mono text-xs text-text-secondary transition-colors duration-[450ms] ease-butter hover:bg-soft hover:text-text-primary",
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
}
