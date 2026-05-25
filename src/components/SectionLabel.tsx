export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-xs font-mono text-forest-soft">{index}</span>
      <span className="h-px flex-1 max-w-16 bg-border" />
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
