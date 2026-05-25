import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

function TreeIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="48"
      height="64"
      viewBox="0 0 48 64"
      fill="none"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
    >
      <motion.path
        d="M24 8 C 14 18, 14 32, 24 38 C 34 32, 34 18, 24 8 Z"
        fill="oklch(0.42 0.12 145)"
        opacity="0.85"
      />
      <line x1="24" y1="38" x2="24" y2="58" stroke="oklch(0.55 0.05 90)" strokeWidth="1.5" />
      <line x1="24" y1="58" x2="18" y2="62" stroke="oklch(0.55 0.05 90)" strokeWidth="1" />
      <line x1="24" y1="58" x2="30" y2="62" stroke="oklch(0.55 0.05 90)" strokeWidth="1" />
    </motion.svg>
  );
}

function PinIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="40"
      height="56"
      viewBox="0 0 40 56"
      fill="none"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
    >
      <path
        d="M20 4 C 11 4, 4 11, 4 20 C 4 32, 20 50, 20 50 C 20 50, 36 32, 36 20 C 36 11, 29 4, 20 4 Z"
        stroke="oklch(0.42 0.12 145)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="20" cy="20" r="5" fill="oklch(0.42 0.12 145)" />
    </motion.svg>
  );
}

function PeopleIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="64"
      height="48"
      viewBox="0 0 64 48"
      fill="none"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
    >
      {[12, 32, 52].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="14" r="6" stroke="oklch(0.55 0.13 145)" strokeWidth="1.5" fill="none" />
          <path
            d={`M ${cx - 9} 44 C ${cx - 9} 32, ${cx + 9} 32, ${cx + 9} 44`}
            stroke="oklch(0.55 0.13 145)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      ))}
    </motion.svg>
  );
}

export function Community() {
  return (
    <section id="community" className="relative py-32 md:py-44 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="06" label="Community" />

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl leading-tight tracking-tight font-light text-balance"
            >
              Tree planting with Joshua Rey.
            </motion.h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Small intentional actions shape the future too. A quiet, recurring
              gathering where we plant trees, talk, and remember that systems are not
              only digital.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://wa.me/2349082828771"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-forest hover:bg-forest-soft text-white px-6 py-3.5 rounded-full text-sm tracking-wide transition-all"
              >
                Join the next tree planting
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="https://wa.me/2349082828771"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-border hover:border-foreground px-6 py-3.5 rounded-full text-sm tracking-wide transition-all"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <Stat n="240+" l="Trees planted" />
              <Stat n="14" l="Gatherings" />
              <Stat n="3" l="Cities" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-5 relative aspect-square rounded-md border border-border bg-card/40 p-10 flex flex-col items-center justify-center gap-8 overflow-hidden"
          >
            <div className="absolute inset-0 grain opacity-50" />
            <div className="relative flex items-end gap-4">
              <TreeIcon />
              <TreeIcon delay={0.2} />
              <TreeIcon delay={0.4} />
            </div>
            <div className="relative">
              <PeopleIcon delay={0.5} />
            </div>
            <div className="relative">
              <PinIcon delay={0.7} />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Port Harcourt · Recurring
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-light text-foreground">{n}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {l}
      </div>
    </div>
  );
}
