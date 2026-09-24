import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const mobileQuery = "(max-width: 980px)";

const balloons = [
  { src: "/footer/s-bow.webp", tilt: "-7deg", restY: "6px" },
  { src: "/footer/h-foil.webp", tilt: "4deg", restY: "0px" },
  { src: "/footer/r-foil.webp", tilt: "5deg", restY: "12px" },
  { src: "/footer/i-blue.webp", tilt: "-4deg", restY: "4px" },
  { src: "/footer/s-orange.webp", tilt: "6deg", restY: "10px" },
  { src: "/footer/t-jelly.webp", tilt: "-5deg", restY: "2px" },
  { src: "/footer/i-pink.webp", tilt: "4deg", restY: "8px" },
] as const;

type Drift = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  vr: number;
  tx: number;
  ty: number;
  tr: number;
  hovering: boolean;
};

function makeDrift(): Drift {
  return {
    x: 0,
    y: 0,
    r: 0,
    vx: 0,
    vy: 0,
    vr: 0,
    tx: 0,
    ty: 0,
    tr: 0,
    hovering: false,
  };
}

export function FooterBalloons() {
  const [showBalloons, setShowBalloons] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia(mobileQuery).matches,
  );
  const skyRef = useRef<HTMLDivElement>(null);
  const drifts = useRef(new Map<HTMLElement, Drift>());

  useEffect(() => {
    const mq = window.matchMedia(mobileQuery);
    const apply = () => setShowBalloons(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!showBalloons) return;
    const sky = skyRef.current;
    const foot = sky?.closest(".foot");
    const sticky = sky?.closest(".foot-sticky");
    if (!sky || !foot || !sticky) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [...sky.querySelectorAll<HTMLElement>(".foot-balloon")];
    nodes.forEach((node) => {
      if (!drifts.current.has(node)) drifts.current.set(node, makeDrift());
    });

    const markSettled = () => {
      if (nodes.every((node) => node.classList.contains("is-docked"))) {
        foot.classList.add("is-settled");
      }
    };

    const reset = () => {
      foot.classList.remove("is-aloft", "is-settled");
      nodes.forEach((node) => {
        node.classList.remove("is-docked", "is-nudging");
        const drift = drifts.current.get(node);
        if (!drift) return;
        Object.assign(drift, makeDrift());
        node.style.removeProperty("--hx");
        node.style.removeProperty("--hy");
        node.style.removeProperty("--hr");
      });
    };

    if (reduced.matches) {
      foot.classList.add("is-aloft");
      nodes.forEach((node) => node.classList.add("is-docked"));
      markSettled();
      return;
    }

    const onEnd = (event: AnimationEvent) => {
      if (event.animationName !== "balloon-rise") return;
      (event.currentTarget as HTMLElement).classList.add("is-docked");
      markSettled();
    };
    nodes.forEach((node) => node.addEventListener("animationend", onEnd));

    const check = () => {
      const box = foot.getBoundingClientRect();
      const inView = box.top < window.innerHeight && box.bottom > 0;
      if (inView) foot.classList.add("is-aloft");
      else reset();
    };

    let frame = 0;
    const tick = () => {
      const settled = foot.classList.contains("is-settled");
      drifts.current.forEach((drift, node) => {
        if (!settled) {
          drift.hovering = false;
          drift.tx = 0;
          drift.ty = 0;
          drift.tr = 0;
          return;
        }
        const stiffness = drift.hovering ? 0.045 : 0.1;
        const drag = drift.hovering ? 0.9 : 0.82;
        drift.vx += (drift.tx - drift.x) * stiffness;
        drift.vy += (drift.ty - drift.y) * stiffness;
        drift.vr += (drift.tr - drift.r) * stiffness;
        drift.vx *= drag;
        drift.vy *= drag;
        drift.vr *= drag;
        drift.x += drift.vx;
        drift.y += drift.vy;
        drift.r += drift.vr;

        const still =
          !drift.hovering &&
          Math.abs(drift.x) + Math.abs(drift.y) + Math.abs(drift.r) < 0.2 &&
          Math.abs(drift.vx) + Math.abs(drift.vy) + Math.abs(drift.vr) < 0.05;

        if (still) {
          drift.x = 0;
          drift.y = 0;
          drift.r = 0;
          drift.vx = 0;
          drift.vy = 0;
          drift.vr = 0;
          node.style.setProperty("--hx", "0px");
          node.style.setProperty("--hy", "0px");
          node.style.setProperty("--hr", "0deg");
          node.classList.remove("is-nudging");
          return;
        }

        node.classList.add("is-nudging");
        node.style.setProperty("--hx", `${drift.x.toFixed(2)}px`);
        node.style.setProperty("--hy", `${drift.y.toFixed(2)}px`);
        node.style.setProperty("--hr", `${drift.r.toFixed(2)}deg`);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      nodes.forEach((node) => node.removeEventListener("animationend", onEnd));
    };
  }, [showBalloons]);

  function ready() {
    return Boolean(skyRef.current?.closest(".foot")?.classList.contains("is-settled"));
  }

  function aim(event: PointerEvent<HTMLImageElement>) {
    if (!ready()) return;
    const el = event.currentTarget;
    const drift = drifts.current.get(el) ?? makeDrift();
    drifts.current.set(el, drift);
    const box = el.getBoundingClientRect();
    const nx =
      (event.clientX - (box.left + box.width / 2)) / Math.max(1, box.width);
    const ny =
      (event.clientY - (box.top + box.height / 2)) / Math.max(1, box.height);
    drift.tx = nx * 22;
    drift.ty = ny * 16 - 12;
    drift.tr = nx * 8;
  }

  function rest(event: PointerEvent<HTMLImageElement>) {
    const drift = drifts.current.get(event.currentTarget);
    if (!drift) return;
    drift.hovering = false;
    drift.tx = 0;
    drift.ty = 0;
    drift.tr = 0;
  }

  function restAll() {
    drifts.current.forEach((drift) => {
      drift.hovering = false;
      drift.tx = 0;
      drift.ty = 0;
      drift.tr = 0;
    });
  }

  if (!showBalloons) return null;

  return (
    <div
      className="foot-sky"
      ref={skyRef}
      aria-hidden="true"
      onPointerLeave={restAll}
    >
      {balloons.map((balloon) => (
        <img
          key={balloon.src}
          className="foot-balloon"
          src={balloon.src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          style={
            {
              "--tilt": balloon.tilt,
              "--rest-y": balloon.restY,
            } as CSSProperties
          }
          onPointerEnter={(event) => {
            if (!ready()) return;
            const drift = drifts.current.get(event.currentTarget) ?? makeDrift();
            drift.hovering = true;
            drifts.current.set(event.currentTarget, drift);
            aim(event);
          }}
          onPointerMove={aim}
          onPointerLeave={rest}
        />
      ))}
    </div>
  );
}
