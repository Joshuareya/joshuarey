import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { SectionLabel } from "./SectionLabel";
import { notes } from "@/lib/field-notes";

export function FieldNotes() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // open a note directly when linked via #slug
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const idx = notes.findIndex((n) => n.slug === hash);
    if (idx !== -1) {
      setOpenIdx(idx);
      // let layout settle, then bring it into view
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, []);

  const handleShare = async (slug: string, title: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `Field note — ${title}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied", { description: "Share this field note anywhere." });
    } catch {
      // user cancelled native share, or clipboard blocked — fail quietly
    }
  };

  return (
    <section
      id="field-notes"
      className="relative py-32 md:py-44 px-6 md:px-10 border-t border-border bg-card/30"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="05" label="Field notes" />

        <div className="flex items-end justify-between flex-wrap gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl leading-tight tracking-tight font-light max-w-2xl text-balance"
          >
            A journal of behavior, systems, and quiet truths.
          </motion.h2>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Tap a note to read
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {notes.map((n, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.article
                key={n.slug}
                id={n.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-background p-8 md:p-12 hover:bg-card transition-colors scroll-mt-24"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-8">
                    <span>{n.date}</span>
                    <span>{n.read}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light leading-snug tracking-tight text-balance group-hover:text-forest-soft transition-colors">
                    {n.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                    {n.excerpt}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-border space-y-4 max-w-xl">
                          {n.body.map((para, p) => (
                            <p
                              key={p}
                              className="text-foreground/85 leading-relaxed"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-forest-soft transition-colors cursor-pointer"
                  >
                    {isOpen ? "Close note" : "Read note"}
                    <span
                      className={`transition-transform ${
                        isOpen ? "rotate-90" : "group-hover:translate-x-1"
                      }`}
                    >
                      →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShare(n.slug, n.title)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-forest-soft transition-colors cursor-pointer"
                    aria-label={`Share or copy a link to "${n.title}"`}
                  >
                    <ShareIcon />
                    Share
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ShareIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
      <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
    </svg>
  );
}
