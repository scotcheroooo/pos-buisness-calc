import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, RotateCcw, Settings2, X } from "lucide-react";
import ProductEditor from "./settings/ProductEditor";
import ShimmerButton from "./magicui/ShimmerButton";

export default function SettingsPanel({ open, onClose, products, actions }) {
  const [expandedId, setExpandedId] = useState(null);

  // Lock body scroll while the drawer is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const addProduct = () => {
    const id = actions.addProduct();
    setExpandedId(id);
  };

  const reset = () => {
    if (
      window.confirm(
        "Reset all products to the defaults? This clears your saved configuration."
      )
    ) {
      actions.resetToDefaults();
      setExpandedId(null);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[34rem] flex-col border-l border-line bg-ink shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-panel2 text-gold">
                  <Settings2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold leading-tight">Configuration</div>
                  <div className="text-xs text-muted">Saved on this device</div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel text-muted hover:border-line2 hover:text-text"
                aria-label="Close settings"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex items-center justify-between gap-3 px-5 py-3">
              <ShimmerButton onClick={addProduct}>
                <Plus className="h-4 w-4" />
                Add product
              </ShimmerButton>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-faint hover:text-muted"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset to defaults
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 pb-8 pt-1">
              {products.length === 0 ? (
                <div className="mt-16 text-center">
                  <p className="text-sm text-muted">No products yet.</p>
                  <p className="mt-1 text-xs text-faint">
                    Add one to start building quotes.
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <ProductEditor
                        product={product}
                        expanded={expandedId === product.id}
                        onToggle={() =>
                          setExpandedId((id) =>
                            id === product.id ? null : product.id
                          )
                        }
                        actions={actions}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
