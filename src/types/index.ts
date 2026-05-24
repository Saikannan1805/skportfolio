import type React from "react";

export interface Project {
  id: string;
  title: string;
  description: React.ReactNode;
  tags: string[];
  href?: string;
  github?: string;
  image?: string;
  video?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: React.ReactNode[];
  type: "work" | "education";
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
