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
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-200 px-6 py-3",
        variant === "primary" &&
          "bg-accent text-white hover:bg-accent-light shadow-lg shadow-accent/20 hover:shadow-accent/30",
        variant === "ghost" &&
          "border border-border text-text-secondary hover:border-accent hover:text-accent",
        className
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
