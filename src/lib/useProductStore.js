import { useCallback, useEffect, useMemo, useState } from "react";
import { loadProducts, saveProducts, seedProducts, uid } from "./storage.js";

// Central store for product configuration. Holds the list in state, persists
// every change to localStorage, and exposes immutable CRUD helpers used by the
// settings panel. Editing here updates the calculator live.
export function useProductStore() {
  const [products, setProducts] = useState(loadProducts);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const patchProduct = useCallback((pid, updater) => {
    setProducts((list) =>
      list.map((p) => (p.id === pid ? updater(p) : p))
    );
  }, []);

  const actions = useMemo(
    () => ({
      addProduct() {
        const product = {
          id: uid("prod"),
          name: "New Product",
          blurb: "",
          basePrice: 0,
          variants: [],
          addons: [],
          presets: [10, 25, 50, 100],
        };
        setProducts((list) => [...list, product]);
        return product.id;
      },

      updateProduct(pid, patch) {
        patchProduct(pid, (p) => ({ ...p, ...patch }));
      },

      deleteProduct(pid) {
        setProducts((list) => list.filter((p) => p.id !== pid));
      },

      addVariant(pid) {
        patchProduct(pid, (p) => ({
          ...p,
          variants: [
            ...(p.variants || []),
            { id: uid("var"), name: "New Variant", price: p.basePrice || 0 },
          ],
        }));
      },
      updateVariant(pid, vid, patch) {
        patchProduct(pid, (p) => ({
          ...p,
          variants: p.variants.map((v) => (v.id === vid ? { ...v, ...patch } : v)),
        }));
      },
      deleteVariant(pid, vid) {
        patchProduct(pid, (p) => ({
          ...p,
          variants: p.variants.filter((v) => v.id !== vid),
        }));
      },

      addAddon(pid) {
        patchProduct(pid, (p) => ({
          ...p,
          addons: [
            ...(p.addons || []),
            { id: uid("add"), name: "New Add on", price: 0 },
          ],
        }));
      },
      updateAddon(pid, aid, patch) {
        patchProduct(pid, (p) => ({
          ...p,
          addons: p.addons.map((a) => (a.id === aid ? { ...a, ...patch } : a)),
        }));
      },
      deleteAddon(pid, aid) {
        patchProduct(pid, (p) => ({
          ...p,
          addons: p.addons.filter((a) => a.id !== aid),
        }));
      },

      addPreset(pid, value) {
        const n = Math.floor(Number(value));
        if (!Number.isFinite(n) || n <= 0) return;
        patchProduct(pid, (p) => ({
          ...p,
          presets: Array.from(new Set([...(p.presets || []), n])).sort(
            (a, b) => a - b
          ),
        }));
      },
      removePreset(pid, value) {
        patchProduct(pid, (p) => ({
          ...p,
          presets: (p.presets || []).filter((n) => n !== value),
        }));
      },

      resetToDefaults() {
        setProducts(seedProducts());
      },
    }),
    [patchProduct]
  );

  return { products, actions };
}
