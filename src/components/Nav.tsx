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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="h-2 w-2 rounded-full bg-forest group-hover:scale-150 transition-transform" />
          <span className="text-sm tracking-widest uppercase font-medium">
            Joshua Rey
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
      </div>
    </header>
  );
}
