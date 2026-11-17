"use client";

import { useRef, useEffect, type ReactNode, type MouseEvent } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

/* ── Category icons (24×24, stroke = currentColor) ── */
const ICONS: Record<string, ReactNode> = {
  ai: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </>
  ),
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />,
};

interface SubGroup {
  name: string;
  items: string[];
}

interface StackGroup {
  category: string;
  caption: string;
  icon: keyof typeof ICONS;
  /** Either a flat list of items, or labelled sub-groups */
  items?: string[];
  groups?: SubGroup[];
  /** Pinned to the bottom of the card */
  footnote?: string;
  /** Grid placement for the bento layout */
  span?: string;
}

const STACK: StackGroup[] = [
  {
    category: "AI/ML & LLM",
    caption: "Agents, retrieval, voice and the models underneath",
    icon: "ai",
    groups: [
      { name: "Agents & LLMs",          items: ["LangGraph", "LangChain", "AI Agents", "MCP", "OpenAI", "Groq", "LLaMA"] },
      { name: "Retrieval & Evaluation", items: ["RAG", "BM25", "LLM Evaluation", "RAGAS"] },
      { name: "Voice",                  items: ["LiveKit", "WebRTC", "STT/TTS"] },
      { name: "ML & Data",              items: ["Recommendation Systems", "A/B Testing", "PyTorch", "TensorFlow", "Scikit-learn", "HuggingFace", "Pandas", "NumPy"] },
    ],
    footnote: "Applied at Colaberry · Uplifty AI · PiSence",
    span: "md:col-span-2 lg:row-span-2",
  },
  {
    category: "Languages & Backend APIs",
    caption: "What I write and the services I build",
    icon: "code",
    groups: [
      { name: "Languages", items: ["Python", "SQL", "TypeScript", "JavaScript"] },
      { name: "Backend",   items: ["FastAPI", "Flask", "REST API", "Async Processing"] },
    ],
  },
  {
    category: "Databases & Vector Stores",
    caption: "Relational, vector, cache and warehouse",
    icon: "db",
    items: ["PostgreSQL", "pgvector", "Supabase", "Redis", "BigQuery", "MongoDB", "DynamoDB", "MySQL"],
  },
  {
    category: "Cloud & Infrastructure",
    caption: "Shipping and scaling to production",
    icon: "cloud",
    items: ["AWS", "Google Cloud Run", "Docker", "CI/CD", "Git", "Azure", "Microservices Architecture"],
    span: "md:col-span-2",
  },
  {
    category: "Frontend",
    caption: "Interfaces for the products I ship",
    icon: "monitor",
    items: ["React.js", "Next.js", "Tailwind CSS"],
    span: "md:col-span-2 lg:col-span-1",
  },
];

/* Core tools for the scrolling ribbon */
const RIBBON = ["Python", "LangGraph", "LiveKit", "MCP", "PyTorch", "FastAPI", "Next.js", "pgvector", "Redis", "BigQuery", "DynamoDB", "Docker", "AWS", "TypeScript", "HuggingFace"];

const CHIP =
  "gsap-stack-chip rounded-full bg-surface-elevated px-3 py-1.5 text-[13px] text-text-secondary transition-colors duration-[450ms] ease-butter hover:bg-soft hover:text-text-primary";

function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("relative flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <span key={item} className={CHIP}>
          {item}
        </span>
      ))}
    </div>
  );
}

/* Cursor-following glow: sets --mx / --my on the card */
function trackPointer(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function StackCard({ group }: { group: StackGroup }) {
  return (
    <article
      onMouseMove={trackPointer}
      className={cn(
        "gsap-stack-card group relative flex flex-col overflow-hidden rounded-2xl bg-surface/80 p-6 shadow-soft backdrop-blur-sm",
        "transition-[translate,box-shadow] duration-500 ease-butter hover:-translate-y-1 hover:shadow-soft-lg",
        group.span
      )}
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-butter group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-soft-hover) 45%, transparent), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-accent transition-colors duration-500 ease-butter group-hover:bg-soft">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden
            >
              {ICONS[group.icon]}
            </svg>
          </span>
          <div>
            <h3 className="font-sans text-base font-semibold text-text-primary">{group.category}</h3>
            <p className="mt-0.5 text-xs text-text-tertiary">{group.caption}</p>
          </div>
        </div>
      </div>

      {group.groups ? (
        <div className="relative mt-6 space-y-5">
          {group.groups.map((sub) => (
            <div key={sub.name}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{sub.name}</p>
              <Chips items={sub.items} className="mt-2.5" />
            </div>
          ))}
        </div>
      ) : (
        <Chips items={group.items ?? []} className="mt-5" />
      )}

      {group.footnote && (
        <p className="relative mt-auto flex items-center gap-2 pt-8 text-xs text-text-tertiary">
          <span className="h-1.5 w-1.5 rounded-full bg-pop" />
          {group.footnote}
        </p>
      )}
    </article>
  );
}

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = section.querySelector<HTMLElement>(".gsap-heading");
    const desc    = section.querySelector<HTMLElement>(".gsap-desc");
    const ribbon  = section.querySelector<HTMLElement>(".gsap-ribbon");
    const cards   = Array.from(section.querySelectorAll<HTMLElement>(".gsap-stack-card"));

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    triggers.push(ScrollTrigger.create({
      trigger: section, start: "top 78%", once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        if (heading) tl.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        if (desc)    tl.fromTo(desc,    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.55");
        if (ribbon)  tl.fromTo(ribbon,  { opacity: 0 },        { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.4");
      },
    }));

    cards.forEach((card, i) => {
      const chips = card.querySelectorAll<HTMLElement>(".gsap-stack-chip");
      triggers.push(ScrollTrigger.create({
        trigger: card, start: "top 88%", once: true,
        onEnter: () => {
          gsap.fromTo(card,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: (i % 3) * 0.08,
              onComplete: () => gsap.set(card, { clearProps: "transform" }),
            }
          );
          gsap.fromTo(chips,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, stagger: 0.025, duration: 0.5, ease: "power3.out", delay: 0.25 + (i % 3) * 0.08 }
          );
        },
      }));
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="stack" className="py-section overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="04" label="Tech Stack" />

        <h2 className="gsap-heading font-display text-4xl font-bold text-text-primary lg:text-5xl">
          The Stack
        </h2>

        <p className="gsap-desc mt-4 max-w-xl text-text-secondary leading-relaxed">
          Technologies I&apos;ve{" "}
          <span className="text-text-primary font-medium">shipped in production</span>{" "}
          or applied to serious projects. Not a buzzword list.
        </p>
      </div>

      {/* Ribbon — slow infinite scroll, faded edges, pauses on hover */}
      <div
        className="gsap-ribbon group/ribbon relative mt-12 overflow-hidden py-2"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
        aria-hidden
      >
        <div className="stack-marquee flex w-max group-hover/ribbon:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {RIBBON.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center">
                  <span className="px-6 font-display text-2xl text-text-tertiary/70 md:text-3xl">{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-soft-hover" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STACK.map((group) => (
            <StackCard key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
