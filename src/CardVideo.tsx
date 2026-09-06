import { useRef, useState, type MouseEvent } from "react";

const IDLE_SCALE = 1;
const HOVER_SCALE = 2.2;

type Props = {
  src: string;
  poster?: string;
  label: string;
};

export function CardVideo({ src, poster, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  function pointerIn(event: MouseEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setHovering(true);
    setOrigin({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
    void videoRef.current?.play();
  }

  return (
    <div
      className={hovering ? "card-video-frame is-zoomed" : "card-video-frame"}
      onMouseEnter={pointerIn}
      onMouseMove={pointerIn}
      onMouseLeave={() => {
        setHovering(false);
        setOrigin({ x: 50, y: 50 });
      }}
    >
      <video
        ref={videoRef}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
        style={{
          transform: `scale(${hovering ? HOVER_SCALE : IDLE_SCALE})`,
          transformOrigin: `${origin.x}% ${origin.y}%`,
        }}
      >
        <source src={src.replace(/\.mov$/i, ".mp4")} type="video/mp4" />
        <source src={src} type="video/quicktime" />
      </video>
    </div>
  );
}
