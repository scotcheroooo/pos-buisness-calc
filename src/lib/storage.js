import { PRODUCTS as SEED } from "../data/products.js";

const KEY = "pos.products.v1";

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

export function seedProducts() {
  return clone(SEED);
}

export function loadProducts() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seeded = seedProducts();
      saveProducts(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("bad shape");
    return parsed;
  } catch {
    const seeded = seedProducts();
    saveProducts(seeded);
    return seeded;
  }
}

export function saveProducts(products) {
  try {
    localStorage.setItem(KEY, JSON.stringify(products));
  } catch {
    // localStorage can be unavailable in private modes. The app still works
    // for the current session, configuration just will not persist.
  }
}
