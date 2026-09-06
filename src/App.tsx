import { useEffect, useRef, useState } from "react";
import { CardVideo } from "./CardVideo";
import { CtaLink } from "./CtaLink";
import { FloatingHero } from "./FloatingHero";
import { Layout } from "./Layout";
import { Material3Study } from "./Material3Study";
import { glances, projects, quotes, skills } from "./data";
import { usePath } from "./nav";

function GlanceBoard() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = [...section.querySelectorAll<HTMLElement>(".glance-item")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const mobile = window.matchMedia("(max-width: 980px)").matches;
      if (mobile || reduced.matches) {
        items.forEach((item) => item.style.setProperty("--glance-y", "0em"));
        return;
      }
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const end = -rect.height;
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (start - end || 1)),
      );
      items.forEach((item, index) => {
        const from = 6;
        const to = [0, -12, -24][index % 3];
        item.style.setProperty("--glance-y", `${from + (to - from) * progress}em`);
      });
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="glance" ref={sectionRef}>
      <h2>/ Glance</h2>
      <ul>
        {glances.map((item, index) => (
          <li key={item.year} className={`glance-item col-${(index % 3) + 1}`}>
            <article className={`glance-card tone-${index % 3}`}>
              <div className="glance-card-media">
                <img src={item.image} alt={item.imageAlt} />
              </div>
              <div className="glance-card-wrap">
                <div className="glance-card-shape" aria-hidden="true">
                  <svg viewBox="0 0 429 174" fill="none" preserveAspectRatio="none">
                    <path
                      d="M428.625 35.0943V136.589C428.625 152.326 428.625 167.249 428.625 173.088L0 173.082V77.9695C0 70.9826 5.03458 65.0132 11.904 63.8674L388.605 1.00885C409.565 -2.47661 428.625 13.7568 428.625 35.0862"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="glance-card-icon" aria-hidden="true">
                  <span className="glance-card-icon-track">
                    <GlanceArrow />
                    <GlanceArrow />
                  </span>
                </span>
                <div className="glance-card-content">
                  <h3>{item.result}</h3>
                  <p>{item.text}</p>
                  <span className="glance-card-tag">{item.year}</span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

function GlanceArrow() {
  return (
    <span className="glance-card-icon-face">
      <svg viewBox="0 0 28 27" aria-hidden="true">
        <path
          d="M14.9554 26.0653L12.2003 23.337L20.4522 15.0851H0.404297V11.0996H20.4522L12.2003 2.86109L14.9554 0.119385L27.9284 13.0923L14.9554 26.0653Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export default function App() {
  const path = usePath();
  const [scrolled, setScrolled] = useState(false);
  const [workHover, setWorkHover] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".hero");
      const offset = (hero instanceof HTMLElement ? hero.offsetHeight : 480) - 72;
      setScrolled(window.scrollY > offset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => {
    if (path !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [path]);

  const onCaseStudy = path === "/work/material-3";

  return (
    <Layout scrolled={onCaseStudy || scrolled}>
      {onCaseStudy ? <Material3Study /> : (
        <main id="top">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Senior product designer</p>
              <h1>
                <span className="line">From Chaos</span>
                <span className="line">
                  to <span className="accent">Clarity</span>
                </span>
              </h1>
              <p className="lede">
                Driven by curiosity <span className="dot">|</span> Grounded by
                process <span className="dot">|</span> Guided by users
              </p>
              <CtaLink
                className="cta cta-lg"
                href="#work"
                onMouseEnter={() => setWorkHover(true)}
                onMouseLeave={() => setWorkHover(false)}
              >
                See the work
                <span aria-hidden="true">→</span>
              </CtaLink>
            </div>
            <FloatingHero workHover={workHover} />
          </div>
          <div className="meta" id="about">
            <div>
              <span>Location</span>
              <strong>Bangalore, India</strong>
            </div>
            <div>
              <span>Experience</span>
              <strong>4.5+ years</strong>
            </div>
            <div>
              <span>Currently at</span>
              <strong>SOTI Inc.</strong>
            </div>
            <div>
              <span>Previously</span>
              <strong>Unthinkable, Betterplace</strong>
            </div>
          </div>
          <svg
            className="wave"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,24 C240,80 480,0 720,32 C960,64 1200,8 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </section>

        <section className="work" id="work">
          <div className="section-head">
            <h2>Featured work</h2>
          </div>
          <div className="cards">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`card card-${index + 1}${project.comingSoon ? " is-disabled" : ""}`}
                aria-disabled={project.comingSoon ? true : undefined}
              >
                <div
                  className={
                    project.image
                      ? "card-inset has-image"
                      : project.comingSoon
                        ? "card-inset has-icon"
                        : project.video
                          ? "card-inset has-video"
                          : "card-inset"
                  }
                >
                  {project.image ? (
                    <img src={project.image} alt={project.imageAlt ?? ""} />
                  ) : project.comingSoon ? (
                    <span className="recent-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 12a9 9 0 1 0 3-6.7"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 4.5V9h4.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 7.5V12l3.2 1.8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : project.video ? (
                    <CardVideo
                      src={project.video}
                      poster={project.image}
                      label={project.imageAlt ?? project.title}
                    />
                  ) : (
                    <span>{project.id}</span>
                  )}
                </div>
                <div className={project.comingSoon ? "card-copy is-centered" : "card-copy"}>
                  {project.comingSoon ? (
                    <p>{project.title}</p>
                  ) : (
                    <>
                      <p className="metric">{project.metric}</p>
                      <h3>{project.title}</h3>
                      <p>{project.blurb}</p>
                      <div className="tags">
                        {project.tags?.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <CtaLink
                        className="cta cta-card"
                        href={project.href}
                        {...(project.internal
                          ? {}
                          : { target: "_blank", rel: "noreferrer" })}
                      >
                        {project.locked ? "🔒 Password protected · View" : "View case study"}
                      </CtaLink>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...skills, ...skills].map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </section>

        <GlanceBoard />

        <section className="words">
          <div className="section-head">
            <h2>Kind words</h2>
            <p className="hand">From people I’ve built with</p>
          </div>
          <div className="quotes">
            {quotes.map((item, index) => (
              <blockquote
                key={item.name}
                className={`quote quote-${(index % 2) + 1}`}
              >
                <p>“{item.quote}”</p>
                <footer>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="talk">
          <h2>Let’s talk</h2>
          <p>
            Open to conversations about product, systems, and making messy
            problems feel obvious.
          </p>
          <CtaLink className="cta cta-lg" href="mailto:shristi278@gmail.com">
            shristi278@gmail.com
            <span aria-hidden="true">→</span>
          </CtaLink>
        </section>
      </main>
      )}
    </Layout>
  );
}
