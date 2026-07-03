import { motion } from "framer-motion";
import { Check, Package } from "lucide-react";
import MagicCard from "./magicui/MagicCard";
import { cn } from "../lib/utils";

export default function ProductSelector({ products, selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {products.map((product, i) => {
        const active = product.id === selectedId;
        return (
          <motion.button
            key={product.id}
            type="button"
            onClick={() => onSelect(product.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, type: "spring", stiffness: 260, damping: 24 }}
            whileTap={{ scale: 0.985 }}
            className="text-left"
          >
            <MagicCard
              className={cn(
                "rounded-2xl border p-4 transition-colors duration-200",
                active
                  ? "border-gold/60 bg-panel2"
                  : "border-line bg-panel hover:border-line2"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Package
                      className={cn(
                        "h-4 w-4 shrink-0",
                        active ? "text-gold" : "text-faint"
                      )}
                    />
                    <span className="truncate font-semibold">{product.name}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted">{product.blurb}</p>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    scale: active ? 1 : 0.6,
                    opacity: active ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-ink"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.div>
              </div>
            </MagicCard>
          </motion.button>
        );
      })}
    </div>
  );
}
