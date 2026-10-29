import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { aboutPicks, aboutPicksCopy, type AboutPick } from "./data";
import { CtaIconButton } from "./GlanceDialog";

function PickCard({ item }: { item: AboutPick }) {
  const crop = {
    "--pick-focus": item.focus ?? "center 16%",
  } as CSSProperties;

  return (
    <article className="about-pick-card" aria-label={item.title}>
      <span className="about-pick-tape" aria-hidden="true" />
      <div className="about-pick-cover" style={crop}>
        {item.video ? (
          <video
            src={item.video}
            poster={item.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={item.imageAlt}
          />
        ) : (
          <img src={item.image} alt={item.imageAlt} width={800} height={800} />
        )}
      </div>
      <p className="about-pick-caption">{item.caption}</p>
    </article>
  );
}

export function AboutPicks() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const max = Math.max(0, aboutPicks.length - 1);

  const goTo = useCallback((next: number) => {
    const scroller = scrollerRef.current;
    const clamped = Math.max(0, Math.min(max, next));
    setIndex(clamped);
    const card = scroller?.querySelectorAll<HTMLElement>(".about-pick-card")[clamped];
    if (!scroller || !card) return;
    const left = card.offsetLeft - 40;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [max]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const cards = [...scroller.querySelectorAll<HTMLElement>(".about-pick-card")];
      let closest = 0;
      let dist = Infinity;
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - scroller.scrollLeft - 40);
        if (d < dist) {
          dist = d;
          closest = i;
        }
      });
      setIndex(closest);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="about-picks" aria-labelledby="about-picks-title">
      <header className="about-picks-head">
        <div className="about-picks-copy">
          <h2 id="about-picks-title">{aboutPicksCopy.title}</h2>
          {aboutPicksCopy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <div className="about-picks-scroller" ref={scrollerRef}>
        {aboutPicks.map((item) => (
          <PickCard key={item.caption + item.image} item={item} />
        ))}
      </div>

      <div className="about-picks-nav">
        <div className="about-picks-nav-btns">
          <CtaIconButton
            className="glance-dialog-step"
            label="Previous photo"
            disabled={index <= 0}
            onClick={() => goTo(index - 1)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M10.2 2.4 4.6 8l5.6 5.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CtaIconButton>
          <CtaIconButton
            className="glance-dialog-step"
            label="Next photo"
            disabled={index >= max}
            onClick={() => goTo(index + 1)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M5.8 2.4 11.4 8 5.8 13.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CtaIconButton>
        </div>
        <p className="about-picks-nav-hint">Scroll horizontally</p>
      </div>
    </section>
  );
}
