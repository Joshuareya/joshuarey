import { motion } from "framer-motion";

const prompts = [
  "A workflow people quietly avoid",
  "A process that depends on memory",
  "A behavior you wish was visible",
];

export function Connect() {
  return (
    <section
      id="connect"
      className="relative py-32 md:py-44 px-6 md:px-10 border-t border-border overflow-hidden"
    >
      {/* ambient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, color-mix(in oklab, var(--forest) 22%, transparent) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-forest-soft animate-pulse" />
          Open to new systems
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mt-8 text-3xl md:text-6xl leading-[1.05] tracking-tight font-light text-balance"
        >
          Have a system worth <em className="not-italic text-forest-soft">simplifying</em>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Tell me about the behavior you're trying to change. I'll help you design the
          system around it.
        </motion.p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {prompts.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="text-xs md:text-sm text-foreground/70 border border-border rounded-full px-4 py-2"
            >
              {p}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://wa.me/2349082828771?text=Hi%20Joshua%2C%20I%27d%20like%20to%20talk%20about%20a%20system."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-forest hover:bg-forest-soft text-white px-7 py-4 rounded-full text-sm tracking-wide transition-all"
          >
            Start a conversation
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="mailto:joshuarey.org@gmail.com?subject=A%20system%20worth%20simplifying"
            className="inline-flex items-center gap-3 border border-border hover:border-foreground text-foreground px-7 py-4 rounded-full text-sm tracking-wide transition-all"
          >
            Send an email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
