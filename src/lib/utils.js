import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function money(value) {
  const n = Number.isFinite(value) ? value : 0;
  return usd.format(n);
}

const unitFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
});

// Per piece prices can be fractions of a cent, so allow up to 3 decimals.
export function unitMoney(value) {
  const n = Number.isFinite(value) ? value : 0;
  return unitFmt.format(n);
}
