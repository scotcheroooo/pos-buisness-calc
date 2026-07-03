import { useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

// A spotlight that follows the cursor across the card surface. Purely ambient,
// so it sits behind the content and never blocks pointer events.
export default function MagicCard({
  children,
  className,
  spotlightColor = "rgba(245, 184, 65, 0.14)",
  radius = 220,
}) {
  const mouseX = useMotionValue(-radius);
  const mouseY = useMotionValue(-radius);

  const onMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const onLeave = useCallback(() => {
    mouseX.set(-radius);
    mouseY.set(-radius);
  }, [mouseX, mouseY, radius]);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 70%)`;

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("group relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
