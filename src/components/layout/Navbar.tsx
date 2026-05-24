"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About",      href: "#about",      id: "about"      },
  { label: "Stack",      href: "#stack",      id: "stack"      },
  { label: "Projects",   href: "#projects",   id: "projects"   },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact",    href: "#contact",    id: "contact"    },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen]           = useState(false);

  // Entrance animation — slide down after hero starts
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      el,
      { y: -72, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  // Frosted glass on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section — intersection band at 20–40% of viewport height
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="#home" className="flex items-center">
          <img src="/icon.svg" alt="Saikannan Sathish" width={24} height={24} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={cn(
                  "relative font-mono text-xs tracking-widest uppercase transition-colors duration-200 group",
                  activeSection === link.id
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300",
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Resume — always visible */}
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="border-shimmer inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 md:px-4 font-mono text-xs tracking-widest uppercase text-text-secondary hover:text-accent transition-colors duration-200"
          >
            Resume ↗
          </a>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={cn(
                "h-px w-5 bg-text-primary transition-all duration-300 origin-center",
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-text-primary transition-all duration-300",
                menuOpen ? "opacity-0 scale-x-0" : ""
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-text-primary transition-all duration-300 origin-center",
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "md:hidden absolute inset-x-0 top-16 bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col px-6 py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between py-3.5 border-b border-border/40 font-mono text-xs tracking-widest uppercase transition-colors duration-150",
                  activeSection === link.id
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <span>{link.label}</span>
                <span className="text-text-tertiary text-base leading-none">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
