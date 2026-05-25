const socials = [
  { l: "Instagram", h: "https://instagram.com" },
  { l: "LinkedIn", h: "https://linkedin.com" },
  { l: "X / Twitter", h: "https://x.com" },
  { l: "Email", h: "mailto:hello@joshuarey.com" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 md:px-10 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-forest" />
              <span className="text-sm tracking-widest uppercase">Joshua Rey</span>
            </div>
            <p className="text-lg md:text-xl text-foreground/85 font-light max-w-md text-balance leading-snug">
              Built around behavior, simplicity, and thoughtful systems.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Connect
            </div>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.l}>
                  <a
                    href={s.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 hover:text-forest-soft transition-colors inline-flex items-center gap-2 group"
                  >
                    {s.l}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Currently
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Observing how people interact with everyday systems. Based in Africa.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Joshua Rey</span>
          <span>Designed quietly · Built intentionally</span>
        </div>
      </div>
    </footer>
  );
}
