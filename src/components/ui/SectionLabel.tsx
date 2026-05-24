import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export default function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-4 font-mono text-xs tracking-widest uppercase text-accent",
        className
      )}
    >
      {index} · {label}
    </p>
  );
}
