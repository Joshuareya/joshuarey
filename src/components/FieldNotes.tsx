import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const notes = [
  {
    date: "May 2026",
    title: "The cost of being slightly hard to use",
    excerpt:
      "When a tool is 15% harder than it should be, people don't complain. They just stop opening it.",
    read: "4 min",
  },
  {
    date: "Apr 2026",
    title: "Visibility before rules",
    excerpt:
      "Most teams add policy where they should have added a clear view. Behavior corrects itself once it can be seen.",
    read: "3 min",
  },
  {
    date: "Mar 2026",
    title: "On building for the second time someone opens the app",
    excerpt:
      "First-use is a marketing problem. The system is judged on day two — when the novelty is gone and the friction is honest.",
    read: "5 min",
  },
  {
    date: "Feb 2026",
    title: "Why streaks work and dashboards don't",
    excerpt:
      "A streak is a story. A dashboard is a report. People show up for stories.",
    read: "3 min",
  },
];

export function FieldNotes() {
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
            Updated monthly
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {notes.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-background p-8 md:p-12 cursor-pointer hover:bg-card transition-colors"
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
              <div className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70 group-hover:text-forest-soft transition-colors">
                Read note
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
