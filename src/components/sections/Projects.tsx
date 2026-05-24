"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Project } from "@/types";

const H = ({ children }: { children: React.ReactNode }) => (
  <span className="text-text-primary font-medium">{children}</span>
);

const PROJECTS: Project[] = [
  {
    id: "gitwise",
    title: "Gitwise",
    description: (
      <>
        AI agent that analyzes any GitHub repository for architecture, security risks and code quality{" "}
        <H>in 30–90 seconds.</H> Built with a{" "}
        <H>multi-agent LangGraph pipeline,</H> vector-based code retrieval and a production Next.js interface.
      </>
    ),
    tags: ["LangGraph", "RAG", "LLaMA 3.3-70B", "FastAPI", "Next.js"],
    href: "https://gitwiseai.vercel.app",
    video: "/gitwise-demo.mp4",
    featured: true,
  },
  {
    id: "hybrid-rag",
    title: "Hybrid Knowledge Assistant",
    description: (
      <>
        <H>RAG system</H> with citation-aware Q&A over private document corpora. Handles{" "}
        <H>multi-document ingestion, semantic chunking</H> and precise source attribution for enterprise knowledge retrieval.
      </>
    ),
    tags: ["FastAPI", "RAG", "OpenAI", "pgvector", "React"],
    github: "https://github.com/Saikannan1805/basic-rag-assistant",
    featured: true,
  },
  {
    id: "courser-ai",
    title: "Courser AI",
    description: (
      <>
        AI-powered course planning platform built <H>0→1 as founding engineer.</H> Integrates{" "}
        <H>multiple LLMs via OpenRouter</H> for intelligent academic planning with a full-stack React + Flask + PostgreSQL architecture.
      </>
    ),
    tags: ["React", "Flask", "PostgreSQL", "Gemini API", "OpenRouter"],
    featured: true,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = section.querySelector<HTMLElement>(".gsap-heading");
    const cards   = Array.from(section.querySelectorAll<HTMLElement>(".gsap-card"));

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    if (heading) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 75%", once: true,
        onEnter: () => gsap.fromTo(heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        ),
      }));
    }

    if (cards.length) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 72%", once: true,
        onEnter: () => gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            stagger: 0.15, duration: 0.8, ease: "power3.out",
            onComplete: () => gsap.set(cards, { clearProps: "transform,opacity" }),
          }
        ),
      }));
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="03" label="Projects" />

        <div className="gsap-heading flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-4xl font-bold text-text-primary lg:text-5xl">
            Selected work
          </h2>
          <a
            href="https://github.com/Saikannan1805"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase text-text-tertiary hover:text-accent transition-colors duration-200"
          >
            All projects ↗
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="gsap-card group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/5"
            >
              {/* Media */}
              <div
                className="relative h-48 w-full overflow-hidden border-b border-border"
                style={{ background: "linear-gradient(145deg, #141414 0%, #0d0d0d 100%)" }}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span className="absolute left-4 top-4 font-mono text-xs tracking-widest text-text-tertiary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-elevated px-2.5 py-0.5 font-mono text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-sans text-base font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
                  {project.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                {(project.href || project.github) && (
                  <div className="mt-6 flex items-center gap-5 border-t border-border pt-4">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs tracking-widest uppercase text-accent hover:text-accent-light transition-colors duration-150"
                      >
                        Live →
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs tracking-widest uppercase text-text-tertiary hover:text-text-secondary transition-colors duration-150"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
