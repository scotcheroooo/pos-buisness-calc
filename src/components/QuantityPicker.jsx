import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "../lib/utils";

export default function QuantityPicker({ presets, quantity, onChange }) {
  const setQty = (n) => onChange(Math.max(0, Math.floor(n) || 0));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => {
          const active = Number(quantity) === p;
          return (
            <motion.button
              key={p}
              type="button"
              onClick={() => setQty(p)}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className={cn(
                "tnum min-w-[3.25rem] rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "border-gold/60 bg-gold/10 text-gold"
                  : "border-line bg-panel text-text hover:border-line2"
              )}
            >
              {p}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => setQty(Number(quantity) - 1)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-panel text-muted transition-colors hover:border-line2 hover:text-text"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </motion.button>

        <div className="relative flex-1">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={quantity === 0 ? "" : quantity}
            placeholder="0"
            onChange={(e) => {
              const raw = e.target.value;
              onChange(raw === "" ? 0 : Math.max(0, Math.floor(Number(raw)) || 0));
            }}
            className="tnum h-11 w-full rounded-xl border border-line bg-panel px-4 text-center text-lg font-semibold text-text placeholder:text-faint focus:border-line2"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-faint">
            pcs
          </span>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => setQty(Number(quantity) + 1)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-panel text-muted transition-colors hover:border-line2 hover:text-text"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
