import type { ReactNode } from "react";
import { ColorPicker } from "./ColorPicker";
import { CtaLink } from "./CtaLink";
import { resumeUrl } from "./data";
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
      </footer>
      <ColorPicker />
    </>
  );
}
