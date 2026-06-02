import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
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
            className="text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance font-light"
          >
            I study <em className="not-italic text-forest-soft">human behavior</em>, then build
            systems around it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            I build systems around how people move, work, give, respond, and interact with everyday
            processes.
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
          <InteractivePortrait />
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

function InteractivePortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  // glow drifts behind the portrait as a backlight, not a foreground disk
  const circleX = useTransform(sx, [0, 1], ["-6%", "10%"]);
  const circleY = useTransform(sy, [0, 1], ["16%", "28%"]);
  const circleScale = useTransform(sx, [0, 0.5, 1], [0.95, 1.08, 1.18]);

  // signature: portrait tilts subtly toward the cursor (3D parallax)
  const tiltY = useTransform(sx, [0, 1], [9, -9]);
  const tiltX = useTransform(sy, [0, 1], [-7, 7]);

  // scroll progression — as user scrolls past hero, glow fades but always stays behind portrait
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const circleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.35]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };



  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative grid isolate aspect-[4/5] w-full max-w-[280px] sm:max-w-sm md:max-w-none mx-auto"
      style={{ perspective: 1100 }}
    >
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
        className="pointer-events-none relative z-10 col-start-1 row-start-1 h-full w-full overflow-hidden pb-6 md:pb-10"
      >
        <img
          src={heroImg}
          alt="Joshua Rey portrait in traditional black agbada"
          className="h-full w-full select-none object-contain object-bottom"
          style={{
            filter:
              "grayscale(0.1) contrast(1.05) drop-shadow(0 0 12px color-mix(in oklab, var(--forest) 14%, transparent))",
          }}
          draggable={false}
        />
      </motion.div>

      {/* solid green disc behind the portrait */}
      <motion.div
        style={{
          x: circleX,
          y: circleY,
          scale: circleScale,
          opacity: circleOpacity,
        }}
        className="pointer-events-none col-start-1 row-start-1 self-center justify-self-center z-0 -ml-[18%] -mt-[4%] h-32 w-32 md:h-48 md:w-48"
      >
        {/* soft outer halo */}
        <div className="absolute -inset-8 rounded-full bg-forest/15 blur-3xl" />
        {/* the disc itself */}
        <motion.div
          animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.03, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--forest-soft) 92%, transparent) 0%, var(--forest) 45%, color-mix(in oklab, var(--forest) 40%, transparent) 78%, transparent 100%)",
          }}
        />
      </motion.div>


      {/* grounding shadow so the portrait rests instead of floating */}
      <div className="pointer-events-none col-start-1 row-start-1 self-end justify-self-center z-[5] mb-[7%] md:mb-[9%] h-6 w-2/3 rounded-[100%] bg-black/55 blur-xl md:h-8" />
    </div>
  );
}
