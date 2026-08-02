"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";

const FEATURED_TAGS = ["LangGraph", "RAG", "Groq LLaMA-3.3-70B", "FastAPI", "pgvector", "Next.js"];

const FEATURED_STATS = [
  { label: "Pipeline nodes", value: "6-node" },
  { label: "Live reports", value: "4 reports" },
  { label: "Analysis time", value: "30–90s" },
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
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, #222222 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 55%, #080808 95%)" }}
        />
        <div
          className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full blur-[160px]"
          style={{ background: "rgba(99, 102, 241, 0.12)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* ── Left: intro ── */}
          <div>
            {/* Eyebrow */}
            <div className="hero-eyebrow mb-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <p className="font-mono text-xs tracking-widest uppercase text-text-secondary">
                Available for{" "}
                <span className="text-text-primary font-medium">full-time roles</span>
                {" "}·{" "}
                <span className="text-text-primary font-medium">2026</span>
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
              <span className="text-text-primary font-medium">Early engineer</span> at{" "}
              <span className="text-text-primary font-medium">AI startups</span> — shipping{" "}
              <span className="text-text-primary font-medium">LangGraph agents</span>,{" "}
              <span className="text-text-primary font-medium">RAG pipelines</span> and{" "}
              <span className="text-text-primary font-medium">full-stack ML systems</span> to production.
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
          </div>

          {/* ── Right: featured project card ── */}
          <div className="hero-featured hidden lg:flex items-center justify-center">
            {/* Outer glow — static, behind card */}
            <div className="relative isolate">
              <div
                className="absolute -inset-6 rounded-3xl blur-2xl -z-10"
                style={{ background: "rgba(99, 102, 241, 0.07)" }}
                aria-hidden
              />

              {/* Card — float animation on this element */}
              <div
                className="relative w-full max-w-sm rounded-2xl border border-accent/20 bg-surface p-7"
                style={{ boxShadow: "0 0 0 1px rgba(99,102,241,0.05) inset" }}
              >
                {/* Top shine line */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                {/* Label */}
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-accent">
                    Featured Project
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-text-primary">
                  Gitwise AI
                </h3>
                <p className="mt-0.5 font-mono text-xs tracking-wide text-text-tertiary">
                  Agentic Code Intelligence System
                </p>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  Streams <span className="text-text-primary font-medium">real-time codebase intelligence</span> -
                  architecture mapping, security scanning and code grading with{" "}
                  <span className="text-text-primary font-medium">RAG-powered repo chat.</span>
                </p>

                {/* Stat strip */}
                <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-background/60 px-1 py-3">
                  {FEATURED_STATS.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-0.5 px-2">
                      <span className="font-mono text-xs font-semibold text-accent">{stat.value}</span>
                      <span className="font-mono text-[9px] tracking-wide text-text-tertiary text-center">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {FEATURED_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-elevated px-2.5 py-0.5 font-mono text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-5 h-px w-full bg-border" />

                {/* Links */}
                <div className="flex items-center gap-5">
                  <a
                    href="https://gitwiseai.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-accent transition-colors duration-200 hover:text-accent-light"
                  >
                    View Live ↗
                  </a>
                  <a
                    href="https://github.com/Saikannan1805/github-agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-text-tertiary transition-colors duration-200 hover:text-text-secondary"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
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
