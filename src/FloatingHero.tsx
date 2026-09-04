import { useEffect, useRef } from "react";

export function FloatingHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const current = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (event: MouseEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const nx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const ny = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      target.current = {
        x: nx * 28,
        y: ny * 20,
        rx: ny * -10,
        ry: nx * 14,
      };
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0, rx: 0, ry: 0 };
    };

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * 0.12;
      c.y += (t.y - c.y) * 0.12;
      c.rx += (t.rx - c.rx) * 0.12;
      c.ry += (t.ry - c.ry) * 0.12;
      const img = imgRef.current;
      if (img) {
        img.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
      }
      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div className="hero-float" ref={wrapRef}>
      <div className="hero-float-glow" aria-hidden="true" />
      <img
        ref={imgRef}
        className="hero-float-img"
        src="/hero-avatar.png"
        alt="3D portrait of Shristi Suman with star, heart, and cursor icons"
        width={720}
        height={720}
        draggable={false}
      />
    </div>
  );
}
