import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function MetricCard({ value, label, icon: Icon, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);
  const numericValue = typeof value === "number" ? value : parseInt(value, 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    let start = null;
    const duration = 1200; // 1.2s institutional count-up
    let frameId;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numericValue * ease));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      className="metric-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
    >
      <div className="metric-icon">
        <Icon size={17} />
      </div>
      <strong>{count.toString().padStart(2, "0")}</strong>
      <span>{label}</span>
    </motion.div>
  );
}

