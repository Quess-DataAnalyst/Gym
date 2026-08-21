// LocalStorage-backed persistence for Home Shred
const SESSIONS_KEY = "homeshred:sessions";
const SETTINGS_KEY = "homeshred:settings";

const safeParse = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const todayKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const loadSessions = () => {
  return safeParse(localStorage.getItem(SESSIONS_KEY), {});
};

export const saveSessions = (sessions) => {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const getSession = (dateKey) => {
  const all = loadSessions();
  return all[dateKey] || null;
};

export const upsertSession = (dateKey, updater) => {
  const all = loadSessions();
  const existing = all[dateKey] || {
    date: dateKey,
    dayIdx: new Date(dateKey + "T00:00:00").getDay(),
    startedAt: Date.now(),
    sets: {},
    skipped: [],
    completedSingles: [],
    lastUpdatedAt: Date.now(),
  };
  const next = updater({ ...existing, sets: { ...existing.sets }, skipped: [...existing.skipped], completedSingles: [...existing.completedSingles] });
  next.lastUpdatedAt = Date.now();
  all[dateKey] = next;
  saveSessions(all);
  return next;
};

export const clearAllData = () => {
  localStorage.removeItem(SESSIONS_KEY);
  localStorage.removeItem(SETTINGS_KEY);
  localStorage.removeItem("homeshred:equipment");
  localStorage.removeItem("homeshred:custom-exercises");
};

export const loadSettings = () => {
  return safeParse(localStorage.getItem(SETTINGS_KEY), { darkMode: true, restSeconds: 60 });
};

export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Derived helpers
export const isExerciseComplete = (session, exercise) => {
  if (!session) return false;
  if (exercise.single) return session.completedSingles.includes(exercise.id);
  const sets = session.sets[exercise.id] || [];
  const done = sets.filter((s) => s && s.completed).length;
  return done >= exercise.sets;
};

export const isExerciseSkipped = (session, exercise) => {
  return !!session && session.skipped.includes(exercise.id);
};

export const countExerciseProgress = (session, exercises) => {
  if (!session) return { done: 0, total: exercises.length };
  let done = 0;
  exercises.forEach((ex) => {
    if (isExerciseComplete(session, ex) || isExerciseSkipped(session, ex)) done += 1;
  });
  return { done, total: exercises.length };
};

// Streak: count consecutive days (back from today) where either a rest day is scheduled,
// or a training day has at least one completed set/single.
export const computeStreak = (planFn) => {
  const all = loadSessions();
  let streak = 0;
  const cursor = new Date();
  // walk back up to 365 days
  for (let i = 0; i < 365; i++) {
    const key = todayKey(cursor);
    const dayIdx = cursor.getDay();
    const day = planFn(dayIdx);
    if (day.isRestDay) {
      // rest day always counts if it's not today OR if today we haven't broken streak
      streak += 1;
    } else {
      const s = all[key];
      const hasWork = s && (Object.values(s.sets || {}).some((arr) => arr && arr.some((x) => x && x.completed)) || (s.completedSingles || []).length > 0);
      if (hasWork) streak += 1;
      else {
        // Today: not yet worked → don't break streak, keep counting yesterday
        if (i === 0) {
          // don't add, don't break
        } else break;
      }
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

// Total sessions logged (any work done)
export const computeTotalSessions = () => {
  const all = loadSessions();
  return Object.values(all).filter((s) => {
    const hasSets = Object.values(s.sets || {}).some((arr) => arr && arr.some((x) => x && x.completed));
    const hasSingles = (s.completedSingles || []).length > 0;
    return hasSets || hasSingles;
  }).length;
};

// This-week completed training days (Mon-Sun window)
export const computeThisWeek = (planFn) => {
  const all = loadSessions();
  const now = new Date();
  const dow = now.getDay(); // 0..6
  const daysSinceMonday = (dow + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysSinceMonday);
  monday.setHours(0, 0, 0, 0);
  const result = { done: 0, total: 5, days: {} };
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = todayKey(d);
    const dayIdx = d.getDay();
    const day = planFn(dayIdx);
    const s = all[key];
    const worked = s && (Object.values(s.sets || {}).some((arr) => arr && arr.some((x) => x && x.completed)) || (s.completedSingles || []).length > 0);
    result.days[dayIdx] = { key, worked: !!worked, isRestDay: day.isRestDay };
    if (worked && !day.isRestDay) result.done += 1;
  }
  return result;
};

export const listRecentSessions = (planFn, limit = 20) => {
  const all = loadSessions();
  return Object.values(all)
    .filter((s) => {
      const hasSets = Object.values(s.sets || {}).some((arr) => arr && arr.some((x) => x && x.completed));
      const hasSingles = (s.completedSingles || []).length > 0;
      return hasSets || hasSingles || (s.skipped || []).length > 0;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit)
    .map((s) => {
      const day = planFn(s.dayIdx);
      const doneCount = Object.keys(s.sets || {}).filter((exId) => (s.sets[exId] || []).some((x) => x && x.completed)).length + (s.completedSingles || []).length;
      const skippedCount = (s.skipped || []).length;
      const durationMin = s.lastUpdatedAt && s.startedAt ? Math.max(1, Math.round((s.lastUpdatedAt - s.startedAt) / 60000)) : 0;
      return { ...s, focus: day.focus, dayName: day.dayName, doneCount, skippedCount, durationMin };
    });
};

// Total reps completed per ISO week for chart (excludes timed/duration entries)
export const repsByWeek = (weeks = 6) => {
  const all = Object.values(loadSessions());
  const now = new Date();
  const dow = now.getDay();
  const daysSinceMonday = (dow + 6) % 7;
  const thisMonday = new Date(now);
  thisMonday.setDate(now.getDate() - daysSinceMonday);
  thisMonday.setHours(0, 0, 0, 0);
  const buckets = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const start = new Date(thisMonday);
    start.setDate(thisMonday.getDate() - i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    let total = 0;
    all.forEach((s) => {
      const d = new Date(s.date + "T00:00:00");
      if (d >= start && d < end) {
        Object.values(s.sets || {}).forEach((arr) => {
          (arr || []).forEach((x) => {
            if (x && x.completed && !x.isDuration) {
              const n = Number(x.reps);
              if (Number.isFinite(n) && n > 0) total += n;
            }
          });
        });
      }
    });
    const label = `${start.getMonth() + 1}/${start.getDate()}`;
    buckets.push({ week: label, reps: total });
  }
  return buckets;
};
