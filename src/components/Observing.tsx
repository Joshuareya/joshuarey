import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const notes = [
  { i: "001", body: "People respond faster to simple communication." },
  { i: "002", body: "Visibility changes behavior — even before any rule is enforced." },
  { i: "003", body: "Stressful systems quietly destroy consistency." },
  { i: "004", body: "Complicated things, no matter how important, get ignored." },
  { i: "005", body: "Friction is the most underestimated decision-maker." },
];

export function Observing() {
  return (
    <section
      id="observing"
      className="relative py-32 md:py-44 px-6 md:px-10 border-t border-border bg-card/30"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="03" label="Currently observing" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl leading-tight tracking-tight text-balance font-light max-w-2xl"
        >
          Live notes from watching how people actually move.
        </motion.h2>

        <div className="mt-20 border-t border-border">
          {notes.map((n, i) => (
            <motion.div
              key={n.i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-border items-baseline cursor-default"
            >
              <span className="col-span-2 md:col-span-1 text-xs font-mono text-muted-foreground group-hover:text-forest-soft transition-colors">
                {n.i}
              </span>
              <p className="col-span-10 md:col-span-9 text-xl md:text-3xl font-light leading-snug tracking-tight text-balance group-hover:text-foreground text-foreground/85 transition-colors">
                {n.body}
              </p>
              <span className="hidden md:block col-span-2 text-xs uppercase tracking-[0.2em] text-muted-foreground text-right opacity-0 group-hover:opacity-100 transition-opacity">
                Observed
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
