"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import HeroShowcase from "./HeroShowcase";

const IMPACT = [
  { value: "43.5%",    label: "faster voice replies",    company: "Colaberry",  href: "#exp-colaberry" },
  { value: "40%",      label: "fewer hallucinations",    company: "PiSence",    href: "#exp-pisence"   },
  { value: "80%",      label: "lower LLM cost",          company: "PiSence",    href: "#exp-pisence"   },
  { value: "< 100 ms", label: "recommendation latency",  company: "Uplifty AI", href: "#exp-uplifty"   },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set([
        ".hero-eyebrow",
        ".hero-name-word",
        ".hero-meta",
        ".hero-bio",
        ".hero-divider",
        ".hero-cta",
        ".hero-impact",
        ".hero-scroll",
        ".hero-featured",
      ], { opacity: 0 });

      gsap.set(".hero-name-word", { yPercent: 110 });
      gsap.set(".hero-divider",   { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero-featured",  { x: 48 });

      const tl = gsap.timeline({ delay: 0.25 });

      tl.to(".hero-eyebrow", { opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(
          ".hero-name-word",
          { yPercent: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power4.out" },
          "-=0.2"
        )
        .to(
          ".hero-featured",
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .to(
          ".hero-meta",
          { opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out" },
          "-=0.6"
        )
        .to(".hero-bio",     { opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(".hero-divider", { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, "-=0.3")
        .to(
          ".hero-cta",
          { opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-impact",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: "power3.out", clearProps: "transform" },
          "-=0.25"
        )
        .to(".hero-scroll", { opacity: 1, duration: 0.5, ease: "power2.out" }, "+=0.1");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* ── Left: intro ── */}
          <div>
            {/* Eyebrow */}
            <div className="hero-eyebrow mb-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pop" />
              </span>
              <p className="font-mono text-xs tracking-widest uppercase text-text-secondary">
                Available for{" "}
                <span className="text-text-primary font-medium">full-time roles</span>
                {" "}·{" "}
                <span className="text-text-primary font-medium">Dec 2026</span>
              </p>
            </div>

            {/* Name */}
            <h1 className="font-display font-bold leading-[0.9] tracking-tight text-text-primary text-[clamp(2.5rem,5.5vw,6rem)]">
              {["Saikannan", "Sathish"].map((word) => (
                <span key={word} className="block overflow-hidden py-1">
                  <span className="hero-name-word inline-block">{word}</span>
                </span>
              ))}
            </h1>

            {/* Role + degree + location */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="hero-meta font-sans text-lg font-light text-text-secondary">
                AI Engineer · Software Engineer
              </span>
              <span className="hero-meta hidden h-1 w-1 rounded-full bg-text-tertiary sm:block" />
              <span className="hero-meta font-sans text-lg font-light text-text-secondary">
                MS CS · Binghamton University
              </span>
              <span className="hero-meta hidden h-1 w-1 rounded-full bg-text-tertiary sm:block" />
              <span className="hero-meta font-mono text-sm text-text-tertiary">
                New York, USA
              </span>
            </div>

            {/* Bio */}
            <p className="hero-bio mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
              I build <span className="text-text-primary font-medium">real-time voice agents</span>,{" "}
              <span className="text-text-primary font-medium">LangGraph agents</span> and{" "}
              <span className="text-text-primary font-medium">RAG pipelines</span>, and I measure every
              one before I ship it.
            </p>

            {/* Divider */}
            <div className="hero-divider my-8 h-px w-16 bg-border" />

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button className="hero-cta" href="#projects" variant="primary">
                View Work
              </Button>
              <Button className="hero-cta" href="#contact" variant="ghost">
                Let&apos;s Talk
              </Button>
            </div>

            {/* Impact strip — each tile jumps to its experience card */}
            <ul className="mt-10 grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Impact highlights">
              {IMPACT.map((item) => (
                <li key={item.value + item.label} className="hero-impact">
                  <a
                    href={item.href}
                    aria-label={`${item.value} ${item.label} at ${item.company}: view experience`}
                    className="group block h-full rounded-xl px-3 py-3 transition-[background-color,box-shadow,translate] duration-[450ms] ease-butter hover:-translate-y-0.5 hover:bg-surface/80 hover:shadow-soft"
                  >
                    <span className="block whitespace-nowrap font-display text-2xl font-bold leading-none text-text-primary transition-colors duration-[450ms] ease-butter group-hover:text-accent">
                      {item.value}
                    </span>
                    <span className="mt-2 block text-sm leading-snug text-text-secondary">{item.label}</span>
                    <span className="mt-1.5 block font-mono text-[11px] tracking-wide text-text-tertiary">
                      {item.company}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: featured project card ── */}
          <div className="hero-featured hidden lg:flex items-center justify-center">
            {/* Outer glow — static, behind card */}
            <div className="relative isolate">
              <div
                className="absolute -inset-6 rounded-3xl blur-2xl -z-10"
                style={{ background: "color-mix(in srgb, var(--color-accent-light) 10%, transparent)" }}
                aria-hidden
              />

              <HeroShowcase />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[float_4s_ease-in-out_infinite]">
        <div className="h-10 w-px bg-gradient-to-b from-border to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">
          Scroll
        </span>
      </div>
    </section>
  );
}
