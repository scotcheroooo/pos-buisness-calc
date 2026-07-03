import { AnimatePresence, motion } from "framer-motion";
import { Receipt as ReceiptIcon } from "lucide-react";
import NumberTicker from "./magicui/NumberTicker";
import BorderBeam from "./magicui/BorderBeam";
import { money, unitMoney } from "../lib/utils";

function Line({ label, sub, amount, muted, strong }) {
  return (
    <div className="flex items-baseline">
      <div className="min-w-0">
        <span className={strong ? "font-semibold" : muted ? "text-muted" : ""}>
          {label}
        </span>
        {sub && <span className="ml-2 text-xs text-faint">{sub}</span>}
      </div>
      <span className="leader" aria-hidden />
      <span className={`tnum shrink-0 ${strong ? "font-semibold" : muted ? "text-muted" : ""}`}>
        {amount}
      </span>
    </div>
  );
}

export default function Receipt({ quote }) {
  const hasQty = quote.quantity > 0;

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-gradient-to-b from-panel2 to-panel p-5 sm:p-6">
      <BorderBeam duration={10} />

      <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-faint">
        <ReceiptIcon className="h-3.5 w-3.5" />
        Summary
      </div>

      {/* Hero total */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.18em] text-muted">Grand total</div>
        <motion.div
          key={quote.grandTotal}
          initial={{ scale: 0.985 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="mt-1 flex items-end"
        >
          <NumberTicker
            value={quote.grandTotal}
            className="tnum bg-gradient-to-br from-goldsoft to-gold bg-clip-text text-5xl font-bold leading-none text-transparent sm:text-6xl"
          />
        </motion.div>
        <div className="tnum mt-2 text-sm text-muted">
          {hasQty ? `${quote.quantity} pcs at ${unitMoney(quote.unitPrice)} base` : "Enter a quantity to price"}
        </div>
      </div>

      {/* Ledger */}
      <div className="space-y-2.5 border-t border-dashed border-line pt-4 text-sm">
        <Line
          label={quote.productName || "No product"}
          sub={quote.variantName || undefined}
          amount={money(quote.baseLineTotal)}
        />

        <AnimatePresence initial={false}>
          {quote.addonLines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="overflow-hidden"
            >
              <Line
                label={line.name}
                sub={`${unitMoney(line.unitPrice)} x ${quote.quantity}`}
                amount={money(line.lineTotal)}
                muted
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 border-t border-line pt-4">
        <Line label="Total" amount={money(quote.grandTotal)} strong />
      </div>
    </div>
  );
}
