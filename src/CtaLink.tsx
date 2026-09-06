import type { AnchorHTMLAttributes, PointerEvent } from "react";
import { playCtaPop } from "./ctaPop";
import { go, isInternalHref } from "./nav";

function press(el: HTMLAnchorElement) {
  el.classList.remove("is-popping");
  el.classList.add("is-pressed");
  try {
    playCtaPop();
  } catch {
    /* Autoplay or missing AudioContext should not block the press. */
  }
}

function release(el: HTMLAnchorElement) {
  el.classList.remove("is-pressed");
  el.classList.remove("is-popping");
  void el.offsetWidth;
  el.classList.add("is-popping");
}

export function CtaLink({
  href,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
  onAnimationEnd,
  onKeyDown,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const internal = isInternalHref(href) || href?.startsWith("#");
        if (!internal || !href) return;
        event.preventDefault();
        window.setTimeout(() => go(href), 240);
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || event.button !== 0) return;
        press(event.currentTarget);
      }}
      onMouseDown={(event) => {
        if (event.button !== 0) return;
        if (event.currentTarget.classList.contains("is-pressed")) return;
        press(event.currentTarget);
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        if (event.button !== 0) return;
        release(event.currentTarget);
      }}
      onMouseUp={(event) => {
        if (event.button !== 0) return;
        if (!event.currentTarget.classList.contains("is-pressed")) return;
        release(event.currentTarget);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        event.currentTarget.classList.remove("is-pressed");
      }}
      onPointerLeave={(event: PointerEvent<HTMLAnchorElement>) => {
        onPointerLeave?.(event);
        if (event.buttons) event.currentTarget.classList.remove("is-pressed");
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.key !== "Enter" || event.repeat) {
          return;
        }
        press(event.currentTarget);
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter") release(event.currentTarget);
      }}
      onAnimationEnd={(event) => {
        onAnimationEnd?.(event);
        if (event.animationName === "cta-pop") {
          event.currentTarget.classList.remove("is-popping");
        }
      }}
    />
  );
}
