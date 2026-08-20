import { useMemo, useState } from "react";
import { PLAN, REST_SUGGESTIONS } from "@/data/plan";
import { buildDayPlan, flattenExercises } from "@/lib/equipment";
import { loadEquipment } from "@/lib/equipment";
import { getSession, upsertSession, todayKey, countExerciseProgress } from "@/lib/storage";
import ExerciseCard from "@/components/ExerciseCard";
import RestTimer from "@/components/RestTimer";
import { Timer, Moon, Coffee, Wind, Sparkles } from "lucide-react";

export default function Today({ tick, onTick, restSeconds }) {
  const [restOpen, setRestOpen] = useState(false);
  const now = new Date();
  const dayIdx = now.getDay();
  const dateKey = todayKey(now);
  const { owned } = useMemo(() => loadEquipment(), [tick]);
  const day = useMemo(() => buildDayPlan(dayIdx, owned) || PLAN[dayIdx], [dayIdx, owned]);
  const session = useMemo(() => getSession(dateKey), [dateKey, tick]);
  const allExercises = flattenExercises(day);
  const progress = countExerciseProgress(session, allExercises);
  const pct = allExercises.length ? (progress.done / progress.total) * 100 : 0;

  const handleLogSet = (exerciseId, setIndex, payload) => {
    upsertSession(dateKey, (s) => {
      const arr = [...(s.sets[exerciseId] || [])];
      arr[setIndex] = { setNumber: setIndex + 1, completedAt: Date.now(), ...payload };
      s.sets[exerciseId] = arr;
      s.skipped = s.skipped.filter((id) => id !== exerciseId);
      return s;
    });
    onTick();
  };

  const handleSkip = (exerciseId) => {
    upsertSession(dateKey, (s) => {
      if (s.skipped.includes(exerciseId)) {
        s.skipped = s.skipped.filter((id) => id !== exerciseId);
      } else {
        s.skipped.push(exerciseId);
      }
      return s;
    });
    onTick();
  };

  const handleLogSingle = (exerciseId, value) => {
    upsertSession(dateKey, (s) => {
      if (!s.completedSingles.includes(exerciseId)) s.completedSingles.push(exerciseId);
      s.sets[exerciseId] = [{ setNumber: 1, completed: true, reps: value, isDuration: true, completedAt: Date.now() }];
      s.skipped = s.skipped.filter((id) => id !== exerciseId);
      return s;
    });
    onTick();
  };

  if (day.isRestDay) {
    return (
      <div data-testid="today-rest" className="pb-28 relative z-10">
        <div className="px-4 pt-8">
          <div className="text-[#FF4500] text-xs uppercase tracking-[0.3em] font-semibold">{day.dayName}</div>
          <h1 className="font-display text-5xl sm:text-6xl uppercase text-white leading-[0.9] mt-1">Rest Day</h1>
          <div className="text-neutral-400 text-sm mt-2">Recovery — no logged sets</div>
        </div>
        <div className="mx-4 mt-6 bg-gradient-to-br from-[#1A0A00] to-[#0F0F0F] border border-[#FF4500]/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[#FF4500] mb-3">
            <Moon size={16} />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold">Recovery Mode</span>
          </div>
          <h2 className="font-display text-4xl text-white uppercase mb-2">Take It Easy</h2>
          <p className="text-neutral-400 text-sm">Rest is where muscle is actually built. Try one or two of these today.</p>
          <ul className="mt-5 space-y-2.5">
            {REST_SUGGESTIONS.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-[#FF4500]/15 text-[#FF4500] text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const isEmpty = allExercises.length === 0;

  return (
    <div data-testid="today-screen" className="pb-28 relative z-10">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        {day.image && (
          <img src={day.image} alt={day.focus} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.7) 55%, #050505 100%)" }} />
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div className="text-[#FF4500] text-xs font-semibold uppercase tracking-[0.3em]">{day.dayName}</div>
          <h1 className="font-display text-5xl sm:text-6xl text-white uppercase leading-[0.9] mt-1" data-testid="today-focus">{day.focus}</h1>
          <div className="mt-2 text-neutral-400 text-sm">{day.subtitle}</div>
        </div>
      </div>

      {/* Progress + rest button */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Progress</div>
              <div className="text-white font-semibold text-sm mt-0.5" data-testid="today-progress">
                {progress.done} / {progress.total} exercises done
              </div>
            </div>
            <button
              data-testid="open-rest-timer"
              onClick={() => setRestOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs font-bold uppercase tracking-wider"
              style={{ background: "linear-gradient(90deg, #FF4500, #DC2626)" }}
            >
              <Timer size={14} /> Rest
            </button>
          </div>
          <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #FF4500, #DC2626)", transition: "width 400ms ease-out" }} />
          </div>
        </div>
      </div>

      {isEmpty ? (
        <div data-testid="today-empty" className="mx-4 mt-6 rounded-2xl p-6 border border-dashed border-[#2A2A2A] bg-[#0D0D0D] text-center">
          <div className="text-[#FF4500] text-xs uppercase tracking-[0.3em] font-semibold mb-2">No exercises match your kit</div>
          <p className="text-neutral-400 text-sm">Head to Settings → Equipment and add a few items so today's plan fills in.</p>
        </div>
      ) : (
        <div className="px-4 mt-5 space-y-6">
          {day.blocks.map((block, bIdx) => (
            <div key={bIdx}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#FF4500] font-semibold">{block.title}</span>
                <div className="flex-1 h-px bg-[#1F1F1F]" />
              </div>
              <div className="space-y-3">
                {block.exercises.map((ex) => (
                  <div key={ex.id} className="relative">
                    {ex.isAddon && (
                      <div className="absolute -top-2 left-3 z-10 flex items-center gap-1 bg-[#FF4500] text-white text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-bold">
                        <Sparkles size={9} /> New
                      </div>
                    )}
                    <ExerciseCard
                      exercise={ex}
                      session={session}
                      onLogSet={handleLogSet}
                      onSkip={handleSkip}
                      onLogSingle={handleLogSingle}
                      circuit={day.id === "sat"}
                    />
                  </div>
                ))}
              </div>
              {bIdx < day.blocks.length - 1 && (
                <button
                  data-testid={`inline-rest-${bIdx}`}
                  onClick={() => setRestOpen(true)}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0E0E0E] border border-dashed border-[#2A2A2A] text-neutral-400 text-xs uppercase tracking-widest hover:border-[#FF4500]/50 hover:text-[#FF4500]"
                  style={{ transition: "color 150ms ease, border-color 150ms ease" }}
                >
                  <Coffee size={14} /> Start Rest Timer
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {progress.done === progress.total && progress.total > 0 && (
        <div className="mx-4 mt-6 rounded-2xl p-5 bg-gradient-to-br from-[#FF4500]/20 to-[#DC2626]/10 border border-[#FF4500]/40">
          <div className="flex items-center gap-2 text-[#FF4500] mb-1">
            <Wind size={16} />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">Session Complete</span>
          </div>
          <div className="font-display text-3xl uppercase text-white">Nailed it. Recover well.</div>
        </div>
      )}

      {restOpen && <RestTimer defaultSeconds={restSeconds} onClose={() => setRestOpen(false)} />}
    </div>
  );
}
