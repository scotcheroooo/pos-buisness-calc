import { useEffect, useRef } from "react";
import { useSpring, useMotionValueEvent } from "framer-motion";
import { money } from "../../lib/utils";

// Rolls smoothly from the previous value to the next whenever `value` changes,
// reformatting as currency on every frame so the digits count up or down.
export default function NumberTicker({ value = 0, className }) {
  const ref = useRef(null);
  const spring = useSpring(value, { stiffness: 90, damping: 18, mass: 0.9 });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useMotionValueEvent(spring, "change", (latest) => {
    if (ref.current) ref.current.textContent = money(latest);
  });

  return (
    <span ref={ref} className={className}>
      {money(value)}
    </span>
  );
}
