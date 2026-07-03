import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// A quiet button with a shimmer sweeping across it. Used for secondary actions.
export default function ShimmerButton({ children, className, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-text",
        "bg-panel2 transition-colors hover:border-line2 hover:bg-[#1c2230]",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <span
          className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            animation: "shimmer 2.6s linear infinite",
          }}
        />
      </span>
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
