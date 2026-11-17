import type React from "react";

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: React.ReactNode;
  tags: string[];
  href?: string;
  github?: string;
  image?: string;
  video?: string;
  customMedia?: React.ReactNode;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: React.ReactNode[];
  type: "work" | "education";
  /** One-line outcome shown as the card headline */
  tagline?: string;
  /** Tools used in this role */
  stack?: string[];
  /** Ongoing role — shows a "Current" marker */
  current?: boolean;
}

export interface Skill {
  name: string;
  icon?: string;
  category: "language" | "framework" | "tool" | "cloud";
}

export interface NavItem {
  label: string;
  href: string;
}
