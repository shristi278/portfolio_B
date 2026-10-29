import { useEffect, useRef } from "react";
import { AboutPicks } from "./AboutPicks";
import { AboutStickers } from "./AboutStickers";
import { aboutRibbon, aboutRibbonAlt } from "./data";

function AboutChecker() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const stage = bg?.closest(".about-stage");
    if (!bg || !stage) return;

    const layout = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (w < 2 || h < 2) return;

      const cols = 14;
      const square = w / cols;
      bg.style.backgroundSize = `${square}px ${square}px`;
      bg.style.inset = "0";
      bg.style.width = "100%";
      bg.style.height = "100%";
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return <div className="about-hero-bg" ref={bgRef} aria-hidden="true" />;
}

function AboutRibbons() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ribbons = [...section.querySelectorAll<HTMLElement>(".about-ribbon")];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ribbons.forEach((el) => el.classList.add("is-settled"));
      return;
    }

    let visible = false;
    const sync = () => {
      const box = section.getBoundingClientRect();
      const shown = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0);
      const ratio = Math.max(0, shown) / Math.max(1, box.height);
      if (!visible && ratio >= 0.28) {
        visible = true;
        ribbons.forEach((el) => el.classList.add("is-settled"));
      } else if (visible && ratio <= 0.06) {
        visible = false;
        ribbons.forEach((el) => el.classList.remove("is-settled"));
      }
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="about-ribbons" ref={sectionRef} aria-label="Announcement">
      <div className="about-ribbon is-a">
        <span>{aboutRibbon}</span>
      </div>
      <div className="about-ribbon is-b">
        <span>{aboutRibbonAlt}</span>
      </div>
    </section>
  );
}

function AboutBadge() {
  const swingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swing = swingRef.current;
    if (!swing) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      swing.style.transform = "none";
      return;
    }

    const rad = Math.PI / 180;
    let theta = -38 * rad;
    let omega = 3.1;
    let dropY = -160;
    let dropV = 0;
    let hoverRest = 0;
    let hovering = false;
    let dragging = false;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;

    const pivot = () => {
      const box = swing.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top };
    };

    const pointerAngle = (clientX: number, clientY: number) => {
      const { x, y } = pivot();
      return Math.atan2(clientX - x, Math.max(48, clientY - y));
    };

    const aimAt = (clientX: number, clientY: number, follow: number) => {
      const next = Math.max(-0.72, Math.min(0.72, pointerAngle(clientX, clientY) * follow));
      hoverRest = next;
      if (dragging) {
        omega = (next - theta) * 18;
        theta = next;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!hovering && !dragging) return;
      aimAt(event.clientX, event.clientY, dragging ? 1 : 0.62);
    };

    const onEnter = (event: PointerEvent) => {
      hovering = true;
      aimAt(event.clientX, event.clientY, 0.62);
    };

    const onLeave = () => {
      if (dragging) return;
      hovering = false;
      hoverRest = 0;
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target as Node;
      if (!swing.contains(target)) return;
      dragging = true;
      hovering = true;
      swing.classList.add("is-held");
      swing.setPointerCapture(event.pointerId);
      aimAt(event.clientX, event.clientY, 1);
    };

    const onUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      swing.classList.remove("is-held");
      if (swing.hasPointerCapture(event.pointerId)) swing.releasePointerCapture(event.pointerId);
      omega = Math.max(-6.5, Math.min(6.5, omega * 0.55));
      if (!swing.matches(":hover")) {
        hovering = false;
        hoverRest = 0;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      elapsed += dt;

      dropV += 4200 * dt;
      dropY += dropV * dt;
      if (dropY >= 0) {
        dropY = 0;
        dropV *= -0.22;
        if (Math.abs(dropV) < 90) dropV = 0;
      }

      if (!dragging) {
        const g = 13.2;
        const rest = hovering
          ? hoverRest
          : Math.sin(elapsed * 0.85) * 0.055 + Math.sin(elapsed * 0.31) * 0.028;
        omega += -g * Math.sin(theta - rest) * dt;
        omega *= Math.exp(-0.92 * dt);
        theta += omega * dt;
        theta = Math.max(-1.05, Math.min(1.05, theta));
      }

      const bob =
        dropY === 0
          ? Math.sin(elapsed * 1.15) * 7 + Math.sin(elapsed * 0.52) * 3.5
          : 0;
      const rz = theta / rad;
      swing.style.transform = `translate3d(0, ${(dropY + bob).toFixed(2)}px, 0) rotateZ(${rz.toFixed(2)}deg)`;
      frame = requestAnimationFrame(tick);
    };

    swing.addEventListener("pointerenter", onEnter);
    swing.addEventListener("pointermove", onMove, { passive: true });
    swing.addEventListener("pointerleave", onLeave);
    swing.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      swing.removeEventListener("pointerenter", onEnter);
      swing.removeEventListener("pointermove", onMove);
      swing.removeEventListener("pointerleave", onLeave);
      swing.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      swing.classList.remove("is-held");
      swing.style.transform = "";
    };
  }, []);

  return (
    <div className="about-badge">
      <div className="about-badge-swing" ref={swingRef}>
        <img
          src="/about/designer-card.webp"
          alt="Designer card for Shristi Suman"
          width={569}
          height={981}
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
}

export function About() {
  useEffect(() => {
    document.title = "About — Shristi Suman";
    return () => {
      document.title = "Shristi Suman - Senior Product Designer";
    };
  }, []);

  return (
    <main className="about" id="top">
      <div className="about-stage">
        <AboutChecker />
        <header className="about-hero">
          <AboutStickers />
          <AboutBadge />
        </header>
        <AboutRibbons />
        <AboutPicks />
      </div>
    </main>
  );
}
