"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import ToolList from "@/components/ui/ToolList";
import type { Experience as ExperienceType } from "@/types";

const H = ({ children }: { children: React.ReactNode }) => (
  <span className="text-text-primary font-medium">{children}</span>
);

/* Metrics get the accent tint so they pop on a skim */
const M = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold text-accent">{children}</span>
);

const WORK: ExperienceType[] = [
  {
    id: "colaberry",
    role: "AI Engineer Intern",
    company: "Colaberry",
    period: "Sep 2026 – Present",
    current: true,
    tagline: "A voice AI agent that holds natural conversations in 6 languages",
    description: [
      <>Built a <H>real-time voice agent</H> on LiveKit, LangGraph and MCP, in English and 5 Indian languages</>,
      <>Cut response latency <M>43.5%</M> by <H>streaming LLM output into speech</H></>,
      <>Created an <H>LLM evaluation suite</H> to test latency, tool calls and interruptions</>,
    ],
    stack: ["Python", "LiveKit", "WebRTC", "LangGraph", "FastMCP", "OpenAI", "Groq", "Sarvam AI", "Redis", "PostgreSQL"],
    type: "work",
  },
  {
    id: "uplifty",
    role: "ML Engineer Lead Intern",
    company: "Uplifty AI",
    period: "Aug 2025 – May 2026",
    tagline: "Personalized recommendations served in under 100 ms",
    description: [
      <>Designed a <H>two-stage recommendation pipeline</H> with ANN retrieval and a LightGBM ranker</>,
      <>Fixed <H>position bias</H> in training data with inverse propensity scoring</>,
      <>Split <H>online and offline feature stores</H> (Redis, BigQuery) to end training-serving skew</>,
    ],
    stack: ["Python", "LightGBM", "ANN retrieval", "Redis", "BigQuery", "A/B testing"],
    type: "work",
  },
  {
    id: "pisence",
    role: "AI Engineer",
    company: "PiSence Technologies",
    period: "Dec 2023 – Jul 2024",
    tagline: "Accurate, low-cost answers from a multi-agent RAG system",
    description: [
      <>Architected a <H>6-node multi-agent RAG system</H> on LangGraph, cutting hallucinations <M>40%</M></>,
      <>Cut inference cost <M>80%</M> by moving to <H>Groq-hosted LLaMA-3.3</H></>,
      <>Built a <H>RAGAS evaluation suite</H> of 400 tests that runs on every pull request</>,
    ],
    stack: ["Python", "LangGraph", "pgvector", "BM25", "Groq", "LLaMA-3.3", "RAGAS"],
    type: "work",
  },
  {
    id: "verzeo",
    role: "AIML Engineer Intern",
    company: "Verzeo",
    period: "Dec 2022 – Feb 2023",
    tagline: "Computer vision that reads hand gestures in real time",
    description: [
      <>Built a real-time <H>hand gesture recognition model</H> with TensorFlow and OpenCV, at <M>92% accuracy</M></>,
    ],
    stack: ["Python", "TensorFlow", "OpenCV"],
    type: "work",
  },
];

const EDUCATION = [
  {
    id: "ms",
    degree: "MS Computer Science",
    focus: "Artificial Intelligence",
    school: "Binghamton University, SUNY",
    period: "2024 – 2026",
    gpa: "3.7",
  },
  {
    id: "bs",
    degree: "B.Tech Computer Science",
    focus: "AI & Machine Learning",
    school: "Sri Ramachandra University",
    period: "2020 – 2024",
    gpa: "3.69",
  },
];

/* ── One role: meta on the left, card on the right, node on the line ── */
function RoleRow({ item, index }: { item: ExperienceType; index: number }) {
  return (
    <article id={`exp-${item.id}`} className="gsap-role group relative grid grid-cols-1 gap-3 pl-8 md:grid-cols-[12rem_1fr] md:gap-x-12 md:pl-0">
      {/* Node */}
      <span
        aria-hidden
        className="gsap-node absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-background ring-2 ring-soft-hover transition-[background-color,box-shadow] duration-700 ease-butter [&.is-active]:bg-accent [&.is-active]:ring-accent [&.is-active]:shadow-[0_0_0_7px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] md:left-[calc(12rem+1.5rem)]"
      />

      {/* Meta */}
      <div className="md:pt-0.5 md:text-right">
        <p className="text-sm font-semibold text-text-primary">{item.company}</p>
        <p className="mt-1 font-mono text-[11px] tracking-wide text-text-tertiary">{item.period}</p>
        {item.current && (
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-surface/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-text-secondary shadow-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pop" />
            </span>
            Current
          </span>
        )}
      </div>

      {/* Card */}
      <div className="gsap-role-card relative overflow-hidden rounded-2xl bg-surface/80 p-6 shadow-soft backdrop-blur-sm transition-[translate,box-shadow] duration-500 ease-butter hover:-translate-y-1 hover:shadow-soft-lg md:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-3 select-none font-display text-6xl font-bold leading-none text-accent/10 transition-colors duration-700 ease-butter group-hover:text-accent/20 md:text-7xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <p className="relative font-mono text-[11px] tracking-widest uppercase text-accent">{item.role}</p>

        {item.tagline && (
          <h3 className="relative mt-2.5 max-w-xl pr-14 font-display text-xl font-bold leading-snug text-text-primary md:text-2xl">
            {item.tagline}
          </h3>
        )}

        <ul className="relative mt-5 space-y-2.5">
          {item.description.map((line, i) => (
            <li key={i} className="flex items-start gap-3.5 text-[15px] leading-relaxed text-text-secondary">
              <span className="mt-[0.75em] h-px w-4 shrink-0 bg-accent" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {item.stack && <ToolList label="Tech used" items={item.stack} className="relative mt-7" />}
      </div>
    </article>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading  = section.querySelector<HTMLElement>(".gsap-heading");
    const timeline = section.querySelector<HTMLElement>(".gsap-timeline");
    const fill     = section.querySelector<HTMLElement>(".gsap-line-fill");
    const roles    = Array.from(section.querySelectorAll<HTMLElement>(".gsap-role"));
    const edu      = Array.from(section.querySelectorAll<HTMLElement>(".gsap-edu"));

    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    if (heading) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 78%", once: true,
        onEnter: () => gsap.fromTo(heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        ),
      }));
    }

    // Line fills as the timeline passes the middle of the viewport
    if (timeline && fill) {
      tweens.push(gsap.fromTo(fill,
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: timeline, start: "top 55%", end: "bottom 55%", scrub: 0.5 },
        }
      ));
    }

    roles.forEach((role) => {
      const card = role.querySelector<HTMLElement>(".gsap-role-card");
      const node = role.querySelector<HTMLElement>(".gsap-node");

      triggers.push(ScrollTrigger.create({
        trigger: role, start: "top 88%", once: true,
        onEnter: () => gsap.fromTo(role,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", clearProps: "transform" }
        ),
      }));

      // Node lights up when its row reaches the fill line
      if (node) {
        triggers.push(ScrollTrigger.create({
          trigger: card ?? role, start: "top 55%",
          onEnter:     () => node.classList.add("is-active"),
          onLeaveBack: () => node.classList.remove("is-active"),
        }));
      }
    });

    if (edu.length) {
      triggers.push(ScrollTrigger.create({
        trigger: edu[0], start: "top 88%", once: true,
        onEnter: () => gsap.fromTo(edu,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", clearProps: "transform" }
        ),
      }));
    }

    return () => {
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="02" label="Experience" />

        <div className="gsap-heading flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="font-display text-4xl font-bold text-text-primary lg:text-5xl">
            Where I&apos;ve worked
          </h2>

          {/* Headline stat — same treatment as the GPA on education cards */}
          <div className="text-left sm:text-right">
            <p className="font-display text-4xl font-bold leading-none text-text-primary lg:text-5xl">
              2<span className="text-accent">+</span>
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
              Years in industry
            </p>
          </div>
        </div>

        {/* ── Work: all roles visible, scroll-filled timeline ── */}
        <div className="gsap-timeline relative mt-14">
          <div aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-border md:left-[calc(12rem+1.5rem)]">
            <div className="gsap-line-fill absolute inset-0 origin-top bg-accent" />
          </div>
          <div className="space-y-10 md:space-y-12">
            {WORK.map((item, index) => (
              <RoleRow key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div className="mt-20">
          <p className="mb-6 font-mono text-xs tracking-widest uppercase text-text-secondary">Education</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {EDUCATION.map((ed) => (
              <article
                key={ed.id}
                className="gsap-edu group flex items-center justify-between gap-6 rounded-2xl bg-surface/80 p-6 shadow-soft backdrop-blur-sm transition-[translate,box-shadow] duration-500 ease-butter hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-accent transition-colors duration-500 ease-butter group-hover:bg-soft">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                      <path d="M22 10 12 5 2 10l10 5 10-5z" />
                      <path d="M6 12v5c3 2 9 2 12 0v-5" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-text-primary">{ed.degree}</h3>
                    <p className="text-sm text-accent">{ed.focus}</p>
                    <p className="mt-1.5 text-xs text-text-tertiary">{ed.school} · {ed.period}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-3xl font-bold leading-none text-text-primary">{ed.gpa}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">GPA / 4.0</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
