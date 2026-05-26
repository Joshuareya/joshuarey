import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import thoughtsImg from "@/assets/rey-thoughts.png";

const thoughts = [
  "Good systems make the right behavior easier.",
  "Visibility changes behavior.",
  "Some truths arrive too late to matter.",
];

export function Thoughts() {
  return (
    <section
      id="thoughts"
      className="relative py-32 md:py-48 px-6 md:px-10 border-t border-border overflow-hidden"
    >
      {/* Background portrait — clearly visible */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <img
          src={thoughtsImg}
          alt="Joshua Rey portrait"
          className="absolute right-0 bottom-0 h-[70%] sm:h-[85%] md:h-full w-auto object-contain object-bottom opacity-80 md:opacity-90"
          style={{ filter: "contrast(1.08) brightness(1)" }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 70%, transparent) 35%, transparent 65%, color-mix(in oklab, var(--background) 80%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, color-mix(in oklab, var(--background) 92%, transparent) 30%, transparent 65%, color-mix(in oklab, var(--background) 30%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
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
                i === 1
                  ? "justify-center text-center"
                  : i === 2
                  ? "justify-end text-right"
                  : "text-left"
              }`}
            >
              <p className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] text-balance max-w-4xl">
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
