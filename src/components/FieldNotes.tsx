import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { SectionLabel } from "./SectionLabel";

const notes = [
  {
    slug: "cost-of-being-slightly-hard-to-use",
    date: "May 2026",
    title: "The cost of being slightly hard to use",
    excerpt:
      "When a tool is 15% harder than it should be, people don't complain. They just stop opening it.",
    read: "4 min",
    body: [
      "Friction is invisible. It hides inside the small extra tap, the second-guess, the moment of uncertainty before someone commits. None of it is dramatic enough to complain about.",
      "But behavior is honest. People keep showing up to the tool that respects their time and quietly drift away from the one that doesn't. The decline is rarely loud — it just looks like fewer logins, shorter sessions, slower replies.",
      "Most products don't lose users to a competitor. They lose them to mild inconvenience. Removing 15% of the friction often does more than adding any new feature.",
    ],
  },
  {
    slug: "visibility-before-rules",
    date: "Apr 2026",
    title: "Visibility before rules",
    excerpt:
      "Most teams add policy where they should have added a clear view. Behavior corrects itself once it can be seen.",
    read: "3 min",
    body: [
      "When a team starts misbehaving, the first instinct is usually a new rule. A new policy. A new approval step. The system gets heavier and the underlying behavior rarely changes.",
      "Visibility works better than enforcement. The moment people can see who is doing what, when, and why, most things quietly self-correct. Nobody wants to be the obvious outlier.",
      "Movlify started here. Before tracking, before logging, before any rule — just the question: can everyone see what's happening right now?",
    ],
  },
  {
    slug: "building-for-the-second-open",
    date: "Mar 2026",
    title: "On building for the second time someone opens the app",
    excerpt:
      "First-use is a marketing problem. The system is judged on day two — when the novelty is gone and the friction is honest.",
    read: "5 min",
    body: [
      "First impressions are designed. Second impressions are revealed. The onboarding flow can be polished to perfection and still hide everything that matters about a product.",
      "Day two is when the real questions surface. Is it faster than what I was doing before? Does it remember me? Does it respect what I learned yesterday?",
      "Build for the returning user, not the new one. Novelty fades in a day. Habit takes weeks. The system that survives is the one that earns its second opening.",
    ],
  },
  {
    slug: "streaks-work-dashboards-dont",
    date: "Feb 2026",
    title: "Why streaks work and dashboards don't",
    excerpt:
      "A streak is a story. A dashboard is a report. People show up for stories.",
    read: "3 min",
    body: [
      "A dashboard tells you the truth. A streak tells you who you are becoming. One is information; the other is identity.",
      "Numbers without narrative are forgettable. But a 22-week streak says something about the person holding it. It becomes part of how they see themselves, and that's a much stronger reason to return tomorrow.",
      "Tithetify isn't built around a balance. It's built around a rhythm. The streak is the story you're telling yourself about the kind of person you're becoming.",
    ],
  },
];

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
