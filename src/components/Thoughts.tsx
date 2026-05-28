import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionLabel } from "./SectionLabel";
import thoughtsImage from "@/assets/rey-thoughts.png";

const thoughts = [
  "Good systems make the right behavior easier.",
  "Visibility changes behavior.",
  "Some truths arrive too late to matter.",
];

export function Thoughts() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % thoughts.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const alignment =
    index === 1
      ? "justify-center text-center"
      : index === 2
      ? "justify-end text-right"
      : "justify-start text-left";

  return (
    <section
      id="thoughts"
      className="relative py-32 md:py-48 px-6 md:px-10 border-t border-border overflow-hidden"
    >
      {/* Background portrait */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <img
          src={thoughtsImage}
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

        <div className="relative mt-16 min-h-[300px] md:min-h-[480px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full flex ${alignment}`}
            >
              <p className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] text-balance max-w-4xl">
                <span className="text-forest-soft">"</span>
                {thoughts[index]}
                <span className="text-forest-soft">"</span>
              </p>
            </motion.blockquote>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
            {thoughts.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show thought ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-forest-soft" : "w-1.5 bg-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
