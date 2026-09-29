import { useEffect, useRef, useState } from "react";

const faces = {
  center: "/hero/girl.webp",
  right: "/hero/girl-right.webp",
  "down-right": "/hero/girl-down-right.webp",
  down: "/hero/girl-down.webp",
  "down-left": "/hero/girl-down-left.webp",
  left: "/hero/girl-left.webp",
  "up-left": "/hero/girl-up-left.webp",
  up: "/hero/girl-up.webp",
  "up-right": "/hero/girl-up-right.webp",
  work: "/hero/girl-work.webp",
} as const;

type Gaze = keyof typeof faces;

const gazeOrder: Gaze[] = [
  "right",
  "down-right",
  "down",
  "down-left",
  "left",
  "up-left",
  "up",
  "up-right",
];

const layers = [
  { id: "star", src: "/hero/star.webp", alt: "", depth: 1.2 },
  { id: "stripes", src: "/hero/stripes.webp", alt: "", depth: 1.35 },
  { id: "heart", src: "/hero/heart.webp", alt: "", depth: 1.5 },
  { id: "shell", src: "/hero/shell.webp", alt: "", depth: 1.7 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function gazeFromPointer(nx: number, ny: number): Gaze {
  const dist = Math.hypot(nx, ny);
  if (dist < 0.16) return "center";
  const deg = (Math.atan2(ny, nx) * 180) / Math.PI;
  const idx = (((Math.round(deg / 45) % 8) + 8) % 8);
  return gazeOrder[idx];
}

export function FloatingHero({ workHover = false }: { workHover?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const girlRefs = useRef<(HTMLImageElement | null)[]>([]);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const gazeRef = useRef<Gaze>("center");
  const workHoverRef = useRef(workHover);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  workHoverRef.current = workHover;
  const [facesReady, setFacesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const markReady = () => {
      if (!cancelled) setFacesReady(true);
    };
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const id = idle(markReady, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const timer = window.setTimeout(markReady, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const keys = Object.keys(faces) as Gaze[];
    if (workHover) {
      gazeRef.current = "work";
    } else if (gazeRef.current === "work") {
      gazeRef.current = "center";
    }
    girlRefs.current.forEach((el, i) => {
      el?.classList.toggle("is-on", keys[i] === gazeRef.current);
    });
  }, [workHover]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setGaze = (next: Gaze) => {
      if (gazeRef.current === next) return;
      gazeRef.current = next;
      const keys = Object.keys(faces) as Gaze[];
      girlRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("is-on", keys[i] === next);
      });
    };

    const wrapInView = (rect: DOMRect) =>
      rect.width > 8 &&
      rect.height > 8 &&
      rect.bottom > 0 &&
      rect.top < window.innerHeight;

    const resetMotion = () => {
      target.current = { x: 0, y: 0 };
      if (!workHoverRef.current) setGaze("center");
    };

    const onMove = (event: MouseEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      if (!wrapInView(rect)) {
        resetMotion();
        return;
      }
      const nx = clamp(
        (event.clientX - (rect.left + rect.width / 2)) / rect.width,
        -0.55,
        0.55,
      );
      const ny = clamp(
        (event.clientY - (rect.top + rect.height / 2)) / rect.height,
        -0.55,
        0.55,
      );
      target.current = { x: nx, y: ny };
      if (workHoverRef.current) {
        setGaze("work");
        return;
      }
      setGaze(gazeFromPointer(nx, ny));
    };

    const onLeave = () => {
      resetMotion();
    };

    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap || wrapInView(wrap.getBoundingClientRect())) return;
      resetMotion();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    if (reduce) return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };

    const tick = () => {
      const wrap = wrapRef.current;
      if (wrap && !wrapInView(wrap.getBoundingClientRect())) {
        target.current = { x: 0, y: 0 };
      }
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * 0.18;
      c.y += (t.y - c.y) * 0.18;
      if (Math.abs(c.x) < 0.002 && Math.abs(c.y) < 0.002 && t.x === 0 && t.y === 0) {
        c.x = 0;
        c.y = 0;
      }
      const girlShift = c.x === 0 && c.y === 0 ? "none" : `translate3d(${c.x * 4.5}px, ${c.y * 3}px, 0)`;
      girlRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transform = girlShift;
      });
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        if (girlShift === "none") {
          el.style.transform = "none";
          return;
        }
        const depth = layers[i].depth;
        el.style.transform = `translate3d(${c.x * 18 * depth}px, ${c.y * 12 * depth}px, 0)`;
      });
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const faceKeys = Object.keys(faces) as Gaze[];

  return (
    <div className="hero-float" ref={wrapRef}>
      {faceKeys.map((key, index) => (
        <img
          key={key}
          ref={(node) => {
            girlRefs.current[index] = node;
          }}
          className={`hero-layer hero-layer-girl${key === "center" ? " is-on" : ""}`}
          src={key === "center" || facesReady ? faces[key] : undefined}
          alt={key === "center" ? "Portrait of Shristi Suman" : ""}
          fetchPriority={key === "center" ? "high" : "low"}
          decoding="async"
          draggable={false}
        />
      ))}
      {layers.map((layer, index) => (
        <img
          key={layer.id}
          ref={(node) => {
            layerRefs.current[index] = node;
          }}
          className={`hero-layer hero-layer-${layer.id}`}
          src={layer.src}
          alt={layer.alt}
          decoding="async"
          draggable={false}
        />
      ))}
    </div>
  );
}
