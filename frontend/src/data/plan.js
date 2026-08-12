// Home Shred — 5-day workout plan
// Day index matches JS Date.getDay(): 0=Sun ... 6=Sat

const IMG = {
  // All hero images: confirmed male athletes in dark/gritty gym settings
  push: "https://images.unsplash.com/photo-1765302840608-6c67281260c3?fm=jpg&q=60&w=1600&auto=format&fit=crop",
  pull: "https://images.unsplash.com/photo-1772450014229-2a8b006893e9?fm=jpg&q=60&w=1600&auto=format&fit=crop",
  legs: "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?fm=jpg&q=60&w=1600&auto=format&fit=crop",
  cardio: "https://images.unsplash.com/photo-1765302886933-34d10c152af3?fm=jpg&q=60&w=1600&auto=format&fit=crop",
  fullbody: "https://images.unsplash.com/photo-1765303193537-ae41f1a3720f?fm=jpg&q=60&w=1600&auto=format&fit=crop",
};

// blocks group exercises into muscle-group sections shown with SHORT BREAK dividers
export const PLAN = {
  1: {
    id: "mon",
    dayName: "Monday",
    short: "M",
    focus: "PUSH + CORE",
    subtitle: "Chest • Shoulders • Triceps",
    isRestDay: false,
    image: IMG.push,
    blocks: [
      {
        title: "Push",
        exercises: [
          { id: "mon-1", name: "Push-Ups", type: "strength", sets: 3, repRange: "12–15", equipment: "Mat" },
          { id: "mon-2", name: "Decline Push-Ups", type: "strength", sets: 3, repRange: "10–12", equipment: "Stepper" },
          { id: "mon-3", name: "Diamond Push-Ups", type: "strength", sets: 3, repRange: "10–12", equipment: "Mat" },
          { id: "mon-4", name: "Pike Push-Ups", type: "strength", sets: 3, repRange: "8–12", equipment: "Mat" },
          { id: "mon-5", name: "Band Front Raise", type: "band", sets: 3, repRange: "12–15", equipment: "Band" },
        ],
      },
      {
        title: "Core",
        exercises: [
          { id: "mon-6", name: "Ab Wheel Rollout", type: "strength", sets: 3, repRange: "8–12", equipment: "Ab Wheel" },
          { id: "mon-7", name: "Plank", type: "timed", sets: 3, duration: "45–60s", equipment: "Mat" },
        ],
      },
    ],
  },
  2: {
    id: "tue",
    dayName: "Tuesday",
    short: "T",
    focus: "PULL + CORE",
    subtitle: "Back • Biceps (Band)",
    isRestDay: false,
    image: IMG.pull,
    blocks: [
      {
        title: "Pull",
        exercises: [
          { id: "tue-1", name: "Band Bent-Over Row", type: "band", sets: 3, repRange: "12–15", equipment: "Band" },
          { id: "tue-2", name: "Band Straight-Arm Pulldown", type: "band", sets: 3, repRange: "12–15", equipment: "Band" },
          { id: "tue-3", name: "Band Bicep Curl", type: "band", sets: 3, repRange: "12–15", equipment: "Band" },
          { id: "tue-4", name: "Superman Hold", type: "strength", sets: 3, repRange: "12 (2s squeeze)", equipment: "Mat" },
          { id: "tue-5", name: "Reverse Snow Angels", type: "strength", sets: 3, repRange: "12", equipment: "Mat" },
        ],
      },
      {
        title: "Core",
        exercises: [
          { id: "tue-6", name: "Ab Wheel Rollout", type: "strength", sets: 3, repRange: "8–10", equipment: "Ab Wheel" },
          { id: "tue-7", name: "Side Plank (each side)", type: "timed", sets: 3, duration: "30–45s", equipment: "Mat" },
        ],
      },
    ],
  },
  3: {
    id: "wed",
    dayName: "Wednesday",
    short: "W",
    focus: "REST / MOBILITY",
    subtitle: "Recovery Day",
    isRestDay: true,
    image: null,
    blocks: [],
  },
  4: {
    id: "thu",
    dayName: "Thursday",
    short: "T",
    focus: "LEGS + GLUTES",
    subtitle: "Band • Bodyweight",
    isRestDay: false,
    image: IMG.legs,
    blocks: [
      {
        title: "Warm-up",
        exercises: [
          { id: "thu-1", name: "Mini Stepper Intervals", type: "cardio", single: true, duration: "10 min", equipment: "Stepper" },
        ],
      },
      {
        title: "Legs",
        exercises: [
          { id: "thu-2", name: "Band Squats", type: "band", sets: 3, repRange: "15", equipment: "Band" },
          { id: "thu-3", name: "Reverse Lunges (per leg)", type: "strength", sets: 3, repRange: "12", equipment: "Mat" },
          { id: "thu-4", name: "Band Glute Kickbacks (per leg)", type: "band", sets: 3, repRange: "15", equipment: "Band" },
          { id: "thu-5", name: "Single-Leg Glute Bridge (per leg)", type: "strength", sets: 3, repRange: "12", equipment: "Mat" },
          { id: "thu-6", name: "Wall Sit", type: "timed", sets: 3, duration: "45–60s", equipment: "None" },
        ],
      },
      {
        title: "Core",
        exercises: [
          { id: "thu-7", name: "Lying Leg Raises", type: "strength", sets: 3, repRange: "15", equipment: "Mat" },
        ],
      },
    ],
  },
  5: {
    id: "fri",
    dayName: "Friday",
    short: "F",
    focus: "CARDIO HIIT + ABS",
    subtitle: "Rope • Run • Core",
    isRestDay: false,
    image: IMG.cardio,
    blocks: [
      {
        title: "HIIT",
        exercises: [
          { id: "fri-1", name: "Jump Rope (5 × 1min / 30s rest)", type: "cardio", single: true, duration: "≈ 8 min", equipment: "Rope" },
          { id: "fri-2", name: "Burpees", type: "strength", sets: 3, repRange: "12", equipment: "Mat" },
          { id: "fri-3", name: "Mountain Climbers", type: "timed", sets: 3, duration: "30s", equipment: "Mat" },
          { id: "fri-4", name: "Run (moderate)", type: "cardio", single: true, duration: "15–20 min", equipment: "Shoes" },
        ],
      },
      {
        title: "Abs",
        exercises: [
          { id: "fri-5", name: "Bicycle Crunches", type: "strength", sets: 3, repRange: "20 each", equipment: "Mat" },
          { id: "fri-6", name: "Leg Raises", type: "strength", sets: 3, repRange: "12–15", equipment: "Mat" },
        ],
      },
    ],
  },
  6: {
    id: "sat",
    dayName: "Saturday",
    short: "S",
    focus: "FULL BODY CIRCUIT",
    subtitle: "3–4 rounds • Minimal rest",
    isRestDay: false,
    image: IMG.fullbody,
    blocks: [
      {
        title: "Circuit",
        exercises: [
          { id: "sat-1", name: "Push-Ups", type: "strength", sets: 3, repRange: "15", equipment: "Mat" },
          { id: "sat-2", name: "Band Rows", type: "band", sets: 3, repRange: "15", equipment: "Band" },
          { id: "sat-3", name: "Band Squats", type: "band", sets: 3, repRange: "15", equipment: "Band" },
          { id: "sat-4", name: "Mountain Climbers", type: "timed", sets: 3, duration: "30s", equipment: "Mat" },
          { id: "sat-5", name: "Ab Wheel Rollout", type: "strength", sets: 3, repRange: "10", equipment: "Ab Wheel" },
          { id: "sat-6", name: "Jump Rope", type: "timed", sets: 3, duration: "60s", equipment: "Rope" },
        ],
      },
      {
        title: "Finisher",
        exercises: [
          { id: "sat-7", name: "Plank", type: "timed", sets: 1, duration: "60s", equipment: "Mat" },
        ],
      },
    ],
  },
  0: {
    id: "sun",
    dayName: "Sunday",
    short: "S",
    focus: "REST / MOBILITY",
    subtitle: "Recovery Day",
    isRestDay: true,
    image: null,
    blocks: [],
  },
};

// Ordered Monday-first list for the Week strip
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

// Flat exercise list per day
export const getExercisesForDay = (dayIdx) => {
  const day = PLAN[dayIdx];
  if (!day) return [];
  return day.blocks.flatMap((b) => b.exercises);
};

export const REST_SUGGESTIONS = [
  "Light 20-min walk outside",
  "Full-body stretch (10 min)",
  "Hip flexor + hamstring mobility",
  "Foam roll quads, back, calves",
  "Deep breathing / box breathing 5 min",
];

export const EQUIPMENT = [
  { name: "Exercise Mat", icon: "square" },
  { name: "Skipping Rope", icon: "activity" },
  { name: "Ab Wheel", icon: "circle" },
  { name: "Mini Stepper + Resistance Bands", icon: "trending-up" },
  { name: "Running Shoes", icon: "footprints" },
];
