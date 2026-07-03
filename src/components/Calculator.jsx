import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Settings2, PackagePlus } from "lucide-react";
import ProductSelector from "./ProductSelector";
import VariantSelector from "./VariantSelector";
import QuantityPicker from "./QuantityPicker";
import AddonToggles from "./AddonToggles";
import Receipt from "./Receipt";
import ShimmerButton from "./magicui/ShimmerButton";
import { buildQuote } from "../lib/calc";

function Section({ index, title, hint, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      className="space-y-3"
    >
      <div className="flex items-baseline gap-2.5">
        <span className="tnum text-xs text-faint">{index}</span>
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          {title}
        </h2>
        {hint && <span className="text-xs text-faint">{hint}</span>}
      </div>
      {children}
    </motion.section>
  );
}

const firstVariantId = (product) =>
  product?.variants?.length ? product.variants[0].id : null;

export default function Calculator({ products, onOpenSettings }) {
  const [productId, setProductId] = useState(() => products[0]?.id ?? null);
  const [variantId, setVariantId] = useState(() => firstVariantId(products[0]));
  const [quantity, setQuantity] = useState(() => products[0]?.presets?.[0] ?? 1);
  const [activeAddons, setActiveAddons] = useState(() => new Set());

  const product = useMemo(
    () => products.find((p) => p.id === productId) || null,
    [products, productId]
  );

  const selectProduct = (id) => {
    const next = products.find((p) => p.id === id);
    if (!next) return;
    setProductId(id);
    setVariantId(firstVariantId(next));
    setActiveAddons(new Set());
    setQuantity(next.presets?.[0] ?? 1);
  };

  // Keep the selected product valid if it gets deleted in settings.
  useEffect(() => {
    if (products.length === 0) return;
    if (!products.some((p) => p.id === productId)) {
      selectProduct(products[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // Keep the selected variant valid if it gets deleted in settings.
  useEffect(() => {
    if (!product) return;
    const ok = product.variants?.some((v) => v.id === variantId);
    if (!ok) setVariantId(firstVariantId(product));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const toggleAddon = (id) => {
    setActiveAddons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const reset = () => {
    if (!product) return;
    setVariantId(firstVariantId(product));
    setActiveAddons(new Set());
    setQuantity(product.presets?.[0] ?? 1);
  };

  const quote = useMemo(
    () => buildQuote(product, variantId, quantity, activeAddons),
    [product, variantId, quantity, activeAddons]
  );

  if (products.length === 0) {
    return (
      <div className="grid place-items-center rounded-[var(--radius-panel)] border border-dashed border-line py-20 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-panel2 text-gold">
          <PackagePlus className="h-5 w-5" />
        </div>
        <h2 className="mt-4 font-semibold">No products yet</h2>
        <p className="mt-1 max-w-xs text-sm text-muted">
          Open configuration to add your first product and start building quotes.
        </p>
        <ShimmerButton onClick={onOpenSettings} className="mt-5">
          <Settings2 className="h-4 w-4" />
          Open configuration
        </ShimmerButton>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
      {/* Configurator */}
      <div className="space-y-8">
        <Section index="01" title="Product">
          <ProductSelector
            products={products}
            selectedId={productId}
            onSelect={selectProduct}
          />
        </Section>

        <AnimatePresence mode="wait">
          <motion.div
            key={product?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-8"
          >
            {product?.variants?.length > 0 && (
              <Section index="02" title="Variant" hint="sets the base price">
                <VariantSelector
                  variants={product.variants}
                  selectedId={variantId}
                  onSelect={setVariantId}
                />
              </Section>
            )}

            <Section index="03" title="Quantity">
              <QuantityPicker
                presets={product?.presets || []}
                quantity={quantity}
                onChange={setQuantity}
              />
            </Section>

            {product?.addons?.length > 0 && (
              <Section index="04" title="Add ons" hint="priced per piece">
                <AddonToggles
                  addons={product.addons}
                  active={activeAddons}
                  onToggle={toggleAddon}
                />
              </Section>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end pt-1">
          <ShimmerButton onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </ShimmerButton>
        </div>
      </div>

      {/* Receipt, sticky on desktop */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <Receipt quote={quote} />
      </div>
    </div>
  );
}
