import type { ReactNode } from "react";
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
  return (
    <>
      <header className={scrolled ? "nav scrolled" : "nav"}>
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
        <nav className="nav-links" aria-label="Primary">
          <a
            className="pill"
            href="/#work"
            onClick={(event) => {
              event.preventDefault();
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
              go("/#about");
            }}
          >
            About
          </a>
          <a className="pill" href={resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
          <CtaLink className="cta" href="mailto:shristi278@gmail.com">
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
            <h2>Let’s talk</h2>
            <p>
              Open to conversations about product, systems, and making messy
              problems feel obvious.
            </p>
            <CtaLink className="cta cta-lg" href={socials.email}>
              shristi278@gmail.com
              <span aria-hidden="true">→</span>
            </CtaLink>
            <div className="foot-socials">
              <a href={socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={socials.instagram} target="_blank" rel="noreferrer">
                Instagram
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
