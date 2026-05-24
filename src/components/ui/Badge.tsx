"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLMotionProps<"span"> {
  className?: string;
}

export default function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent/40 hover:text-text-primary",
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
}
