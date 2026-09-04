import { FloatingHero } from "./FloatingHero";
import { glances, projects, quotes, resumeUrl, skills } from "./data";

export default function App() {
  return (
    <>
      <header className="nav">
        <a className="mark" href="#top">
          Shristi Suman
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a className="pill" href="#work">
            Work
          </a>
          <a className="pill" href="#about">
            About
          </a>
          <a className="pill" href={resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a className="cta" href="mailto:shristi278@gmail.com">
            Let’s talk
            <span aria-hidden="true">→</span>
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="blobs" aria-hidden="true">
            <span className="blob blob-a" />
            <span className="blob blob-b" />
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Senior product designer · Bangalore</p>
              <h1>
                From Chaos
                <br />
                to Clarity
              </h1>
              <p className="lede">
                Driven by curiosity <span className="dot">|</span> Grounded by
                process <span className="dot">|</span> Guided by users
              </p>
              <a className="cta cta-lg" href="#work">
                See the work
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <FloatingHero />
          </div>
          <p className="aside">8°–37° N, 68°–97° E</p>
          <svg
            className="wave"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,24 C240,80 480,0 720,32 C960,64 1200,8 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </section>

        <section className="meta" id="about">
          <div>
            <span>Location</span>
            <strong>Bangalore, India</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>Senior product designer</strong>
          </div>
          <div>
            <span>Currently at</span>
            <strong>SOTI Inc.</strong>
          </div>
          <div>
            <span>Previously</span>
            <strong>Unthinkable, Betterplace</strong>
          </div>
        </section>

        <section className="work" id="work">
          <div className="section-head">
            <h2>Featured work</h2>
            <p className="hand">Stories worth shipping</p>
            <p className="section-copy">
              Selected product work — enterprise systems, Android, and the
              messy middle between chaos and a shippable experience.
            </p>
          </div>
          <div className="cards">
            {projects.map((project) => (
              <article
                key={project.id}
                className="card"
                style={{ background: project.colors.bg }}
              >
                <div
                  className="card-inset"
                  style={{ background: project.colors.inset }}
                >
                  <span>{project.id}</span>
                </div>
                <p className="metric">{project.metric}</p>
                <h3>{project.title}</h3>
                <p>{project.blurb}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href={project.href} target="_blank" rel="noreferrer">
                  {project.locked ? "🔒 Password protected · View" : "View case study"}
                </a>
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

        <section className="glance">
          <h2>/ Glance</h2>
          <ul>
            {glances.map((item) => (
              <li key={item.year}>
                <h3>{item.year}</h3>
                <p>{item.text}</p>
                <p className="result">{item.result}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="words">
          <div className="section-head">
            <h2>Kind words</h2>
            <p className="hand">From people I’ve built with</p>
          </div>
          <div className="quotes">
            {quotes.map((item, index) => (
              <blockquote
                key={item.name}
                style={{ background: quoteBg(index) }}
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
          <a className="cta cta-lg" href="mailto:shristi278@gmail.com">
            shristi278@gmail.com
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>

      <footer className="foot">
        <a className="mark" href="#top">
          Shristi Suman
        </a>
        <p>Made in India · © {new Date().getFullYear()} shristi_suman</p>
        <div className="foot-links">
          <a href="#work">Works</a>
          <a href="#about">About</a>
          <a href={resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </footer>
    </>
  );
}

function quoteBg(index: number) {
  const colors = [
    "var(--pink)",
    "var(--yellow)",
    "var(--green)",
    "var(--sky)",
  ];
  return colors[index % colors.length];
}
