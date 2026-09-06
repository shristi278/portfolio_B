import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  applyTheme,
  DEFAULT_THEME,
  readStoredTheme,
  THEMES,
  type ThemeId,
} from "./themes";

export function ColorPicker() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_FROM_DOM);

  useEffect(() => {
    const current = readStoredTheme();
    setTheme(current);
    applyTheme(current);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const timer = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointer);
    }, 0);
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id: ThemeId) => {
    setTheme(id);
    applyTheme(id);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={open ? "color-picker is-open" : "color-picker"}
    >
      <button
        type="button"
        className="color-picker__toggle"
        aria-label="Change color theme"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="9" cy="10" r="1.4" fill="currentColor" />
          <circle cx="13.5" cy="8.5" r="1.4" fill="currentColor" />
          <circle cx="15" cy="12.5" r="1.4" fill="currentColor" />
          <circle cx="11" cy="15" r="1.4" fill="currentColor" />
        </svg>
      </button>
      {THEMES.filter((item) => item.id !== theme).map((item, index) => (
        <label
          key={item.id}
          className="color-picker__swatch"
          style={{ "--idx": index } as CSSProperties}
        >
          <input
            type="radio"
            name="site-theme"
            value={item.id}
            onChange={() => choose(item.id)}
            aria-label={item.label}
            style={{
              background: item.primary,
              boxShadow: `inset 0 0 0 2px ${item.secondary}`,
            }}
          />
        </label>
      ))}
    </div>
  );
}

function DEFAULT_FROM_DOM(): ThemeId {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr && THEMES.some((theme) => theme.id === attr)
    ? (attr as ThemeId)
    : DEFAULT_THEME;
}
