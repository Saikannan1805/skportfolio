"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";

const FACTS = [
  { label: "Focus",    value: "AI / ML · Full-Stack"    },
  { label: "Status",   value: "Seeking Roles · 2026"    },
  { label: "Based in", value: "New York"                  },
  { label: "Open to",  value: "Full Time · Internships · Contract" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines  = Array.from(section.querySelectorAll<HTMLElement>(".gsap-line"));
    const texts  = Array.from(section.querySelectorAll<HTMLElement>(".gsap-text"));
    const cards  = Array.from(section.querySelectorAll<HTMLElement>(".gsap-card"));
    const photo  = section.querySelector<HTMLElement>(".gsap-photo");

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    if (lines.length) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 78%", once: true,
        onEnter: () => gsap.fromTo(lines,
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.1, duration: 0.8, ease: "power4.out" }
        ),
      }));
    }

    if (texts.length) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 75%", once: true,
        onEnter: () => gsap.fromTo(texts,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power3.out" }
        ),
      }));
    }

    if (cards.length) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 72%", once: true,
        onEnter: () => gsap.fromTo(cards,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }
        ),
      }));
    }

    if (photo) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 78%", once: true,
        onEnter: () => gsap.fromTo(photo,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        ),
      }));
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-section overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="01" label="About" />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          {/* Text — 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="font-display text-4xl font-bold text-text-primary leading-tight lg:text-5xl">
              <span className="block overflow-hidden py-1">
                <span className="gsap-line inline-block">Building AI systems</span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="gsap-line inline-block text-accent">that reach production.</span>
              </span>
            </h2>

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p className="gsap-text">
                I am a Computer Science Master&apos;s student specializing in AI at
                Binghamton University.
              </p>
              <p className="gsap-text">
                I have shipped AI-powered products across{" "}
                <span className="text-text-primary font-medium">multiple companies</span>,
                building{" "}
                <span className="text-text-primary font-medium">multi-agent LLM pipelines</span>,
                deploying{" "}
                <span className="text-text-primary font-medium">real-time inference systems</span>{" "}
                and working across the full ML stack.
              </p>
              <p className="gsap-text">
                It is not just the model. The architecture, the product thinking
                and the engineering discipline all matter. I take problems from
                design to deployment and own the outcome end to end.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="gsap-card rounded-xl border border-border bg-surface p-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                    {fact.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-text-primary">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo — 2 cols */}
          <div className="lg:col-span-2 flex items-start justify-center">
            <div className="gsap-photo relative w-full max-w-xs">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/20" />
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-surface">
                <img
                  src="/photo.png"
                  alt="Saikannan Sathish"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
