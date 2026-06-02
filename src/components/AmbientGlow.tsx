import { useEffect } from "react";
import { animate, motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft, site-wide forest glow that quietly trails the cursor.
 * Fixed behind all content, ignores pointer events, and keeps the page
 * feeling alive between scrolls without distracting from the content.
 */
export function AmbientGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 22, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 40, damping: 22, mass: 0.8 });

  useEffect(() => {
    // center it before the first move so it isn't stuck in the corner
    x.set(window.innerWidth / 2);
    y.set(window.innerHeight / 2);

    // Touch devices have no cursor — let the glow drift on its own so the
    // page still feels alive on mobile.
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = animate(x, [w * 0.3, w * 0.72, w * 0.3], {
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut",
      });
      const cy = animate(y, [h * 0.32, h * 0.6, h * 0.32], {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      });
      return () => {
        cx.stop();
        cy.stop();
      };
    }

    const handle = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className="h-[36rem] w-[36rem] rounded-full bg-forest/[0.07] blur-[120px]" />
      </div>
    </motion.div>
  );
}
