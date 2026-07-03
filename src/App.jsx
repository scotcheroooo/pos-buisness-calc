import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, Settings2 } from "lucide-react";
import Calculator from "./components/Calculator";
import SettingsPanel from "./components/SettingsPanel";
import { useProductStore } from "./lib/useProductStore";

export default function App() {
  const { products, actions } = useProductStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="relative min-h-dvh">
      <div className="ambient-grid pointer-events-none absolute inset-0 h-[420px]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-panel2 text-gold">
              <CalcIcon className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Pricing Terminal</h1>
              <p className="text-xs text-muted">Butterscotch Development</p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => setSettingsOpen(true)}
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel2 px-3.5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-line2 hover:text-text"
          >
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">Configuration</span>
          </motion.button>
        </motion.header>

        <Calculator products={products} onOpenSettings={() => setSettingsOpen(true)} />

        <footer className="mt-12 border-t border-line pt-4 text-center text-xs text-faint">
          Local personal tool. Nothing is sent to a server.
        </footer>
      </div>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        products={products}
        actions={actions}
      />
    </div>
  );
}
