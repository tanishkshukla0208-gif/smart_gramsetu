import { useEffect, useRef } from "react";

export default function AnimatedNetwork() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = Array.from({ length: 34 }, (_, index) => ({ x: Math.random(), y: Math.random(), r: index % 5 === 0 ? 2.2 : 1.2, vx: (Math.random() - 0.5) * 0.00013, vy: (Math.random() - 0.5) * 0.00013 }));
    let frame = 0;
    let width = 0;
    let height = 0;
    const resize = () => { const ratio = Math.min(window.devicePixelRatio || 1, 2); width = canvas.clientWidth; height = canvas.clientHeight; canvas.width = width * ratio; canvas.height = height * ratio; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      const pulse = reduced ? 0.8 : 0.72 + Math.sin(time * 0.0005) * 0.08;
      points.forEach((point) => { if (!reduced) { point.x += point.vx; point.y += point.vy; if (point.x < 0 || point.x > 1) point.vx *= -1; if (point.y < 0 || point.y > 1) point.vy *= -1; } });
      points.forEach((point, index) => points.slice(index + 1).forEach((other) => { const dx = (point.x - other.x) * width; const dy = (point.y - other.y) * height; const distance = Math.hypot(dx, dy); if (distance < 185) { context.beginPath(); context.moveTo(point.x * width, point.y * height); context.lineTo(other.x * width, other.y * height); context.strokeStyle = `rgba(57, 217, 255, ${Math.max(0, (1 - distance / 185) * 0.17)})`; context.lineWidth = 1; context.stroke(); } }));
      points.forEach((point) => { const x = point.x * width; const y = point.y * height; context.beginPath(); context.arc(x, y, point.r + pulse * 0.7, 0, Math.PI * 2); context.fillStyle = "rgba(57, 217, 255, .7)"; context.shadowColor = "rgba(57, 217, 255, .9)"; context.shadowBlur = 15; context.fill(); context.shadowBlur = 0; });
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener("resize", resize); frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas className="network-canvas" ref={canvasRef} aria-hidden="true" />;
}
