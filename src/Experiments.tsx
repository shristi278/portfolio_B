import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { essays } from "./data";
import { go } from "./nav";

type Place = CSSProperties & {
  "--x": string;
  "--y": string;
  "--r": string;
  "--w": string;
  "--z": string;
};

type Spot = { x: number; y: number };

const STORAGE_KEY = "field-notes-board-v2";

const polaroids = [
  {
    id: "earbuds",
    src: "/writing/notes/earbuds.webp",
    alt: "Wired earphones resting on a laptop keyboard.",
    caption: "desk, 11pm",
    style: {
      "--x": "1%",
      "--y": "24%",
      "--r": "-8deg",
      "--w": "17%",
      "--z": "5",
    } satisfies Place,
  },
  {
    id: "daisies",
    src: "/writing/notes/daisies.webp",
    alt: "A small painting of yellow daisies under a blue sky.",
    caption: "daisies",
    style: {
      "--x": "32%",
      "--y": "3%",
      "--r": "6deg",
      "--w": "16%",
      "--z": "3",
    } satisfies Place,
  },
  {
    id: "flower",
    src: "/writing/notes/flower.webp",
    alt: "A painted red flower on an orange background.",
    caption: "studio flower",
    style: {
      "--x": "18.5%",
      "--y": "26%",
      "--r": "-3deg",
      "--w": "13.5%",
      "--z": "5",
    } satisfies Place,
  },
  {
    id: "lilies",
    src: "/writing/notes/lilies.webp",
    alt: "Close-up of yellow lilies in a glass vase.",
    caption: "kitchen lilies",
    style: {
      "--x": "71%",
      "--y": "44%",
      "--r": "6deg",
      "--w": "17%",
      "--z": "5",
    } satisfies Place,
  },
  {
    id: "plant",
    src: "/writing/notes/plant.webp",
    alt: "Long striped plant leaves against a white wall.",
    caption: "the plant that survived",
    style: {
      "--x": "80%",
      "--y": "5%",
      "--r": "5deg",
      "--w": "16%",
      "--z": "4",
    } satisfies Place,
  },
];

const drafts = [
  {
    id: "draft-1",
    text: "writing in process.",
    style: {
      "--x": "53%",
      "--y": "31%",
      "--r": "-6deg",
      "--w": "12%",
      "--z": "5",
    } satisfies Place,
    tone: "rose",
    fastener: "clip" as const,
  },
];

const badges = [
  {
    id: "book-indian",
    src: "/writing/notes/book-indian.webp",
    alt: "Book cover: One Indian Girl by Chetan Bhagat.",
    style: {
      "--x": "1.5%",
      "--y": "71%",
      "--r": "-10deg",
      "--w": "8.2%",
      "--z": "6",
    } satisfies Place,
  },
  {
    id: "book-creative",
    src: "/writing/notes/book-creative.webp",
    alt: "Book cover: Creative Confidence by Tom Kelley and David Kelley.",
    style: {
      "--x": "10%",
      "--y": "71%",
      "--r": "3deg",
      "--w": "8.2%",
      "--z": "7",
    } satisfies Place,
  },
  {
    id: "book-think",
    src: "/writing/notes/book-think.webp",
    alt: "Book cover: Don’t Make Me Think Revisited by Steve Krug.",
    style: {
      "--x": "17.2%",
      "--y": "71%",
      "--r": "-6deg",
      "--w": "8.2%",
      "--z": "6",
    } satisfies Place,
  },
];

const quoteNote = {
  id: "quote",
  src: "/writing/notes/quote-battuta.png",
  alt: "Typed quote: Traveling. It leaves you speechless, then turns you into a storyteller. Ibn Battuta.",
  style: {
    "--x": "36%",
    "--y": "40%",
    "--r": "-3deg",
    "--w": "21%",
    "--z": "5",
  } satisfies Place,
};

const livePlaces: Place[] = [
  {
    "--x": "3%",
    "--y": "5%",
    "--r": "-5deg",
    "--w": "26%",
    "--z": "4",
  },
  {
    "--x": "50%",
    "--y": "5%",
    "--r": "4deg",
    "--w": "26%",
    "--z": "4",
  },
];

function pct(value: string) {
  return Number.parseFloat(value);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function defaultSpots(): Record<string, Spot> {
  const spots: Record<string, Spot> = {
    [quoteNote.id]: { x: pct(quoteNote.style["--x"]), y: pct(quoteNote.style["--y"]) },
  };
  badges.forEach((item) => {
    spots[item.id] = { x: pct(item.style["--x"]), y: pct(item.style["--y"]) };
  });
  polaroids.forEach((item) => {
    spots[item.id] = { x: pct(item.style["--x"]), y: pct(item.style["--y"]) };
  });
  drafts.forEach((item) => {
    spots[item.id] = { x: pct(item.style["--x"]), y: pct(item.style["--y"]) };
  });
  essays.forEach((item, index) => {
    spots[item.slug] = {
      x: pct(livePlaces[index]["--x"]),
      y: pct(livePlaces[index]["--y"]),
    };
  });
  return spots;
}

function placed(base: Place, spot: Spot | undefined, dragging: boolean): Place {
  return {
    ...base,
    ...(spot ? { "--x": `${spot.x}%`, "--y": `${spot.y}%` } : {}),
    ...(dragging ? { "--z": "24" } : {}),
  };
}

function Fastener({ kind }: { kind: "pin" | "clip" }) {
  return <span className={`notes-${kind}`} aria-hidden="true" />;
}

const DRAG_GAP = 10;

export function Experiments() {
  const boardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    id: string;
    pointer: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    moved: boolean;
    el: HTMLElement;
  } | null>(null);
  const skipClick = useRef(new Set<string>());
  const stopListen = useRef<(() => void) | null>(null);
  const [spots, setSpots] = useState(defaultSpots);
  const spotsRef = useRef(spots);
  const [dragging, setDragging] = useState<string | null>(null);
  spotsRef.current = spots;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Record<string, Spot>;
      setSpots((prev) => ({ ...prev, ...saved }));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: Record<string, Spot>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const item = (event.target as HTMLElement | null)?.closest(".notes-item");
      if (!(item instanceof HTMLElement) || !board.contains(item)) return;
      if (getComputedStyle(item).position !== "absolute") return;
      const id = item.dataset.noteId;
      if (!id) return;

      stopListen.current?.();
      const rect = item.getBoundingClientRect();
      const pointer = event.pointerId;
      dragRef.current = {
        id,
        pointer,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
        el: item,
      };

      const onMove = (move: PointerEvent) => {
        const drag = dragRef.current;
        if (!drag || drag.pointer !== move.pointerId) return;
        const dist = Math.hypot(move.clientX - drag.startX, move.clientY - drag.startY);
        if (!drag.moved && dist < DRAG_GAP) return;
        move.preventDefault();
        drag.moved = true;
        setDragging(drag.id);
        const boardRect = board.getBoundingClientRect();
        const maxX = ((boardRect.width - drag.el.offsetWidth) / boardRect.width) * 100;
        const maxY = ((boardRect.height - drag.el.offsetHeight) / boardRect.height) * 100;
        const x = ((move.clientX - boardRect.left - drag.offsetX) / boardRect.width) * 100;
        const y = ((move.clientY - boardRect.top - drag.offsetY) / boardRect.height) * 100;
        const pad = 0.6;
        const nextSpot = {
          x: clamp(x, pad, Math.max(pad, maxX - pad)),
          y: clamp(y, pad, Math.max(pad, maxY - pad)),
        };
        setSpots((prev) => {
          const next = { ...prev, [drag.id]: nextSpot };
          spotsRef.current = next;
          return next;
        });
      };

      const onUp = (up: PointerEvent) => {
        if (up.pointerId !== pointer) return;
        const drag = dragRef.current;
        const moved = Boolean(drag?.moved);
        stopListen.current?.();
        stopListen.current = null;
        dragRef.current = null;
        setDragging(null);
        if (moved) {
          persist(spotsRef.current);
          skipClick.current.add(id);
          const blockClick = (click: Event) => {
            click.preventDefault();
            click.stopPropagation();
            skipClick.current.delete(id);
          };
          window.addEventListener("click", blockClick, true);
          window.setTimeout(() => {
            window.removeEventListener("click", blockClick, true);
            skipClick.current.delete(id);
          }, 0);
        }
      };

      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      stopListen.current = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
    };

    board.addEventListener("pointerdown", onPointerDown);
    return () => {
      board.removeEventListener("pointerdown", onPointerDown);
      stopListen.current?.();
    };
  }, [persist]);

  return (
    <section className="experiments" id="experiments" aria-labelledby="experiments-title">
      <div className="section-head">
        <h2 id="experiments-title">Field notes</h2>
        <p>Ideas, experiments and observations from a designer figuring things out.</p>
      </div>

      <div className="notes-board" ref={boardRef}>
        {essays.map((item, index) => (
          <div
            key={item.slug}
            className={`notes-item notes-live notes-live-${index + 1}${
              dragging === item.slug ? " is-dragging" : ""
            }`}
            data-note-id={item.slug}
            style={placed(livePlaces[index], spots[item.slug], dragging === item.slug)}
          >
            <Fastener kind={index === 0 ? "clip" : "pin"} />
            <span className="notes-num" aria-hidden="true">
              {index + 1}
            </span>
            <a
              className="notes-link"
              href={item.slug}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              onClick={(event) => {
                event.preventDefault();
                if (skipClick.current.has(item.slug)) {
                  skipClick.current.delete(item.slug);
                  return;
                }
                go(item.slug);
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.meta}</p>
              <span className="notes-tap" aria-hidden="true">
                tap to read
              </span>
            </a>
          </div>
        ))}

        {drafts.map((draft) => (
          <div
            key={draft.id}
            className={`notes-item notes-draft notes-draft-${draft.tone} notes-draft-sm${
              dragging === draft.id ? " is-dragging" : ""
            }`}
            data-note-id={draft.id}
            style={placed(draft.style, spots[draft.id], dragging === draft.id)}
          >
            <Fastener kind={draft.fastener} />
            <p>{draft.text}</p>
          </div>
        ))}

        <div
          className={`notes-item notes-quote${dragging === quoteNote.id ? " is-dragging" : ""}`}
          data-note-id={quoteNote.id}
          style={placed(quoteNote.style, spots[quoteNote.id], dragging === quoteNote.id)}
        >
          <Fastener kind="pin" />
          <img src={quoteNote.src} alt={quoteNote.alt} draggable={false} loading="lazy" decoding="async" />
        </div>

        {polaroids.map((shot) => (
          <figure
            key={shot.id}
            className={`notes-item notes-polaroid${dragging === shot.id ? " is-dragging" : ""}`}
            data-note-id={shot.id}
            style={placed(shot.style, spots[shot.id], dragging === shot.id)}
          >
            <Fastener kind="pin" />
            <img src={shot.src} alt={shot.alt} draggable={false} loading="lazy" decoding="async" />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}

        <div className="notes-books">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`notes-item notes-badge-item${dragging === badge.id ? " is-dragging" : ""}`}
              data-note-id={badge.id}
              style={placed(badge.style, spots[badge.id], dragging === badge.id)}
            >
              <img
                className="notes-badge"
                src={badge.src}
                alt={badge.alt}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
