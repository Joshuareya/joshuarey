import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

type Product = {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  behavior: string;
  system: string;
  themes: string[];
  visual: React.ReactNode;
};

/* ---------- Visual mocks ---------- */

function MovlifyMock() {
  const rows = [
    { name: "Adaeze O.", reason: "Client visit", out: "9:42", eta: "11:30", status: "out" },
    { name: "Tunde K.", reason: "Bank errand", out: "10:05", eta: "10:45", status: "overdue" },
    { name: "Ifeoma A.", reason: "Lunch", out: "12:30", eta: "13:30", status: "out" },
    { name: "Samuel B.", reason: "Field visit", out: "08:15", eta: "—", status: "tracking" },
  ];
  return (
    <div className="rounded-md border border-border bg-ink/60 backdrop-blur p-5 text-xs font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <span className="text-muted-foreground uppercase tracking-widest">Live movement board</span>
        <span className="flex items-center gap-2 text-forest-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-forest-soft animate-pulse" /> Live
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="grid grid-cols-12 gap-2 py-2 border-b border-border/40 last:border-0 items-center"
          >
            <span className="col-span-3 text-foreground">{r.name}</span>
            <span className="col-span-4 text-muted-foreground">{r.reason}</span>
            <span className="col-span-2 text-muted-foreground">{r.out}</span>
            <span className="col-span-2 text-muted-foreground">{r.eta}</span>
            <span className="col-span-1 text-right">
              {r.status === "overdue" ? (
                <span className="text-destructive">!</span>
              ) : (
                <span className="text-forest-soft">●</span>
              )}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border flex justify-between text-muted-foreground">
        <span>4 currently out</span>
        <span>1 overdue</span>
      </div>
    </div>
  );
}

function TithetifyMock() {
  const days = Array.from({ length: 28 });
  const active = new Set([0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 22, 24, 25, 26]);
  return (
    <div className="rounded-md border border-border bg-ink/60 backdrop-blur p-6 text-xs font-mono">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Current streak</div>
          <div className="mt-1 text-3xl font-light text-foreground">22 weeks</div>
        </div>
        <span className="text-forest-soft text-[10px] uppercase tracking-widest">Consistent</span>
      </div>
      <div className="grid grid-cols-14 gap-1.5">
        {days.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            className={`aspect-square rounded-sm ${
              active.has(i) ? "bg-forest" : "bg-border/60"
            }`}
          />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-muted-foreground">
        <span>Next reminder · Sun 9:00</span>
        <span className="text-foreground">+₦ 45,000 this month</span>
      </div>
    </div>
  );
}

function WerktifyMock() {
  const jobs = [
    { role: "Bartender", venue: "Eko Hotel", dist: "1.2 km", urgent: true },
    { role: "Server", venue: "Lagos Continental", dist: "2.4 km", urgent: false },
    { role: "Kitchen prep", venue: "Nok by Alara", dist: "3.0 km", urgent: true },
  ];
  return (
    <div className="rounded-md border border-border bg-ink/60 backdrop-blur p-5 text-xs font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <span className="uppercase tracking-widest text-muted-foreground">Nearby shifts</span>
        <span className="text-forest-soft">3 matching</span>
      </div>
      <div className="mt-3 space-y-2">
        {jobs.map((j, i) => (
          <motion.div
            key={j.role}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center justify-between p-3 rounded-sm border border-border/60 hover:border-forest transition-colors cursor-pointer"
          >
            <div>
              <div className="text-foreground">{j.role}</div>
              <div className="text-muted-foreground mt-0.5">{j.venue} · {j.dist}</div>
            </div>
            {j.urgent ? (
              <span className="text-[10px] uppercase tracking-widest text-forest-soft border border-forest-soft px-2 py-0.5 rounded-full">
                Now
              </span>
            ) : (
              <span className="text-muted-foreground">→</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const products: Product[] = [
  {
    id: "movlify",
    name: "Movlify",
    tagline: "Real-time workplace visibility.",
    problem:
      "Most workplaces still rely on paper logs and memory to track movement. Once someone leaves the office, visibility disappears.",
    behavior:
      "People follow whatever is easiest. If signing out is friction, it gets skipped. If movement is invisible, accountability fades.",
    system:
      "A live system that shows who is out, why they left, when they're expected back, and what needs attention — in real time.",
    themes: ["Visibility", "Accountability", "Coordination", "Operational clarity"],
    visual: <MovlifyMock />,
  },
  {
    id: "tithetify",
    name: "Tithetify",
    tagline: "Consistency for intentional giving.",
    problem:
      "Many people genuinely want to tithe consistently. The barrier is rarely intent — it's forgetfulness, inconsistency, and lack of structure.",
    behavior:
      "Spiritual practice survives on rhythm. Without gentle structure, even sincere intent fades into the noise of daily life.",
    system:
      "A quiet companion that tracks giving, sends thoughtful reminders, builds streaks, and turns intention into rhythm.",
    themes: ["Generosity", "Accountability", "Intentional habits", "Consistency"],
    visual: <TithetifyMock />,
  },
  {
    id: "werktify",
    name: "Werktify",
    tagline: "Hospitality hiring at the speed it actually moves.",
    problem:
      "Hospitality businesses need staff quickly. Workers need shifts quickly. Traditional hiring is too slow for how the industry actually breathes.",
    behavior:
      "Urgency is the entire game. If a worker can't see a shift in the next hour, they're already working somewhere else.",
    system:
      "A location-aware platform that matches venues with nearby available workers and removes the friction in between.",
    themes: ["Speed", "Accessibility", "Local discovery", "Instant staffing"],
    visual: <WerktifyMock />,
  },
];

export function Building() {
  return (
    <section id="building" className="relative py-32 md:py-44 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="02" label="What I'm building" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl leading-tight tracking-tight text-balance font-light max-w-3xl"
        >
          Three systems. Each one starts with a human pattern, not a feature.
        </motion.h2>

        <div className="mt-24 space-y-32 md:space-y-44">
          {products.map((p, idx) => (
            <article key={p.id} className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className={`md:col-span-5 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="md:sticky md:top-28">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-forest-soft">
                      0{idx + 1} / 03
                    </span>
                  </div>
                  <h3 className="mt-4 text-4xl md:text-5xl font-light tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-lg text-muted-foreground">{p.tagline}</p>

                  <div className="mt-10 space-y-6">
                    <Detail label="Human problem" body={p.problem} />
                    <Detail label="Behavior" body={p.behavior} />
                    <Detail label="The system" body={p.system} />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {p.themes.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-3 py-1.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9 }}
                className={`md:col-span-7 ${idx % 2 === 1 ? "md:order-1" : ""}`}
              >
                {p.visual}
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Detail({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-forest-soft mb-2">
        {label}
      </div>
      <p className="text-sm md:text-base text-foreground/85 leading-relaxed max-w-md">
        {body}
      </p>
    </div>
  );
}
