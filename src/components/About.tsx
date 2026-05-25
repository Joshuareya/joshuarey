import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import tieImg from "@/assets/rey-green-tie.png";

const observations = [
  "Why people ignore things.",
  "Why stressful systems reduce consistency.",
  "Why visibility changes accountability.",
  "Why people naturally move toward simplicity.",
];

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="01" label="About" />

        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <div className="md:col-span-7 md:col-start-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl leading-tight tracking-tight text-balance font-light"
            >
              I'm interested in how people behave around systems.
            </motion.h2>

            <div className="mt-12 space-y-4 max-w-xl">
              {observations.map((o, i) => (
                <motion.p
                  key={o}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-4 text-lg text-muted-foreground"
                >
                  <span className="text-forest-soft mt-2 h-px w-6 shrink-0" />
                  {o}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 text-lg md:text-xl text-foreground/90 leading-relaxed max-w-xl text-balance"
            >
              Most of the things I build start with observing real human behavior —
              then simplifying the experience around it.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-5 md:sticky md:top-24"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border bg-card">
              <img
                src={tieImg}
                alt="Joshua Rey portrait"
                className="h-full w-full object-cover"
                style={{ filter: "grayscale(0.1)" }}
              />
            </div>
            <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Fig. 01</span>
              <span>Systems thinking</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
