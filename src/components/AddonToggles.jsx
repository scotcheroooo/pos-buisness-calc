import { motion } from "framer-motion";
import { unitMoney, cn } from "../lib/utils";

function Switch({ on }) {
  return (
    <span
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
        on ? "bg-gold" : "bg-line2"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 32 }}
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-ink shadow",
          on ? "right-0.5" : "left-0.5"
        )}
      />
    </span>
  );
}

export default function AddonToggles({ addons, active, onToggle }) {
  if (!addons || addons.length === 0) return null;

  return (
    <div className="space-y-2">
      {addons.map((a) => {
        const on = active.has(a.id);
        return (
          <motion.button
            key={a.id}
            type="button"
            onClick={() => onToggle(a.id)}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
              on ? "border-gold/40 bg-gold/5" : "border-line bg-panel hover:border-line2"
            )}
          >
            <div className="min-w-0">
              <div className="truncate font-medium">{a.name}</div>
              <div className="tnum text-xs text-muted">{unitMoney(a.price)} per piece</div>
            </div>
            <Switch on={on} />
          </motion.button>
        );
      })}
    </div>
  );
}
