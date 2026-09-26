import { useEffect, useRef, useState, type CSSProperties } from "react";

type StickerDef = {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  rot: number;
  w: number;
};

const DECK: StickerDef[] = [
  {
    id: "soti",
    src: "/about/stickers/soti.webp",
    alt: "SOTI senior product designer sticker",
    x: 12,
    y: 18,
    rot: -10,
    w: 214,
  },
  {
    id: "good-vibes",
    src: "/about/stickers/good-vibes.webp",
    alt: "Good vibes sticker",
    x: 24,
    y: 26,
    rot: 12,
    w: 156,
  },
  {
    id: "ai-native",
    src: "/about/stickers/ai-native.webp",
    alt: "AI native designer sticker",
    x: 14,
    y: 48,
    rot: -8,
    w: 310,
  },
  {
    id: "five-years",
    src: "/about/stickers/five-years.webp",
    alt: "Designing 5 years experience sticker",
    x: 12,
    y: 80,
    rot: -14,
    w: 148,
  },
  {
    id: "music",
    src: "/about/stickers/music.webp",
    alt: "Music sticker",
    x: 82,
    y: 16,
    rot: 8,
    w: 148,
  },
  {
    id: "product-designer",
    src: "/about/stickers/product-designer.webp",
    alt: "Product designer 2022 sticker",
    x: 86,
    y: 34,
    rot: 6,
    w: 176,
  },
  {
    id: "user-researcher",
    src: "/about/stickers/user-researcher.webp",
    alt: "User researcher 2021 sticker",
    x: 78,
    y: 54,
    rot: 4,
    w: 176,
  },
  {
    id: "cassette",
    src: "/about/stickers/cassette.webp",
    alt: "Holographic cassette sticker",
    x: 86,
    y: 80,
    rot: 10,
    w: 152,
  },
];

type Piece = StickerDef & { z: number };

export function AboutStickers() {
  const layerRef = useRef<HTMLDivElement>(null);
  const heldRef = useRef<string | null>(null);
  const peelTimer = useRef(0);
  const skipClick = useRef(false);
  const topZ = useRef(DECK.length);
  const [pieces, setPieces] = useState<Piece[]>(() =>
    DECK.map((sticker, index) => ({ ...sticker, z: index + 1 })),
  );
  const [heldId, setHeldId] = useState<string | null>(null);
  const [peelingId, setPeelingId] = useState<string | null>(null);
  const deckKey = DECK.map(
    (item) => `${item.id}:${item.x}:${item.y}:${item.rot}:${item.w}`,
  ).join("|");

  heldRef.current = heldId;

  useEffect(() => {
    setPieces(DECK.map((sticker, index) => ({ ...sticker, z: index + 1 })));
    setHeldId(null);
    setPeelingId(null);
  }, [deckKey]);

  const coords = (event: { clientX: number; clientY: number }) => {
    const layer = layerRef.current;
    if (!layer) return { x: 50, y: 50 };
    const box = layer.getBoundingClientRect();
    return {
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    };
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(peelTimer.current);
      document.documentElement.classList.remove("has-held-sticker");
    };
  }, []);

  useEffect(() => {
    if (!heldId) return;
    document.documentElement.classList.add("has-held-sticker");

    const move = (event: PointerEvent) => {
      const layer = layerRef.current;
      if (!layer) return;
      const box = layer.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width) * 100;
      const y = ((event.clientY - box.top) / box.height) * 100;
      setPieces((current) =>
        current.map((piece) =>
          piece.id === heldId
            ? {
                ...piece,
                x: Math.max(4, Math.min(96, x)),
                y: Math.max(6, Math.min(94, y)),
              }
            : piece,
        ),
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-held-sticker");
    };
  }, [heldId]);

  const placeHeld = (x: number, y: number) => {
    const id = heldRef.current;
    if (!id) return;
    topZ.current += 1;
    setPieces((current) =>
      current.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              x: Math.max(4, Math.min(96, x)),
              y: Math.max(6, Math.min(94, y)),
              z: topZ.current,
            }
          : piece,
      ),
    );
    setHeldId(null);
  };

  const pickUp = (id: string, x: number, y: number) => {
    window.clearTimeout(peelTimer.current);
    if (heldRef.current && heldRef.current !== id) {
      placeHeld(x, y);
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lift = () => {
      setPeelingId(null);
      topZ.current += 1;
      setPieces((current) =>
        current.map((piece) =>
          piece.id === id ? { ...piece, x, y, z: topZ.current } : piece,
        ),
      );
      setHeldId(id);
    };
    if (reduced) {
      lift();
      return;
    }
    setPeelingId(id);
    peelTimer.current = window.setTimeout(lift, 280);
  };

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = (event.target as HTMLElement).closest("[data-sticker-id]");
      const { x, y } = coords(event);
      if (target) {
        const id = target.getAttribute("data-sticker-id");
        if (!id) return;
        event.preventDefault();
        skipClick.current = true;
        if (heldRef.current === id) {
          placeHeld(x, y);
          return;
        }
        pickUp(id, x, y);
        return;
      }
      if (heldRef.current) {
        event.preventDefault();
        skipClick.current = true;
        placeHeld(x, y);
      }
    };

    layer.addEventListener("pointerdown", onPointerDown);
    return () => {
      layer.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div
      className={`about-stickers${heldId ? " is-carrying" : ""}`}
      ref={layerRef}
    >
      {pieces.map((piece, index) => {
        const def = DECK.find((item) => item.id === piece.id);
        if (!def) return null;
        const carrying = heldId === piece.id;
        const peeling = peelingId === piece.id;
        return (
          <button
            key={piece.id}
            type="button"
            data-sticker-id={piece.id}
            className={`about-sticker${carrying ? " is-held" : ""}${peeling ? " is-peeling" : ""}`}
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              width: `min(${def.w}px, 44vw)`,
              zIndex: carrying || peeling ? 80 : piece.z,
              "--sticker-rot": `${piece.rot}deg`,
              "--shine-delay": `${index * 0.45}s`,
            } as CSSProperties}
            aria-label={
              carrying
                ? `${def.alt}. Tap the board to stick it.`
                : `Pick up ${def.alt}`
            }
          >
            <span className="about-sticker-face">
              <img
                src={def.src}
                alt=""
                draggable={false}
                decoding="async"
              />
              <span
                className="about-sticker-shine"
                style={{
                  WebkitMaskImage: `url(${def.src})`,
                  maskImage: `url(${def.src})`,
                }}
                aria-hidden="true"
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
