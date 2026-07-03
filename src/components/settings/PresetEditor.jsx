import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";

export default function PresetEditor({ presets, onAdd, onRemove }) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    onAdd(draft);
    setDraft("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence initial={false}>
        {(presets || []).map((n) => (
          <motion.button
            key={n}
            type="button"
            layout
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            onClick={() => onRemove(n)}
            className="tnum group inline-flex items-center gap-1 rounded-lg border border-line bg-panel px-2.5 py-1.5 text-sm text-text hover:border-gold/50 hover:text-gold"
            title="Remove"
          >
            {n}
            <X className="h-3 w-3 text-faint group-hover:text-gold" />
          </motion.button>
        ))}
      </AnimatePresence>

      <div className="inline-flex items-center gap-1">
        <input
          type="text"
          inputMode="numeric"
          value={draft}
          placeholder="add"
          onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
          }}
          className="tnum h-8 w-16 rounded-lg border border-line bg-panel px-2 text-sm text-text placeholder:text-faint focus:border-line2"
        />
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={commit}
          className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-panel text-muted hover:border-line2 hover:text-text"
          aria-label="Add preset"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
