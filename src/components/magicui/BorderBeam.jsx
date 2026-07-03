import { cn } from "../../lib/utils";

// A light that travels around the border of its rounded parent. The parent must
// be position relative and rounded. Uses offset-path so the dot hugs the corners.
export default function BorderBeam({
  className,
  size = 190,
  duration = 9,
  delay = 0,
  colorFrom = "var(--color-gold)",
  colorTo = "var(--color-goldsoft)",
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{ containerType: "normal" }}
    >
      <div
        className={cn("absolute aspect-square rounded-full", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          animation: `beam ${duration}s linear infinite`,
          animationDelay: `${-delay}s`,
          opacity: 0.9,
          filter: "blur(1px)",
        }}
      />
    </div>
  );
}
