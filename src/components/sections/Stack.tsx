"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

const STACK = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "Java", "C++", "Dart", "SQL"],
  },
  {
    category: "AI / ML",
    items: ["LangGraph", "RAG", "PyTorch", "TensorFlow", "LangChain", "HuggingFace", "Scikit-learn", "OpenCV"],
  },
  {
    category: "LLM APIs",
    items: ["Groq", "OpenAI", "Gemini API", "OpenRouter"],
  },
  {
    category: "Frameworks",
    items: ["FastAPI", "Next.js", "React.js", "Flask", "Tailwind CSS", "Angular", "Flutter"],
  },
  {
    category: "Databases",
    items: ["pgvector", "PostgreSQL", "Supabase", "MongoDB", "MySQL", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Google Cloud Run", "Docker", "GitHub Actions", "CI/CD", "Azure"],
  },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = section.querySelector<HTMLElement>(".gsap-heading");
    const desc    = section.querySelector<HTMLElement>(".gsap-desc");
    const badges  = Array.from(section.querySelectorAll<HTMLElement>(".gsap-badge"));

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    if (heading) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 78%", once: true,
        onEnter: () => gsap.fromTo(heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        ),
      }));
    }

    if (desc) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 76%", once: true,
        onEnter: () => gsap.fromTo(desc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
        ),
      }));
    }

    if (badges.length) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 74%", once: true,
        onEnter: () => gsap.fromTo(badges,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, stagger: 0.035, duration: 0.4, ease: "power3.out" }
        ),
      }));
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="stack" className="py-section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="02" label="Tech Stack" />

        <h2 className="gsap-heading font-display text-4xl font-bold text-text-primary lg:text-5xl">
          The Stack
        </h2>

        <p className="gsap-desc mt-4 max-w-xl text-text-secondary leading-relaxed">
          Technologies I&apos;ve{" "}
          <span className="text-text-primary font-medium">shipped in production</span>{" "}
          or applied to serious projects. Not a buzzword list.
        </p>

        <div className="mt-12 space-y-8">
          {STACK.map((group) => (
            <div
              key={group.category}
              className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8"
            >
              <div className="w-36 flex-shrink-0 pt-1">
                <p className="font-mono text-xs tracking-widest uppercase text-text-primary">
                  {group.category}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} className="gsap-badge">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
