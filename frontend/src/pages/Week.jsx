import { useMemo, useState } from "react";
import { PLAN, WEEK_ORDER } from "@/data/plan";
import { Dumbbell, Waves, Timer as TimerIcon, Activity, Coffee, Moon, Sparkles } from "lucide-react";
import { computeThisWeek } from "@/lib/storage";
import { buildDayPlan, loadEquipment, makePlanFn } from "@/lib/equipment";

const ICONS = {
  strength: Dumbbell,
  band: Waves,
  timed: TimerIcon,
  cardio: Activity,
};

export default function Week({ tick }) {
  const todayIdx = new Date().getDay();
  const [selected, setSelected] = useState(todayIdx);
  const { owned } = useMemo(() => loadEquipment(), [tick]);
  const day = useMemo(() => buildDayPlan(selected, owned) || PLAN[selected], [selected, owned]);
  const stats = useMemo(() => computeThisWeek(makePlanFn(owned)), [owned, tick]);

  return (
    <div data-testid="week-screen" className="pb-28 relative z-10">
      <div className="px-4 pt-8">
        <div className="text-[#FF4500] text-xs uppercase tracking-[0.3em] font-semibold">The Split</div>
        <h1 className="font-display text-5xl sm:text-6xl uppercase text-white leading-[0.9] mt-1">Weekly Plan</h1>
        <p className="text-neutral-400 text-sm mt-2">5 training days • 2 rest days (Sat, Sun)</p>
      </div>

      {/* Day strip */}
      <div className="mt-6 px-4">
        <div className="grid grid-cols-7 gap-1.5">
          {WEEK_ORDER.map((idx) => {
            const d = PLAN[idx];
            const isSel = idx === selected;
            const isToday = idx === todayIdx;
            const worked = stats.days[idx]?.worked;
            return (
              <button
                key={idx}
                data-testid={`week-day-${d.id}`}
                onClick={() => setSelected(idx)}
                className={`relative flex flex-col items-center justify-center h-16 rounded-xl border ${
                  isSel
                    ? "bg-gradient-to-br from-[#FF4500] to-[#DC2626] border-transparent"
                    : "bg-[#101010] border-[#1F1F1F] hover:border-[#333]"
                }`}
                style={{ transition: "background-color 200ms ease, border-color 200ms ease" }}
              >
                <span className={`font-display text-xl uppercase ${isSel ? "text-white" : "text-neutral-300"}`}>{d.short}</span>
                <span className={`mt-1 w-1.5 h-1.5 rounded-full ${d.isRestDay ? (isSel ? "bg-white/60" : "bg-neutral-700") : worked ? (isSel ? "bg-white" : "bg-[#FF4500]") : isSel ? "bg-white/40" : "bg-neutral-600"}`} />
                {isToday && !isSel && (
                  <span className="absolute -top-1 -right-1 text-[8px] uppercase tracking-widest bg-[#FF4500] text-white rounded-sm px-1 py-[1px] font-bold">Now</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-3 text-[10px] uppercase tracking-widest text-neutral-500">
          <span>Mon</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Selected day */}
      <div className="mt-6 px-4">
        {day.isRestDay ? (
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
            <div className="flex items-center gap-2 text-[#FF4500] mb-3">
              <Moon size={16} />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold">{day.dayName}</span>
            </div>
            <div className="font-display text-4xl uppercase text-white">Rest / Mobility</div>
            <p className="text-neutral-400 text-sm mt-2">Walk, stretch, foam roll. No exercises scheduled.</p>
          </div>
        ) : (
          <>
            <div className="relative h-40 rounded-2xl overflow-hidden mb-4 border border-[#1F1F1F]">
              {day.image && <img src={day.image} alt={day.focus} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.85) 100%)" }} />
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="text-[#FF4500] text-[10px] uppercase tracking-[0.3em] font-semibold">{day.dayName}</div>
                <h2 className="font-display text-3xl uppercase text-white leading-none mt-1">{day.focus}</h2>
                <div className="text-neutral-300 text-xs mt-1">{day.subtitle}</div>
              </div>
            </div>

            {day.blocks.length === 0 ? (
              <div data-testid="week-empty" className="rounded-2xl p-6 border border-dashed border-[#2A2A2A] bg-[#0D0D0D] text-center">
                <div className="text-[#FF4500] text-xs uppercase tracking-[0.3em] font-semibold mb-2">No exercises match your kit</div>
                <p className="text-neutral-400 text-sm">Add equipment in Settings to unlock exercises for this day.</p>
              </div>
            ) : (
              day.blocks.map((block, bIdx) => (
                <div key={bIdx} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#FF4500] font-semibold">{block.title}</span>
                    <div className="flex-1 h-px bg-[#1F1F1F]" />
                  </div>
                  <div className="space-y-2">
                    {block.exercises.map((ex) => {
                      const Icon = ICONS[ex.type] || Dumbbell;
                      const target = ex.single ? ex.duration : ex.duration ? `${ex.sets} × ${ex.duration}` : `${ex.sets} × ${ex.repRange}`;
                      return (
                        <div key={ex.id} data-testid={`week-exercise-${ex.id}`} className="relative flex items-center gap-3 bg-[#111111] border border-[#1F1F1F] rounded-xl px-4 py-3">
                          {ex.isAddon && (
                            <div className="absolute -top-2 left-3 flex items-center gap-1 bg-[#FF4500] text-white text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-bold">
                              <Sparkles size={9} /> New
                            </div>
                          )}
                          <div className="w-8 h-8 rounded-md bg-[#1A1A1A] flex items-center justify-center">
                            <Icon size={16} className="text-[#FF4500]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-sm font-medium truncate">{ex.name}</div>
                          </div>
                          <div className="text-neutral-400 text-xs uppercase tracking-wider whitespace-nowrap">{target}</div>
                        </div>
                      );
                    })}
                  </div>
                  {bIdx < day.blocks.length - 1 && (
                    <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-600">
                      <Coffee size={12} /> Short Break
                      <div className="flex-1 h-px bg-[#151515]" />
                    </div>
                  )}
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
