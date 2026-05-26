import { motion } from "framer-motion";
import heroImg from "@/assets/rey-green-cap.png";
import { SystemLines } from "./SystemLines";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden grain">
      <SystemLines />
      {/* radial darkness */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, transparent 0%, oklch(0.12 0.005 200) 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-28 md:pt-40 pb-20 grid md:grid-cols-12 gap-8 md:gap-10 items-center min-h-screen">
        <div className="md:col-span-7 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-forest-soft" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Studying behavior · Building systems
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance font-light"
          >
            I study <em className="not-italic text-forest-soft">human behavior</em>,
            then build systems around it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            I build systems around how people move, work, give, respond, and interact
            with everyday processes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="#building"
              className="group inline-flex items-center gap-3 bg-forest hover:bg-forest-soft text-white px-6 py-3.5 rounded-full text-sm tracking-wide transition-all"
            >
              Explore what I'm building
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#observing"
              className="group inline-flex items-center gap-3 border border-border hover:border-foreground text-foreground px-6 py-3.5 rounded-full text-sm tracking-wide transition-all"
            >
              Read observations
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mt-20 hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span>Africa · Worldwide</span>
            <span className="h-px flex-1 max-w-24 bg-border" />
            <span>Currently observing</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="md:col-span-5 order-1 md:order-2 relative"
        >
          <div className="relative aspect-[4/5] w-full">
            <div className="absolute -inset-6 bg-forest/10 blur-3xl rounded-full" />
            <div className="absolute top-10 -left-2 md:-left-6 h-32 w-32 md:h-44 md:w-44 rounded-full bg-forest -z-0" />
            <img
              src={heroImg}
              alt="Joshua Rey portrait in traditional black agbada with a green cap"
              className="relative z-10 h-full w-full object-contain object-bottom"
              style={{ filter: "grayscale(0.15) contrast(1.05)" }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-8 w-px bg-border"
        />
      </motion.div>
    </section>
  );
}
