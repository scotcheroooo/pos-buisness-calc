// Pure pricing logic. No React, no side effects. Easy to reason about and test.
//
// A quote is derived from four inputs:
//   product          the selected product configuration
//   variantId        the selected variant id, or null for the product base price
//   quantity         how many pieces the customer wants
//   activeAddonIds   a Set (or array) of add on ids that are toggled on
//
// Money model: every price is a price per single piece. The base and each active
// add on are multiplied by the full quantity, then summed into the grand total.

export function resolveUnitPrice(product, variantId) {
  if (!product) return 0;
  if (variantId && product.variants && product.variants.length) {
    const v = product.variants.find((x) => x.id === variantId);
    if (v) return Number(v.price) || 0;
  }
  return Number(product.basePrice) || 0;
}

export function normalizeQuantity(quantity) {
  const n = Math.floor(Number(quantity));
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

export function buildQuote(product, variantId, quantity, activeAddonIds) {
  const qty = normalizeQuantity(quantity);
  const active =
    activeAddonIds instanceof Set ? activeAddonIds : new Set(activeAddonIds || []);

  const variant =
    variantId && product?.variants
      ? product.variants.find((v) => v.id === variantId) || null
      : null;

  const unitPrice = resolveUnitPrice(product, variantId);
  const baseLineTotal = round2(unitPrice * qty);

  const addonLines = (product?.addons || [])
    .filter((a) => active.has(a.id))
    .map((a) => {
      const unit = Number(a.price) || 0;
      return {
        id: a.id,
        name: a.name,
        unitPrice: unit,
        lineTotal: round2(unit * qty),
      };
    });

  const addonsTotal = round2(
    addonLines.reduce((sum, line) => sum + line.lineTotal, 0)
  );

  const grandTotal = round2(baseLineTotal + addonsTotal);

  return {
    productName: product?.name || "",
    variantName: variant?.name || null,
    quantity: qty,
    unitPrice,
    baseLineTotal,
    addonLines,
    addonsTotal,
    grandTotal,
  };
}

// Round to whole cents to avoid floating point drift like 0.30000000000004.
function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
