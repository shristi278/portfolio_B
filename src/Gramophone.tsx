import { useEffect, useRef, useState, type CSSProperties } from "react";

const NOTES = ["♪", "♫", "♩", "♬", "♪", "♫"] as const;

export function Gramophone() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rootRef = useRef<HTMLButtonElement>(null);
  const wantsPlayRef = useRef(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const tryPlay = () => {
      if (!wantsPlayRef.current) return Promise.resolve();
      audio.muted = false;
      return audio.play();
    };

    const removeUnlock = () => {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
      window.removeEventListener("touchstart", unlock, true);
    };

    const unlock = (event: Event) => {
      if (!wantsPlayRef.current || !audio.paused) {
        removeUnlock();
        return;
      }
      // Gramophone has its own click handler.
      if (rootRef.current?.contains(event.target as Node)) return;

      void tryPlay()
        .then(() => {
          if (!audio.paused) removeUnlock();
        })
        .catch(() => {
          /* Keep waiting for another gesture. */
        });
    };

    void tryPlay().catch(() => {
      window.addEventListener("pointerdown", unlock, true);
      window.addEventListener("keydown", unlock, true);
      window.addEventListener("touchstart", unlock, true);
    });

    return () => {
      removeUnlock();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const onToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      wantsPlayRef.current = true;
      void audio.play().catch(() => setPlaying(false));
      return;
    }
    wantsPlayRef.current = false;
    audio.pause();
  };

  return (
    <button
      ref={rootRef}
      type="button"
      className={playing ? "gramophone is-playing" : "gramophone"}
      aria-pressed={playing}
      aria-label={playing ? "Pause the record" : "Play the record"}
      title={playing ? "Pause" : "Play"}
      onClick={onToggle}
    >
      <span className="gramophone-stage">
        <img
          className="gramophone-disc"
          src="/player/disc.png"
          alt=""
          width={512}
          height={512}
          draggable={false}
        />
        <img
          className="gramophone-arm gramophone-arm-pause"
          src="/player/arm-pause.png"
          alt=""
          width={512}
          height={512}
          draggable={false}
        />
        <img
          className="gramophone-arm gramophone-arm-play"
          src="/player/arm-play.png"
          alt=""
          width={512}
          height={512}
          draggable={false}
        />
      </span>
      <span className="gramophone-notes" aria-hidden="true">
        {NOTES.map((note, index) => (
          <span key={index} className="gramophone-note" style={{ "--i": index } as CSSProperties}>
            {note}
          </span>
        ))}
      </span>
      <audio ref={audioRef} src="/player/sunflower.mp3" loop preload="auto" autoPlay />
    </button>
  );
}
