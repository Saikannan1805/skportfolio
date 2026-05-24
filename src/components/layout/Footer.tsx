"use client";

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="hr-gradient mb-8" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-mono text-xs text-text-tertiary tracking-widest">
          © {new Date().getFullYear()} Saikannan Sathish. All rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
