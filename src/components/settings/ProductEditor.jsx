import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import PriceInput from "./PriceInput";
import PresetEditor from "./PresetEditor";

function FieldLabel({ children }) {
  return (
    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-faint">
      {children}
    </div>
  );
}

function Row({ name, price, onName, onPrice, onDelete, namePlaceholder }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 32 }}
      className="overflow-hidden"
    >
      <div className="flex items-center gap-2 pb-2">
        <input
          value={name}
          placeholder={namePlaceholder}
          onChange={(e) => onName(e.target.value)}
          className="h-9 min-w-0 flex-1 rounded-lg border border-line bg-panel px-3 text-sm text-text placeholder:text-faint focus:border-line2"
        />
        <PriceInput value={price} onChange={onPrice} className="w-24 shrink-0" />
        <button
          type="button"
          onClick={onDelete}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-panel text-faint hover:border-red-500/40 hover:text-red-400"
          aria-label="Delete row"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function AddButton({ onClick, children }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-line2 px-3 py-1.5 text-xs font-medium text-muted hover:border-gold/50 hover:text-gold"
    >
      <Plus className="h-3.5 w-3.5" />
      {children}
    </motion.button>
  );
}

export default function ProductEditor({ product, expanded, onToggle, actions }) {
  const pid = product.id;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <div className="min-w-0">
          <div className="truncate font-semibold">{product.name || "Untitled"}</div>
          <div className="tnum text-xs text-muted">
            {(product.variants?.length || 0)} variants, {(product.addons?.length || 0)} add ons
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
        >
          <ChevronDown className="h-4 w-4 text-muted" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 border-t border-line px-4 py-4">
              {/* Basics */}
              <div className="space-y-3">
                <div>
                  <FieldLabel>Name</FieldLabel>
                  <input
                    value={product.name}
                    onChange={(e) => actions.updateProduct(pid, { name: e.target.value })}
                    className="h-9 w-full rounded-lg border border-line bg-panel px-3 text-sm text-text focus:border-line2"
                  />
                </div>
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <input
                    value={product.blurb || ""}
                    placeholder="optional"
                    onChange={(e) => actions.updateProduct(pid, { blurb: e.target.value })}
                    className="h-9 w-full rounded-lg border border-line bg-panel px-3 text-sm text-text placeholder:text-faint focus:border-line2"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <FieldLabel>Base price per piece</FieldLabel>
                  <PriceInput
                    value={product.basePrice}
                    onChange={(n) => actions.updateProduct(pid, { basePrice: n })}
                    className="w-28"
                  />
                </div>
                <p className="text-xs text-faint">
                  Used when the product has no variants, or as the fallback price.
                </p>
              </div>

              {/* Variants */}
              <div>
                <FieldLabel>Variants</FieldLabel>
                <AnimatePresence initial={false}>
                  {product.variants.map((v) => (
                    <Row
                      key={v.id}
                      name={v.name}
                      price={v.price}
                      namePlaceholder="Variant name"
                      onName={(name) => actions.updateVariant(pid, v.id, { name })}
                      onPrice={(price) => actions.updateVariant(pid, v.id, { price })}
                      onDelete={() => actions.deleteVariant(pid, v.id)}
                    />
                  ))}
                </AnimatePresence>
                <AddButton onClick={() => actions.addVariant(pid)}>Add variant</AddButton>
              </div>

              {/* Add ons */}
              <div>
                <FieldLabel>Add ons</FieldLabel>
                <AnimatePresence initial={false}>
                  {product.addons.map((a) => (
                    <Row
                      key={a.id}
                      name={a.name}
                      price={a.price}
                      namePlaceholder="Add on name"
                      onName={(name) => actions.updateAddon(pid, a.id, { name })}
                      onPrice={(price) => actions.updateAddon(pid, a.id, { price })}
                      onDelete={() => actions.deleteAddon(pid, a.id)}
                    />
                  ))}
                </AnimatePresence>
                <AddButton onClick={() => actions.addAddon(pid)}>Add add on</AddButton>
              </div>

              {/* Presets */}
              <div>
                <FieldLabel>Preset quantities</FieldLabel>
                <PresetEditor
                  presets={product.presets}
                  onAdd={(v) => actions.addPreset(pid, v)}
                  onRemove={(v) => actions.removePreset(pid, v)}
                />
              </div>

              {/* Delete product */}
              <div className="border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => actions.deleteProduct(pid)}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete product
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
