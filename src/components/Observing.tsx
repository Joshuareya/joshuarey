import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const notes = [
  {
    i: "001",
    body: "People respond faster to simple communication.",
    detail:
      "Long messages get postponed. Short ones get answered. The clarity of a request is often the single largest predictor of how quickly it moves.",
  },
  {
    i: "002",
    body: "Visibility changes behavior — even before any rule is enforced.",
    detail:
      "Once people know what is being seen, they adjust on their own. Most enforcement is just expensive visibility.",
  },
  {
    i: "003",
    body: "Stressful systems quietly destroy consistency.",
    detail:
      "When using the system costs emotional energy, people skip it on hard days — which is exactly when consistency matters most.",
  },
  {
    i: "004",
    body: "Complicated things, no matter how important, get ignored.",
    detail:
      "Importance does not beat friction. If a task is heavy, it gets pushed to tomorrow forever. Simplicity is what makes important things actually happen.",
  },
  {
    i: "005",
    body: "Friction is the most underestimated decision-maker.",
    detail:
      "People rarely choose against friction consciously. They just drift toward whatever is easier — and that drift, repeated daily, becomes their behavior.",
  },
];

export function Observing() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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
          {notes.map((n, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={n.i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="border-b border-border"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full grid grid-cols-12 gap-4 py-8 md:py-10 items-baseline text-left cursor-pointer"
                >
                  <span className="col-span-2 md:col-span-1 text-xs font-mono text-muted-foreground group-hover:text-forest-soft transition-colors">
                    {n.i}
                  </span>
                  <p className="col-span-10 md:col-span-9 text-xl md:text-3xl font-light leading-snug tracking-tight text-balance text-foreground/85 group-hover:text-foreground transition-colors">
                    {n.body}
                  </p>
                  <span className="hidden md:flex col-span-2 justify-end text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span
                      className={`transition-transform ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-4 pb-10">
                        <div className="col-start-3 md:col-start-2 col-span-10 md:col-span-9">
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            {n.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
