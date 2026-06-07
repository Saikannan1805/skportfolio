"use client";

import { motion } from "framer-motion";

export default function LinkedInButton() {
  return (
    <motion.a
      href="https://www.linkedin.com/in/saikannansathish/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
      whileHover="hovered"
      className="border-shimmer fixed bottom-6 right-6 z-50 flex items-center overflow-hidden rounded-full bg-surface backdrop-blur-sm"
      style={{ boxShadow: "0 0 16px rgba(99, 102, 241, 0.35), 0 0 32px rgba(99, 102, 241, 0.15)" }}
    >
      {/* Icon */}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 text-[#0A66C2]"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </span>

      {/* Expanding label */}
      <motion.span
        variants={{
          hovered: { width: "auto", paddingRight: "14px", opacity: 1 },
        }}
        initial={{ width: 0, paddingRight: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="whitespace-nowrap font-mono text-xs tracking-widest uppercase text-text-secondary"
      >
        LinkedIn
      </motion.span>
    </motion.a>
  );
}
