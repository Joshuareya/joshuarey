import { motion } from "framer-motion";

export function SystemLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.18]"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="ln" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.42 0.12 145)" stopOpacity="0" />
          <stop offset="0.5" stopColor="oklch(0.55 0.13 145)" stopOpacity="1" />
          <stop offset="1" stopColor="oklch(0.42 0.12 145)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[120, 240, 360, 480, 600, 720].map((y, i) => (
        <motion.path
          key={y}
          d={`M 0 ${y} Q 300 ${y - 30 + i * 8} 600 ${y} T 1200 ${y}`}
          stroke="url(#ln)"
          strokeWidth="0.6"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3 + i * 0.3, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
      {[[180, 200], [420, 340], [780, 180], [980, 520], [320, 620], [640, 460]].map(
        ([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill="oklch(0.55 0.13 145)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.4], scale: 1 }}
            transition={{ duration: 2, delay: 1 + i * 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
          />
        )
      )}
    </svg>
  );
}
