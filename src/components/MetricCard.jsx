import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MetricCard({ value, label, icon: Icon }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0; const duration = 750; const start = performance.now();
    const tick = (time) => { current = Math.min(1, (time - start) / duration); setCount(Math.round(value * (1 - Math.pow(1 - current, 3)))); if (current < 1) requestAnimationFrame(tick); };
    const frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [value]);
  return <motion.div className="metric-card" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="metric-icon"><Icon size={17} /></div><strong>{count.toString().padStart(2, "0")}</strong><span>{label}</span></motion.div>;
}
