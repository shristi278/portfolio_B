import { useEffect, useRef } from "react";

export function ThemeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const fine = window.matchMedia("(pointer: fine)");
    if (!cursor || !fine.matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;
    let visible = false;

    const typing = "input, textarea, select, [contenteditable='true']";

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        document.documentElement.classList.add("has-theme-cursor");
        cx = x;
        cy = y;
      }
      const target = event.target as HTMLElement | null;
      cursor.classList.toggle("is-cta", !!target?.closest(".cta"));
      cursor.classList.toggle("is-hidden", !!target?.closest(typing));
    };

    const tick = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      cursor.classList.remove("is-cta");
      cursor.classList.remove("is-hidden");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-theme-cursor");
    };
  }, []);

  return (
    <div className="theme-cursor" ref={cursorRef} aria-hidden="true">
      <img
        className="theme-cursor-pointer"
        src="/cursor/pointer.webp"
        alt=""
        width={44}
        height={45}
        draggable={false}
      />
      <img
        className="theme-cursor-dog"
        src="/cursor/balloon-dog.webp"
        alt=""
        draggable={false}
      />
    </div>
  );
}
