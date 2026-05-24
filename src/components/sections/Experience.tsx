"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Experience as ExperienceType } from "@/types";

const H = ({ children }: { children: React.ReactNode }) => (
  <span className="text-text-primary font-medium">{children}</span>
);

const TIMELINE: ExperienceType[] = [
  {
    id: "courser-ai",
    role: "Founding Engineer",
    company: "Courser AI",
    period: "Jan 2026 – Present",
    description: [
      <>Built <H>AI-powered course planning platform from 0→1</H>. Owned architecture, frontend and deployment</>,
      <>Integrated <H>Gemini API + OpenRouter</H> for multi-model LLM orchestration within a React + Flask + PostgreSQL stack</>,
    ],
    type: "work",
  },
  {
    id: "uplifty",
    role: "ML Engineer Lead",
    company: "Uplifty AI",
    period: "Aug 2025 – Present",
    description: [
      <>Designed and deployed <H>personalized recommendation engine</H> using collaborative filtering and user embeddings</>,
      <>Built <H>real-time inference pipeline</H> with FastAPI + Supabase + PostgreSQL on Google Cloud Run</>,
    ],
    type: "work",
  },
  {
    id: "sellularity",
    role: "Founding Engineer",
    company: "Sellularity",
    period: "Jan 2025 – May 2025",
    description: [
      <>Built <H>healthcare data exchange platform</H> using Flask, Angular and AWS (KMS, RDS, ECS)</>,
      <>Implemented <H>AWS KMS key management</H> for PHI data security and compliance</>,
    ],
    type: "work",
  },
  {
    id: "verzeo",
    role: "AI/ML Engineer Intern",
    company: "Verzeo",
    period: "Dec 2022 – Feb 2023",
    description: [
      <>Built gesture recognition system achieving <H>92% accuracy</H> using TensorFlow and OpenCV</>,
    ],
    type: "work",
  },
  {
    id: "qurinom",
    role: "Mobile App Developer Intern",
    company: "Qurinom Solutions",
    period: "Jan 2022 – Mar 2022",
    description: [
      <>Built <H>cross-platform Flutter app</H> with Firebase authentication and real-time backend workflows</>,
    ],
    type: "work",
  },
  {
    id: "ms",
    role: "MS Computer Science (Artificial Intelligence)",
    company: "Binghamton University, SUNY",
    period: "2024 – 2026",
    description: [
      <><H>GPA: 3.7 / 4.0</H></>,
      <>Focus: AI, Machine Learning, Distributed Systems</>,
    ],
    type: "education",
  },
  {
    id: "bs",
    role: "B.Tech Computer Science (AI & Machine Learning)",
    company: "Sri Ramachandra University",
    period: "2020 – 2024",
    description: [
      <><H>GPA: 3.69 / 4.0</H></>,
      <>Specialization: Artificial Intelligence and Machine Learning</>,
    ],
    type: "education",
  },
];

/* ── Standalone entry so React never re-creates it inside the parent ── */
function TimelineEntry({ item }: { item: ExperienceType }) {
  return (
    <div className="gsap-entry relative flex flex-col gap-1 pl-6 md:flex-row md:gap-0 md:pl-0">
      {/* Period */}
      <div className="md:w-32 flex-shrink-0 md:pr-8 md:pt-0.5 md:text-right">
        <span className="font-mono text-xs tracking-wider text-text-secondary">
          {item.period}
        </span>
      </div>

      {/* Dot */}
      <div
        className={`absolute top-1 h-2.5 w-2.5 rounded-full border-2 bg-background
          left-[0px] md:left-[calc(8rem-5px)]
          ${item.type === "work" ? "border-accent" : "border-border"}`}
      />

      {/* Card */}
      <div className="gsap-card md:pl-10 flex-1">
        <div
          className={`rounded-xl border p-5 transition-colors duration-150
            ${item.type === "work"
              ? "border-accent/20 bg-surface hover:border-accent/30"
              : "border-border bg-surface"
            }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-sans font-semibold text-text-primary">
              {item.role}
            </h3>
            <span className="font-mono text-xs text-text-tertiary">·</span>
            <span className="font-mono text-xs text-text-secondary">
              {item.company}
            </span>
            <span
              className={`ml-auto rounded-full px-2.5 py-0.5 font-mono text-xs
                ${item.type === "work"
                  ? "bg-accent/10 text-accent"
                  : "bg-surface-elevated text-text-tertiary"
                }`}
            >
              {item.type === "work" ? "Work" : "Education"}
            </span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {item.description.map((line, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-text-tertiary" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Section divider label ── */
function SubLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-xs tracking-widest uppercase text-text-secondary whitespace-nowrap">
        {text}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

const workItems = TIMELINE.filter((i) => i.type === "work");
const eduItems  = TIMELINE.filter((i) => i.type === "education");

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = section.querySelector<HTMLElement>(".gsap-heading");
    const entries = Array.from(section.querySelectorAll<HTMLElement>(".gsap-entry"));

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    if (heading) {
      triggers.push(
        ScrollTrigger.create({
          trigger: section, start: "top 80%", once: true,
          onEnter: () => gsap.fromTo(heading,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
          ),
        })
      );
    }

    entries.forEach((entry) => {
      const card = entry.querySelector<HTMLElement>(".gsap-card");
      if (!card) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: entry, start: "top 88%", once: true,
          onEnter: () => gsap.fromTo(card,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.65, ease: "power3.out" }
          ),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="04" label="Experience" />

        <h2 className="gsap-heading font-display text-4xl font-bold text-text-primary lg:text-5xl">
          Background
        </h2>

        {/* ── Work Experience ── */}
        <div className="mt-14">
          <SubLabel text="Work Experience" />
          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border md:left-[8rem]" />
            <div className="space-y-10">
              {workItems.map((item) => (
                <TimelineEntry key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Education ── */}
        <div className="mt-16">
          <SubLabel text="Education" />
          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border md:left-[8rem]" />
            <div className="space-y-10">
              {eduItems.map((item) => (
                <TimelineEntry key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
