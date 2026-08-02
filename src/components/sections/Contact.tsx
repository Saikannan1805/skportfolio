"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/Saikannan1805"                  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saikannansathish/"     },
  { label: "Email",    href: "mailto:saisathish1805@gmail.com"                   },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines   = Array.from(section.querySelectorAll<HTMLElement>(".gsap-line"));
    const desc    = section.querySelector<HTMLElement>(".gsap-desc");
    const cta     = section.querySelector<HTMLElement>(".gsap-cta");
    const socials = Array.from(section.querySelectorAll<HTMLElement>(".gsap-social"));

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    if (lines.length) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 75%", once: true,
        onEnter: () => gsap.fromTo(lines,
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.1, duration: 0.85, ease: "power4.out" }
        ),
      }));
    }

    if (desc) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 73%", once: true,
        onEnter: () => gsap.fromTo(desc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 }
        ),
      }));
    }

    if (cta) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 73%", once: true,
        onEnter: () => gsap.fromTo(cta,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.35 }
        ),
      }));
    }

    if (socials.length) {
      triggers.push(ScrollTrigger.create({
        trigger: section, start: "top 73%", once: true,
        onEnter: () => gsap.fromTo(socials,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, ease: "power3.out", delay: 0.45 }
        ),
      }));
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-section overflow-hidden"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: "rgba(99, 102, 241, 0.08)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionLabel index="05" label="Contact" />

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-7xl">
            <span className="block overflow-hidden py-1">
              <span className="gsap-line inline-block">Ready to</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="gsap-line inline-block text-accent">build.</span>
            </span>
          </h2>

          <p className="gsap-desc mt-6 text-base leading-relaxed text-text-secondary">
            I am actively looking for{" "}
            <span className="text-text-primary font-medium">full-time AI/ML Engineer roles</span>.
            I am{" "}
            <span className="text-text-primary font-medium">authorized to work in the US</span>{" "}
            and available to start{" "}
            <span className="text-text-primary font-medium">immediately after August 2026</span>.
            If you see a fit, reach out.
          </p>

          <div className="gsap-cta mt-8 flex justify-center">
            <Button
              href="mailto:saisathish1805@gmail.com"
              variant="primary"
              className="px-10 py-4 text-sm"
            >
              Say Hello ↗
            </Button>
          </div>

          <div className="mx-auto my-10 h-px w-24 bg-border" />

          <div className="flex items-center justify-center gap-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-social group flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
                <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
