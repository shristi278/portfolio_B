import { useEffect, useId, useState, type ReactNode } from "react";
import { Gramophone } from "./Gramophone";
// Theme picker kept in ColorPicker.tsx + themes.ts; hidden for now (blue-only).
import { FooterBalloons } from "./FooterBalloons";
import { ThemeCursor } from "./ThemeCursor";
import { resumeUrl, socials, wallOfPortfoliosUrl } from "./data";
import { go, usePath } from "./nav";

type Props = {
  children: ReactNode;
  scrolled?: boolean;
};

export function Layout({ children, scrolled = true }: Props) {
  const path = usePath();
  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("has-nav-open");

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("has-nav-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 981px)");
    const closeOnDesktop = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const onAbout = path === "/about";
  const [onWork, setOnWork] = useState(false);

  useEffect(() => {
    if (path !== "/") {
      setOnWork(false);
      return;
    }

    const section = document.getElementById("work");
    if (!section) {
      setOnWork(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnWork(entry.isIntersecting);
      },
      {
        threshold: [0, 0.08, 0.2],
        rootMargin: "-88px 0px -48% 0px",
      },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [path]);

  return (
    <>
      <header
        className={`${scrolled ? "nav scrolled" : "nav"}${menuOpen ? " is-open" : ""}`}
      >
        <a
          className="mark"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            closeMenu();
            go("/");
          }}
        >
          Shristi Suman
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={navId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bars" aria-hidden="true">
            <span />
          </span>
        </button>
        {menuOpen ? (
          <button
            type="button"
            className="nav-backdrop"
            aria-label="Close menu"
            onClick={closeMenu}
          />
        ) : null}
        <nav id={navId} className="nav-links" aria-label="Primary">
          <a
            className={onWork ? "pill is-active" : "pill"}
            href="/#work"
            aria-current={onWork ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              go("/#work");
            }}
          >
            Work
          </a>
          <a
            className={onAbout ? "pill is-active" : "pill"}
            href="/about"
            aria-current={onAbout ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              go("/about");
            }}
          >
            About
          </a>
          <a
            className="pill"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Resume
          </a>
        </nav>
      </header>
      {children}
      <footer className="foot">
        <div className="foot-sticky">
          <FooterBalloons />
          <div className="foot-copy">
            <h2>
              <span className="foot-copy-line">That’s it. No more case studies.</span>
              <span className="foot-copy-line">I promise.</span>
            </h2>
            <p>
              If something here made you curious, confused you in a good way or
              made you want to talk about design, you know what to do.
            </p>
            <div className="foot-socials">
              <a href={socials.email} aria-label="Email Shristi">
                <img
                  src="/footer/social-gmail.webp"
                  alt=""
                  width={40}
                  height={40}
                  decoding="async"
                />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <img
                  src="/footer/social-linkedin.webp"
                  alt=""
                  width={40}
                  height={40}
                  decoding="async"
                />
              </a>
              <a
                href={socials.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X"
              >
                <img
                  src="/footer/social-x.webp"
                  alt=""
                  width={40}
                  height={40}
                  decoding="async"
                />
              </a>
              <a
                className="foot-wop"
                href={wallOfPortfoliosUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/footer/wop-featured.svg"
                  alt="Featured on Wall of Portfolios"
                  width={376}
                  height={176}
                  decoding="async"
                />
              </a>
            </div>
          </div>
          <div className="foot-bar">
            <p className="foot-made">
              Made with, <strong>Cursor</strong>, <strong>ChatGPT</strong>, lots of
              love and cup of tea.
            </p>
            <div className="foot-links">
              <a
                href="/#work"
                onClick={(event) => {
                  event.preventDefault();
                  go("/#work");
                }}
              >
                Works
              </a>
              <a
                href="/about"
                onClick={(event) => {
                  event.preventDefault();
                  go("/about");
                }}
              >
                About
              </a>
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                Resume
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Gramophone />
      <ThemeCursor />
    </>
  );
}
