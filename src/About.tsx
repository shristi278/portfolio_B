import { useEffect, useRef } from "react";
import { AboutStickers } from "./AboutStickers";
import { CtaLink } from "./CtaLink";
import { resumeUrl } from "./data";

const facts = [
  { label: "Location", value: "Bangalore, India" },
  { label: "Experience", value: "4.5+ years" },
  { label: "Currently at", value: "SOTI Inc." },
  { label: "Previously", value: "Unthinkable, Betterplace" },
] as const;

const chapters = [
  {
    place: "SOTI Inc.",
    when: "Now · 3 years",
    note: "Product design on SOTI Snap and MobiControl. Systems, Android, and sitting close to engineering.",
  },
  {
    place: "Unthinkable",
    when: "Earlier",
    note: "End-to-end product work including Floom, a platform for new moms, and client experiences like ICAI.",
  },
  {
    place: "Betterplace",
    when: "Earlier",
    note: "Where I started shaping digital products in a product team.",
  },
] as const;

function AboutChecker() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const hero = bg?.parentElement;
    if (!bg || !hero) return;

    const layout = () => {
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      if (w < 2 || h < 2) return;

      const cols = 10;
      const squareW = w / cols;
      let rows = Math.round(h / squareW);
      if (rows < 2) rows = 2;
      if (rows % 2 === 1) rows += 1;

      const squareH = h / rows;
      bg.style.backgroundSize = `${squareW * 2}px ${squareH * 2}px`;
      bg.style.inset = "0";
      bg.style.width = "100%";
      bg.style.height = "100%";
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return <div className="about-hero-bg" ref={bgRef} aria-hidden="true" />;
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
      <header className="about-hero">
        <AboutChecker />
        <AboutStickers />
        <AboutBadge />
      </header>

      <div className="about-inner">
        <header className="about-intro">
          <h1>About</h1>
          <p>
            I’m Shristi, a product designer in Bangalore. Give me a messy
            problem, a blank canvas or something that feels like it could be
            better — I’ll start with why, then put the pieces back together.
          </p>
          <p>
            I’ve spent 4.5+ years on digital products, the last three at SOTI.
            Most of that work lives in B2B systems with multiple users,
            workflows and a lot of information to make sense of. The job is
            making something powerful without making it feel overwhelming.
          </p>
        </header>

        <dl className="about-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <section className="about-split">
          <h2>A little more context</h2>
          <div className="about-copy">
            <p>
              I design flows, interaction, information architecture, visuals,
              systems and prototypes — usually next to product and engineering.
              I’m happiest when design has a real seat at the table, not a seat
              at the end of the process.
            </p>
            <p>
              I’m curious, fairly detail-oriented, and I like exploring more
              than one direction before settling. If you’re looking for someone
              who can handle complexity, work collaboratively and still care
              about the tiny details, we should probably talk.
            </p>
          </div>
        </section>

        <section className="about-split">
          <h2>Where I’ve been</h2>
          <ol className="about-chapters">
            {chapters.map((chapter) => (
              <li key={chapter.place}>
                <p className="about-when">{chapter.when}</p>
                <h3>{chapter.place}</h3>
                <p>{chapter.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="about-cta">
          <CtaLink className="cta cta-lg" href="mailto:shristi278@gmail.com">
            Let’s talk
            <span aria-hidden="true">→</span>
          </CtaLink>
          <CtaLink className="cta cta-lg" href="/#work">
            See the work
          </CtaLink>
          <CtaLink
            className="cta cta-lg"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </CtaLink>
        </div>
      </div>
    </main>
  );
}
