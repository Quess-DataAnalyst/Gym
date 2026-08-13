import { useEffect, useRef, useState } from "react";
import { Timer, Plus, Minus, Pause, Play, X } from "lucide-react";

const playBeep = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.001;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.stop(ctx.currentTime + 0.7);
    setTimeout(() => ctx.close(), 800);
  } catch {
    /* no audio, ignore */
  }
};

export default function RestTimer({ defaultSeconds = 60, onClose }) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [remaining, setRemaining] = useState(defaultSeconds);
  const [running, setRunning] = useState(true);
  const doneRef = useRef(false);

  useEffect(() => {
    setRemaining(seconds);
    doneRef.current = false;
  }, [seconds]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (!doneRef.current) {
            doneRef.current = true;
            playBeep();
            setTimeout(playBeep, 220);
            setTimeout(playBeep, 440);
          }
          clearInterval(id);
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const pct = (remaining / seconds) * 100;

  return (
    <div
      data-testid="rest-timer-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0F0F0F] border border-[#262626] rounded-2xl p-5 sm:p-6 relative max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          data-testid="rest-timer-close"
          onClick={onClose}
          className="absolute right-3 top-3 text-neutral-500 hover:text-white p-1"
          style={{ transition: "color 150ms ease" }}
        >
          <X size={18} />
        </button>
        <div className="flex items-center gap-2 text-[#FF4500] mb-2 sm:mb-3">
          <Timer size={16} />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold">Rest Timer</span>
        </div>
        <div className="font-display text-6xl sm:text-7xl leading-none text-white mb-4" data-testid="rest-timer-remaining">
          {String(Math.floor(remaining / 60)).padStart(1, "0")}:{String(remaining % 60).padStart(2, "0")}
        </div>
        <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden mb-5">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #FF4500, #DC2626)",
              transition: "width 900ms linear",
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            data-testid="rest-timer-decrease"
            onClick={() => setSeconds((s) => Math.max(15, s - 15))}
            className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-lg bg-[#171717] border border-[#262626] text-white text-sm active:scale-95"
            style={{ transition: "transform 120ms ease, background-color 150ms ease" }}
          >
            <Minus size={14} /> 15s
          </button>
          <button
            data-testid="rest-timer-toggle"
            onClick={() => {
              if (remaining === 0) {
                setRemaining(seconds);
                doneRef.current = false;
              }
              setRunning((r) => !r);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-lg text-white text-sm font-semibold"
            style={{ background: "linear-gradient(90deg, #FF4500, #DC2626)" }}
          >
            {running ? <Pause size={14} /> : <Play size={14} />}
            {running ? "Pause" : remaining === 0 ? "Restart" : "Resume"}
          </button>
          <button
            data-testid="rest-timer-increase"
            onClick={() => setSeconds((s) => Math.min(300, s + 15))}
            className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-lg bg-[#171717] border border-[#262626] text-white text-sm active:scale-95"
            style={{ transition: "transform 120ms ease, background-color 150ms ease" }}
          >
            <Plus size={14} /> 15s
          </button>
        </div>
        <div className="mt-3 text-center text-xs text-neutral-500 uppercase tracking-widest">Target: {seconds}s</div>
      </div>
    </div>
  );
}
