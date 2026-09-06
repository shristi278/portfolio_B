let audioCtx: AudioContext | null = null;

function context() {
  const AC =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  audioCtx ??= new AC();
  return audioCtx;
}

export function playCtaPop() {
  const ctx = context();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();

  const t = ctx.currentTime;
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = "sine";
  click.frequency.setValueAtTime(920, t);
  click.frequency.exponentialRampToValueAtTime(420, t + 0.04);
  clickGain.gain.setValueAtTime(0.09, t);
  clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  click.connect(clickGain).connect(ctx.destination);
  click.start(t);
  click.stop(t + 0.06);

  const thud = ctx.createOscillator();
  const thudGain = ctx.createGain();
  thud.type = "triangle";
  thud.frequency.setValueAtTime(220, t);
  thud.frequency.exponentialRampToValueAtTime(70, t + 0.11);
  thudGain.gain.setValueAtTime(0.16, t);
  thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
  thud.connect(thudGain).connect(ctx.destination);
  thud.start(t);
  thud.stop(t + 0.15);
}
