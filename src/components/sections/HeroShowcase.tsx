"use client";

import React, { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const B = ({ children }: { children: ReactNode }) => (
  <span className="text-text-primary font-medium">{children}</span>
);

interface ShowcaseLink {
  label: string;
  href: string;
  external?: boolean;
  tone: "accent" | "muted";
}

interface ShowcaseTab {
  id: string;
  label: string;
  live?: boolean;
  title: string;
  subtitle: string;
  description: ReactNode;
  stats: { value: string; label: string }[];
  tags: string[];
  links: ShowcaseLink[];
}

const TABS: ShowcaseTab[] = [
  {
    id: "featured",
    label: "Featured project",
    title: "Gitwise",
    subtitle: "AI Codebase Intelligence",
    description: (
      <>
        Point it at any GitHub repo. Get its{" "}
        <B>architecture, security risks and code grade in under 90 seconds</B>, then{" "}
        <B>chat with the code</B> and get file and line citations.
      </>
    ),
    stats: [
      { value: "6-node",     label: "Agent pipeline" },
      { value: "< 90s",      label: "Full repo analysis" },
      { value: "Line-level", label: "Cited answers" },
    ],
    tags: ["LangGraph", "RAG", "Groq LLaMA-3.3-70B", "FastAPI", "pgvector", "Next.js"],
    links: [
      { label: "View Live ↗", href: "https://gitwiseai.vercel.app", external: true, tone: "accent" },
      { label: "GitHub ↗", href: "https://github.com/Saikannan1805/github-agent", external: true, tone: "muted" },
    ],
  },
  {
    id: "building",
    label: "Now building",
    live: true,
    title: "Real-time Voice Agent",
    subtitle: "at Colaberry",
    description: (
      <>
        A voice agent that holds natural conversations in English and 5 Indian languages and takes
        actions through tools mid-call.
      </>
    ),
    stats: [
      { value: "6",      label: "Languages" },
      { value: "870 ms", label: "Median reply" },
      { value: "43.5%",  label: "Faster than baseline" },
    ],
    tags: ["LiveKit", "WebRTC", "LangGraph", "MCP", "OpenAI"],
    links: [{ label: "Read More ↓", href: "#exp-colaberry", tone: "accent" }],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Panel({ tab, active }: { tab: ShowcaseTab; active: boolean }) {
  return (
    <div
      id={`hero-panel-${tab.id}`}
      role="tabpanel"
      aria-labelledby={`hero-tab-${tab.id}`}
      tabIndex={active ? 0 : -1}
      // Inactive panel stays in the grid cell (so the card keeps the taller panel's height)
      // but is invisible, so it is skipped by screen readers and keyboard focus.
      className={cn(
        "col-start-1 row-start-1 flex flex-col rounded-lg outline-none",
        "transition-[opacity,translate,visibility] duration-500 ease-butter",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface",
        active ? "visible translate-y-0 opacity-100" : "invisible translate-y-1.5 opacity-0"
      )}
    >
      <h3 className="font-display text-2xl font-bold text-text-primary">{tab.title}</h3>
      <p className="mt-0.5 font-mono text-xs tracking-wide text-text-tertiary">{tab.subtitle}</p>

      <p className="mt-4 text-sm leading-relaxed text-text-secondary">{tab.description}</p>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-xl bg-surface-elevated py-3">
        {tab.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 px-2 text-center">
            <span className="font-display text-base font-bold leading-none text-accent">{stat.value}</span>
            <span className="text-[11px] leading-tight text-text-tertiary">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tab.tags.map((tag) => (
          <span key={tag} className="rounded-lg bg-surface-elevated px-2.5 py-1 text-xs text-text-secondary">
            {tag}
          </span>
        ))}
      </div>

      {/* Links pinned to the bottom so both panels align */}
      <div className="mt-auto pt-5">
        <div className="flex items-center gap-5 border-t border-border-subtle pt-5">
          {tab.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              tabIndex={active ? undefined : -1}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-[450ms] ease-butter hover:text-text-primary",
                link.tone === "accent" ? "text-accent" : "text-text-tertiary"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  // WAI-ARIA tabs: arrows move + activate, Home/End jump to the ends
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = TABS.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1) :
      e.key === "ArrowLeft"  ? (active === 0 ? last : active - 1) :
      e.key === "Home"       ? 0 :
      e.key === "End"        ? last : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
  };

  return (
    <div className="relative w-full max-w-sm rounded-2xl bg-surface p-7 shadow-soft-lg">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Highlights"
        onKeyDown={onKeyDown}
        className="mb-6 inline-flex rounded-full bg-surface-elevated p-1"
      >
        {TABS.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              id={`hero-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`hero-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-widest uppercase outline-none",
                "transition-colors duration-[450ms] ease-butter",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated",
                selected ? "text-accent" : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="hero-tab-pill"
                  className="absolute inset-0 rounded-full bg-surface shadow-soft"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              )}
              {tab.live && (
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pop" />
                </span>
              )}
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panels share one grid cell → stable height */}
      <div className="grid">
        {TABS.map((tab, i) => (
          <Panel key={tab.id} tab={tab} active={i === active} />
        ))}
      </div>
    </div>
  );
}
