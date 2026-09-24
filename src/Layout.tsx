import { useEffect, useId, useState, type ReactNode } from "react";
import { ColorPicker } from "./ColorPicker";
import { CtaLink } from "./CtaLink";
import { FooterBalloons } from "./FooterBalloons";
import { ThemeCursor } from "./ThemeCursor";
import { resumeUrl, socials } from "./data";
import { go } from "./nav";

type Props = {
  children: ReactNode;
  scrolled?: boolean;
};

export function Layout({ children, scrolled = true }: Props) {
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
            className="pill"
            href="/#work"
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              go("/#work");
            }}
          >
            Work
          </a>
          <a
            className="pill"
            href="/#about"
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              go("/#about");
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
          <CtaLink
            className="cta"
            href="mailto:shristi278@gmail.com"
            onClick={closeMenu}
          >
            Let’s talk
            <span aria-hidden="true">→</span>
          </CtaLink>
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
                  width={56}
                  height={56}
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
                  width={56}
                  height={56}
                  decoding="async"
                />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img
                  src="/footer/social-instagram.webp"
                  alt=""
                  width={56}
                  height={56}
                  decoding="async"
                />
              </a>
            </div>
          </div>
          <div className="foot-bar">
            <a
              className="mark"
              href="/"
              onClick={(event) => {
                event.preventDefault();
                go("/");
              }}
            >
              Shristi Suman
            </a>
            <p>Made in India · © {new Date().getFullYear()} shristi_suman</p>
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
                href="/#about"
                onClick={(event) => {
                  event.preventDefault();
                  go("/#about");
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
      <ColorPicker />
      <ThemeCursor />
    </>
  );
}
