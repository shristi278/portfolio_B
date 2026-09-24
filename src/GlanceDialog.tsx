import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { playCtaPop } from "./ctaPop";
import type { Glance } from "./data";

export type GlanceOrigin = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
};

function richText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={partIndex}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

function formatDesc(text: string) {
  return text.split(/\n\n+/).map((para, index) => {
    const heading = para.match(/^###\s+(.+)$/);
    if (heading) {
      return (
        <p key={index} className="glance-dialog-subhead">
          {heading[1]}
        </p>
      );
    }
    return (
      <p key={index} className="glance-dialog-desc">
        {richText(para)}
      </p>
    );
  });
}

type Props = {
  items: Glance[];
  index: number;
  origin: GlanceOrigin;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const EASE = "cubic-bezier(0.22, 1, 0.32, 1)";
const OPEN_MS = 780;
const CLOSE_MS = 680;

function originBox(origin: GlanceOrigin): Box {
  return {
    left: origin.x,
    top: origin.y,
    width: origin.w,
    height: origin.h,
    radius: "50%",
  };
}

function finalBox(): Box {
  const width = Math.min(1180, window.innerWidth - 40);
  const height = Math.min(720, window.innerHeight - 40);
  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
    radius: "36px",
  };
}

function circleBox(): Box {
  const end = finalBox();
  const size = Math.min(end.width, end.height);
  return {
    left: (window.innerWidth - size) / 2,
    top: (window.innerHeight - size) / 2,
    width: size,
    height: size,
    radius: "50%",
  };
}

function applyBox(el: HTMLElement, box: Box) {
  el.style.position = "fixed";
  el.style.left = `${box.left}px`;
  el.style.top = `${box.top}px`;
  el.style.width = `${box.width}px`;
  el.style.height = `${box.height}px`;
  el.style.borderRadius = box.radius;
  el.style.margin = "0";
}

function frames(a: Box, b: Box, c: Box): Keyframe[] {
  const key = (box: Box, offset: number): Keyframe => ({
    offset,
    left: `${box.left}px`,
    top: `${box.top}px`,
    width: `${box.width}px`,
    height: `${box.height}px`,
    borderRadius: box.radius,
  });
  return [key(a, 0), key(b, 0.58), key(c, 1)];
}

function CtaIconButton({
  label,
  className,
  buttonRef,
  onClick,
  disabled,
  children,
}: {
  label: string;
  className: string;
  buttonRef?: RefObject<HTMLButtonElement | null>;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  function press(event: PointerEvent<HTMLButtonElement>) {
    if (disabled || event.button !== 0) return;
    const el = event.currentTarget;
    el.classList.remove("is-popping");
    el.classList.add("is-pressed");
    try {
      playCtaPop();
    } catch {
      /* ignore */
    }
  }

  function release(event: PointerEvent<HTMLButtonElement>) {
    if (disabled || event.button !== 0) return;
    const el = event.currentTarget;
    el.classList.remove("is-pressed");
    void el.offsetWidth;
    el.classList.add("is-popping");
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`cta ${className}`}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={(event) => event.currentTarget.classList.remove("is-pressed")}
      onAnimationEnd={(event) => {
        if (event.animationName === "cta-pop") {
          event.currentTarget.classList.remove("is-popping");
        }
      }}
    >
      {children}
    </button>
  );
}

export function GlanceDialog({
  items,
  index,
  origin,
  onClose,
  onIndexChange,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animRef = useRef<Animation | null>(null);
  const [ready, setReady] = useState(false);
  const [closing, setClosing] = useState(false);
  const originRef = useRef(origin);
  originRef.current = origin;

  const item = items[index];
  const count = items.length;
  const atFirst = index <= 0;
  const atLast = index >= count - 1;

  function goTo(next: number) {
    if (next < 0 || next >= count) return;
    onIndexChange(next);
  }

  function dismiss() {
    if (closing) return;
    const el = panelRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduced) {
      onClose();
      return;
    }
    setClosing(true);
    setReady(false);
    animRef.current?.cancel();
    const start = finalBox();
    applyBox(el, start);
    animRef.current = el.animate(frames(start, circleBox(), originBox(originRef.current)), {
      duration: CLOSE_MS,
      easing: EASE,
      fill: "forwards",
    });
    animRef.current.finished.then(onClose).catch(onClose);
  }

  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const end = finalBox();
    if (reduced) {
      applyBox(el, end);
      setReady(true);
      return;
    }
    const start = originBox(origin);
    applyBox(el, start);
    animRef.current = el.animate(frames(start, circleBox(), end), {
      duration: OPEN_MS,
      easing: EASE,
      fill: "forwards",
    });
    const show = window.setTimeout(() => setReady(true), OPEN_MS * 0.62);
    animRef.current.finished.then(() => applyBox(el, end)).catch(() => applyBox(el, end));
    return () => {
      window.clearTimeout(show);
      animRef.current?.cancel();
    };
    // Morph only when the dialog first mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
      if (event.key === "ArrowRight" && !atLast) goTo(index + 1);
      if (event.key === "ArrowLeft" && !atFirst) goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function onDialogKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
      "button:not([disabled])",
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div
      className={ready && !closing ? "glance-dialog-root is-open" : "glance-dialog-root"}
    >
      <button
        type="button"
        className="glance-dialog-backdrop"
        aria-label="Close dialog"
        onClick={dismiss}
      />
      <div
        ref={panelRef}
        className={ready && !closing ? "glance-dialog is-ready" : "glance-dialog"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="glance-dialog-title"
        onKeyDown={onDialogKey}
      >
        <CtaIconButton
          buttonRef={closeRef}
          className="glance-dialog-close"
          label="Close"
          onClick={dismiss}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M1.2 1.2 14.8 14.8M14.8 1.2 1.2 14.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </CtaIconButton>
        <div className="glance-dialog-body">
          <div
            className={[
              "glance-dialog-media",
              item.video ? "has-video" : "",
              item.contain ? "has-fit" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.video ? (
              <video
                key={item.video}
                src={item.video}
                poster={item.image}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                aria-label={item.imageAlt}
                style={
                  item.videoRadius
                    ? { borderRadius: `${item.videoRadius}px` }
                    : undefined
                }
                onLoadedMetadata={(event) => {
                  event.currentTarget.playbackRate = 1.5;
                }}
              />
            ) : (
              <img
                key={item.dialogImage ?? item.image}
                src={item.dialogImage ?? item.image}
                alt={item.imageAlt}
              />
            )}
          </div>
          <div className="glance-dialog-copy">
            <p className="glance-dialog-tag">{item.year}</p>
            <h2 id="glance-dialog-title">{item.result}</h2>
            {formatDesc(item.text)}
          </div>
        </div>
        <div className="glance-dialog-nav">
          <CtaIconButton
            className="glance-dialog-step"
            label="Previous"
            disabled={atFirst}
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
            label="Next"
            disabled={atLast}
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
      </div>
    </div>,
    document.body,
  );
}
