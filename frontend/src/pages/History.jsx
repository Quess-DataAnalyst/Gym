import { PLAN, WEEK_ORDER } from "@/data/plan";
import {
  computeStreak,
  computeTotalSessions,
  computeThisWeek,
  listRecentSessions,
  repsByWeek,
} from "@/lib/storage";
import { loadEquipment, makePlanFn } from "@/lib/equipment";
import { Flame, Trophy, Dumbbell, Check, X, Moon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useMemo } from "react";

export default function History({ tick }) {
  const { owned } = useMemo(() => loadEquipment(), [tick]);
  const planFn = useMemo(() => makePlanFn(owned), [owned]);
  const streak = useMemo(() => computeStreak(planFn), [planFn, tick]);
  const total = useMemo(() => computeTotalSessions(), [tick]);
  const week = useMemo(() => computeThisWeek(planFn), [planFn, tick]);
  const recent = useMemo(() => listRecentSessions(planFn, 20), [planFn, tick]);
  const chartData = useMemo(() => repsByWeek(6), [tick]);

  return (
    <div data-testid="history-screen" className="pb-28 relative z-10">
      <div className="px-4 pt-8">
        <div className="text-[#FF4500] text-xs uppercase tracking-[0.3em] font-semibold">Progress</div>
        <h1 className="font-display text-5xl sm:text-6xl uppercase text-white leading-[0.9] mt-1">History</h1>
      </div>

      {/* Stat tiles */}
      <div className="px-4 mt-5 grid grid-cols-3 gap-2">
        <StatTile icon={Flame} value={streak} label="Day Streak" testId="stat-streak" />
        <StatTile icon={Trophy} value={`${week.done}/5`} label="This Week" testId="stat-week" />
        <StatTile icon={Dumbbell} value={total} label="Total Done" testId="stat-total" />
      </div>

      {/* Weekly dot tracker */}
      <div className="mx-4 mt-5 bg-[#111111] border border-[#1F1F1F] rounded-2xl p-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">This Week</div>
        <div className="grid grid-cols-7 gap-1.5" data-testid="week-tracker">
          {WEEK_ORDER.map((idx) => {
            const d = PLAN[idx];
            const info = week.days[idx];
            const worked = info?.worked;
            const rest = d.isRestDay;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] uppercase text-neutral-500 tracking-wider">{d.short}</span>
                <div
                  data-testid={`week-dot-${d.id}`}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    rest
                      ? "border-[#262626] bg-[#0A0A0A] text-neutral-600"
                      : worked
                        ? "border-[#FF4500] bg-[#FF4500] text-white"
                        : "border-[#262626] bg-[#0A0A0A] text-neutral-700"
                  }`}
                >
                  {rest ? <Moon size={12} /> : worked ? <Check size={14} strokeWidth={3} /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="mx-4 mt-5 bg-[#111111] border border-[#1F1F1F] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Reps / Week</div>
          <div className="text-[10px] uppercase tracking-widest text-[#FF4500] font-semibold">Trend</div>
        </div>
        <div className="h-40" data-testid="reps-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="lineFill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF4500" />
                  <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
              <XAxis dataKey="week" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} width={40} />
              <Tooltip
                contentStyle={{
                  background: "#0A0A0A",
                  border: "1px solid #262626",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 12,
                }}
                labelStyle={{ color: "#FF4500", fontWeight: 600 }}
                cursor={{ stroke: "#FF4500", strokeOpacity: 0.3 }}
              />
              <Line
                type="monotone"
                dataKey="reps"
                stroke="url(#lineFill)"
                strokeWidth={2.5}
                dot={{ fill: "#FF4500", r: 3, stroke: "#050505", strokeWidth: 2 }}
                activeDot={{ r: 5, fill: "#FF4500" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent sessions */}
      <div className="px-4 mt-6">
        <h2 className="font-display text-2xl uppercase text-white mb-3">Recent Sessions</h2>
        {recent.length === 0 ? (
          <div data-testid="no-sessions" className="text-neutral-500 text-sm text-center py-8 bg-[#0D0D0D] border border-dashed border-[#1F1F1F] rounded-xl">
            No sessions logged yet. Head to Today and log your first set.
          </div>
        ) : (
          <div className="space-y-2" data-testid="recent-list">
            {recent.map((s) => (
              <div
                key={s.date}
                data-testid={`session-row-${s.date}`}
                className="bg-[#111111] border border-[#1F1F1F] rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FF4500]/15 flex items-center justify-center">
                  <Flame size={16} className="text-[#FF4500]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold truncate">{s.focus}</div>
                  <div className="text-neutral-500 text-xs mt-0.5">
                    {formatDate(s.date)} • {s.durationMin || 0} min
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-[#FF4500]">
                    <Check size={12} strokeWidth={3} /> {s.doneCount}
                  </span>
                  {s.skippedCount > 0 && (
                    <span className="flex items-center gap-1 text-neutral-500">
                      <X size={12} strokeWidth={3} /> {s.skippedCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, value, label, testId }) {
  return (
    <div
      data-testid={testId}
      className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-3 flex flex-col justify-between min-h-[92px]"
    >
      <Icon size={16} className="text-[#FF4500]" />
      <div>
        <div className="font-display text-4xl text-white leading-none">{value}</div>
        <div className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{label}</div>
      </div>
    </div>
  );
}

function formatDate(key) {
  const d = new Date(key + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
