import { useState } from "react";
import { Check, Dumbbell, Waves, Timer as TimerIcon, Zap, Activity } from "lucide-react";

const ICONS = {
  strength: Dumbbell,
  band: Waves,
  timed: TimerIcon,
  cardio: Activity,
};

const bandOpts = [
  { key: "light", label: "L" },
  { key: "medium", label: "M" },
  { key: "heavy", label: "H" },
];

export default function ExerciseCard({
  exercise,
  session,
  onLogSet,
  onSkip,
  onLogSingle,
  circuit = false,
}) {
  const Icon = ICONS[exercise.type] || Dumbbell;
  const sets = session?.sets?.[exercise.id] || [];
  const skipped = session?.skipped?.includes(exercise.id);
  const singleDone = session?.completedSingles?.includes(exercise.id);

  const isSingle = exercise.single;
  const [singleValue, setSingleValue] = useState("");

  const target = isSingle
    ? exercise.duration
    : exercise.duration
      ? `${exercise.sets} × ${exercise.duration}`
      : `${exercise.sets} × ${exercise.repRange} reps`;

  const doneCount = sets.filter((s) => s && s.completed).length;
  const isCompleted = isSingle ? singleDone : doneCount >= exercise.sets;

  return (
    <div
      data-testid={`exercise-card-${exercise.id}`}
      className={`relative overflow-hidden bg-[#111111] border rounded-2xl p-4 sm:p-5 ${
        isCompleted ? "border-[#FF4500]/40" : skipped ? "border-neutral-800 opacity-60" : "border-[#1F1F1F]"
      }`}
      style={{ transition: "border-color 200ms ease, opacity 200ms ease" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
              isCompleted ? "bg-[#FF4500]/15" : "bg-[#1A1A1A]"
            }`}
            style={{ transition: "background-color 200ms ease" }}
          >
            <Icon size={20} className={isCompleted ? "text-[#FF4500]" : "text-neutral-300"} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-semibold text-[15px] leading-tight">{exercise.name}</h3>
              {exercise.type === "band" && (
                <span className="text-[9px] uppercase tracking-widest text-[#FF4500] border border-[#FF4500]/40 rounded px-1.5 py-0.5">
                  Band
                </span>
              )}
            </div>
            <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">
              {target}
              {exercise.equipment && <span className="ml-2 opacity-60">• {exercise.equipment}</span>}
            </div>
          </div>
        </div>
        <button
          data-testid={`skip-${exercise.id}`}
          onClick={() => onSkip(exercise.id)}
          className={`shrink-0 text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded-md border ${
            skipped
              ? "border-[#FF4500]/40 text-[#FF4500]"
              : "border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700"
          }`}
          style={{ transition: "color 150ms ease, border-color 150ms ease" }}
        >
          {skipped ? "Skipped" : "Skip"}
        </button>
      </div>

      {/* Body */}
      {isSingle ? (
        <div className="mt-4 flex items-center gap-2">
          <input
            data-testid={`single-input-${exercise.id}`}
            type="text"
            inputMode="numeric"
            value={singleValue}
            onChange={(e) => setSingleValue(e.target.value)}
            placeholder={exercise.duration}
            className="flex-1 min-w-0 w-full bg-black border border-[#262626] rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#FF4500]"
            style={{ transition: "border-color 150ms ease" }}
          />
          <button
            data-testid={`mark-done-${exercise.id}`}
            onClick={() => onLogSingle(exercise.id, singleValue)}
            disabled={singleDone}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
              singleDone ? "bg-[#FF4500]/20 text-[#FF4500]" : "text-white"
            }`}
            style={
              singleDone
                ? { transition: "background-color 150ms ease" }
                : { background: "linear-gradient(90deg, #FF4500, #DC2626)", transition: "opacity 150ms ease" }
            }
          >
            {singleDone ? "Done" : "Mark Done"}
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {Array.from({ length: exercise.sets }).map((_, i) => (
            <SetRow
              key={i}
              exerciseId={exercise.id}
              index={i}
              exercise={exercise}
              log={sets[i]}
              onLogSet={onLogSet}
            />
          ))}
        </div>
      )}

      {circuit && (
        <div className="mt-3 text-[10px] uppercase tracking-widest text-neutral-600">Circuit style — minimal rest</div>
      )}
    </div>
  );
}

function SetRow({ exerciseId, index, exercise, log, onLogSet }) {
  const [val, setVal] = useState(log?.reps ?? "");
  const [band, setBand] = useState(log?.bandLevel ?? "medium");
  const done = !!log?.completed;
  const isTimed = exercise.type === "timed";
  const isBand = exercise.type === "band";

  // Parse the first number out of e.g. "12–15", "15 (2s squeeze)", "45–60s"
  const parseTargetNumber = (str) => {
    if (!str) return 0;
    const m = String(str).match(/\d+/);
    return m ? Number(m[0]) : 0;
  };
  const targetDefault = isTimed
    ? parseTargetNumber(exercise.duration)
    : parseTargetNumber(exercise.repRange);

  const commit = () => {
    if (done) return;
    const raw = typeof val === "string" ? val.trim() : val;
    const finalReps = raw === "" || raw === null || raw === undefined ? targetDefault : raw;
    onLogSet(exerciseId, index, {
      reps: finalReps,
      bandLevel: isBand ? band : null,
      isDuration: isTimed,
      completed: true,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-6 text-center text-neutral-500 text-sm font-semibold">{index + 1}</div>

      {isBand && (
        <div className="flex items-center gap-1 mr-1">
          {bandOpts.map((b) => (
            <button
              key={b.key}
              data-testid={`band-${exerciseId}-${index}-${b.key}`}
              onClick={() => !done && setBand(b.key)}
              disabled={done}
              className={`w-8 h-9 rounded-md text-xs font-bold ${
                band === b.key
                  ? "bg-[#FF4500] text-white"
                  : "bg-[#151515] text-neutral-500 border border-[#262626]"
              }`}
              style={{ transition: "background-color 150ms ease, color 150ms ease" }}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      <input
        data-testid={`reps-${exerciseId}-${index}`}
        type="text"
        inputMode="numeric"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        disabled={done}
        placeholder={isTimed ? `${targetDefault || "sec"}s` : `${targetDefault || "reps"}`}
        className={`flex-1 min-w-0 w-full bg-black border rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none ${
          done ? "border-[#FF4500]/30 text-neutral-400" : "border-[#262626] focus:border-[#FF4500]"
        }`}
        style={{ transition: "border-color 150ms ease" }}
      />

      <button
        data-testid={`complete-set-${exerciseId}-${index}`}
        onClick={commit}
        disabled={done}
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
          done
            ? "bg-[#FF4500] border-[#FF4500] check-pop"
            : "border-neutral-700 hover:border-[#FF4500] hover:bg-[#FF4500]/10"
        }`}
        style={{ transition: "background-color 200ms ease, border-color 200ms ease" }}
      >
        <Check size={18} className="text-white" strokeWidth={3} />
      </button>
    </div>
  );
}
