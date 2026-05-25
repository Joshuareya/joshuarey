import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const thoughts = [
  "Good systems make the right behavior easier.",
  "Visibility changes behavior.",
  "Some truths arrive too late to matter.",
];

export function Thoughts() {
  return (
    <section id="thoughts" className="relative py-32 md:py-48 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="04" label="Thoughts" />

        <div className="space-y-24 md:space-y-40 mt-16">
          {thoughts.map((t, i) => (
            <motion.blockquote
              key={t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`flex ${
                i === 1 ? "justify-center text-center" : i === 2 ? "justify-end text-right" : "text-left"
              }`}
            >
              <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] text-balance max-w-4xl">
                <span className="text-forest-soft">"</span>
                {t}
                <span className="text-forest-soft">"</span>
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
