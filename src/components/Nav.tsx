import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Building", href: "#building" },
  { label: "Observing", href: "#observing" },
  { label: "Thoughts", href: "#thoughts" },
  { label: "Field Notes", href: "#field-notes" },
  { label: "Community", href: "#community" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "backdrop-blur-xl bg-background/80 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 group"
        >
          <span className="h-2 w-2 rounded-full bg-forest group-hover:scale-150 transition-transform" />
          <span className="text-sm tracking-widest uppercase font-light">
            Joshua <span className="font-bold">Rey</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-forest group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
        <a
          href="#community"
          className="hidden md:inline-flex text-xs uppercase tracking-[0.15em] text-foreground border border-border hover:border-forest hover:text-forest-soft transition-colors px-4 py-2 rounded-full"
        >
          Connect
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative h-10 w-10 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-px w-6 bg-foreground transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <nav className="px-6 pt-4 pb-8 flex flex-col gap-1 border-t border-border bg-background/95 backdrop-blur-xl">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base uppercase tracking-[0.2em] text-foreground/85 hover:text-forest-soft transition-colors border-b border-border/50"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#community"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-soft text-white px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] transition-colors"
          >
            Connect
          </a>
        </nav>
      </div>
    </header>
  );
}
