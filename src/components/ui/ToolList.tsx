import { cn } from "@/lib/utils";

interface ToolListProps {
  label: string;
  items: string[];
  className?: string;
}

/** Labelled row of soft tool chips — used at the foot of experience and project cards. */
export default function ToolList({ label, items, className }: ToolListProps) {
  if (!items.length) return null;

  return (
    <div className={cn("border-t border-border-subtle pt-5", className)}>
      <p className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">{label}</p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label={label}>
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg bg-surface-elevated px-3 py-1.5 text-[13px] leading-none text-text-secondary transition-colors duration-[450ms] ease-butter hover:bg-soft hover:text-text-primary"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
