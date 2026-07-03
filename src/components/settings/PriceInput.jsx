import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

// Keeps a local string buffer so typing values like 0.15 feels natural, while
// pushing a parsed number up on every change.
export default function PriceInput({ value, onChange, className, prefix = "$" }) {
  const [str, setStr] = useState(String(value ?? ""));

  useEffect(() => {
    // Sync when the external value changes and differs from what is typed.
    if (Number(str) !== Number(value)) setStr(String(value ?? ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-faint">
        {prefix}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={str}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9.]/g, "");
          setStr(raw);
          const n = parseFloat(raw);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        onBlur={() => setStr(String(Number(value) || 0))}
        className="tnum h-9 w-full rounded-lg border border-line bg-panel pl-6 pr-2 text-right text-sm text-text focus:border-line2"
      />
    </div>
  );
}
