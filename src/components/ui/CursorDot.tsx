"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(-40);
  const rawY = useMotionValue(-40);

  const x = useSpring(rawX, { stiffness: 400, damping: 28, mass: 0.25 });
  const y = useSpring(rawY, { stiffness: 400, damping: 28, mass: 0.25 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    const dot = dotRef.current;
    if (dot) dot.style.display = "block";

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed z-[9998] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70 mix-blend-screen"
      style={{ left: x, top: y }}
    />
  );
}
