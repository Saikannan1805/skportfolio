"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import ToolList from "@/components/ui/ToolList";
import type { Project } from "@/types";

const H = ({ children }: { children: React.ReactNode }) => (
  <span className="text-text-primary font-medium">{children}</span>
);


const PROJECTS: Project[] = [
  {
    id: "gitwise",
    title: "Gitwise",
    subtitle: "AI Codebase Intelligence",
    description: (
      <>
        Gitwise reads any GitHub repository and explains it back to you. A{" "}
        <H>six-node LangGraph pipeline</H> clones the repo, maps its architecture, scans for security
        issues, grades code quality and generates a README. It <H>streams the report live in 30 to 90 seconds</H>.
        You can then ask questions about the code in plain English and get answers with{" "}
        <H>exact file and line citations</H>.
      </>
    ),
    tags: ["LangGraph", "FastAPI", "Next.js 15", "Supabase pgvector", "Groq LLaMA-3.3-70B", "SSE"],
    href: "https://gitwiseai.vercel.app",
    github: "https://github.com/Saikannan1805/github-agent",
    video: "/gitwise-demo.mp4",
    featured: true,
  },
  {
    id: "hybrid-rag",
    title: "Hybrid Knowledge Assistant",
    subtitle: "Full-Stack RAG over Your Documents",
    description: (
      <>
        A <H>full-stack RAG assistant</H> that answers questions from your own documents. Add PDFs, text
        files or URLs, and it chunks and embeds the content into Supabase pgvector. Answers come from
        GPT-4o-mini with <H>citations and a confidence score</H>, streamed live from FastAPI to a Next.js
        frontend. You can also <H>limit a search to a single document</H>.
      </>
    ),
    tags: ["FastAPI", "Next.js", "Supabase pgvector", "OpenAI embeddings", "GPT-4o-mini", "SSE"],
    href: "https://rag-assist-system.vercel.app/",
    github: "https://github.com/Saikannan1805/basic-rag-assistant",
    image: "/rag-chat.png",
    featured: true,
  },
];

const hostname = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
};

/* ── Media in a minimal, tonal browser window ── */
function ProjectWindow({ project }: { project: Project }) {
  const host = hostname(project.href);

  return (
    <div className="overflow-hidden rounded-2xl bg-surface-elevated">
      {/* Window bar */}
      <div className="flex h-9 items-center gap-1.5 px-4">
        <span className="h-2 w-2 rounded-full bg-soft-hover" />
        <span className="h-2 w-2 rounded-full bg-soft-hover" />
        <span className="h-2 w-2 rounded-full bg-soft-hover" />
        {host && (
          <span className="mx-auto max-w-[60%] truncate rounded-full bg-surface/70 px-3 py-0.5 font-mono text-[10px] text-text-tertiary">
            {host}
          </span>
        )}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-butter group-hover:scale-[1.04]">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            project.customMedia
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="gsap-project group flex flex-col rounded-3xl bg-surface/80 p-3 shadow-soft backdrop-blur-sm transition-[translate,box-shadow] duration-500 ease-butter hover:-translate-y-1.5 hover:shadow-soft-lg">
      <ProjectWindow project={project} />

      <div className="flex flex-1 flex-col px-4 pb-4 pt-7 md:px-5">
        {/* Index + links */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-soft-hover transition-all duration-700 ease-butter group-hover:w-12 group-hover:bg-accent" />
          </div>

          <div className="flex items-center gap-2">
            {project.href && (
              <Button
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="px-4 py-2 text-[13px]"
              >
                View live ↗
              </Button>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-text-secondary transition-colors duration-[450ms] ease-butter hover:bg-soft hover:text-text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-text-primary">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="mt-2 font-mono text-[11px] tracking-widest uppercase text-text-tertiary">
            {project.subtitle}
          </p>
        )}

        <p className="mt-5 text-[15px] leading-relaxed text-text-secondary">{project.description}</p>

        {/* Pinned to the bottom so both cards align */}
        <div className="mt-auto pt-7">
          <ToolList label="Built with" items={project.tags} />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = section.querySelector<HTMLElement>(".gsap-heading");
    const cards   = Array.from(section.querySelectorAll<HTMLElement>(".gsap-project"));

    const triggers: ScrollTrigger[] = [];

    if (heading) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 75%", once: true,
        onEnter: () => gsap.fromTo(heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        ),
      }));
    }

    if (cards.length) {
      triggers.push(ScrollTrigger.create({
        trigger: cards[0], start: "top 85%", once: true,
        onEnter: () => gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: "power3.out", clearProps: "transform" }
        ),
      }));
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="03" label="Projects" />

        <h2 className="gsap-heading font-display text-4xl font-bold text-text-primary lg:text-5xl">
          Selected work
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
