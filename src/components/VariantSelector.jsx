import { motion } from "framer-motion";
import { unitMoney, cn } from "../lib/utils";

export default function VariantSelector({ variants, selectedId, onSelect }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => {
        const active = v.id === selectedId;
        return (
          <motion.button
            key={v.id}
            type="button"
            onClick={() => onSelect(v.id)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className={cn(
              "relative rounded-xl border px-3.5 py-2.5 text-sm transition-colors",
              active
                ? "border-transparent text-text"
                : "border-line bg-panel text-muted hover:border-line2 hover:text-text"
            )}
          >
            {active && (
              <motion.span
                layoutId="variant-pill"
                className="absolute inset-0 rounded-xl bg-panel2 ring-1 ring-white/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span className="font-medium">{v.name}</span>
              <span className="tnum text-xs text-faint">{unitMoney(v.price)}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
