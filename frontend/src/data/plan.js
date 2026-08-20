// Home Shred — 5-day workout plan
// Day index matches JS Date.getDay(): 0=Sun ... 6=Sat

const IMG = {
  push: "https://images.unsplash.com/photo-1765302755287-e3288ea8fbcb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwdXNodXAlMjBtYXQlMjBkYXJrfGVufDB8fHx8MTc4NjU2NjUyOXww&ixlib=rb-4.1.0&q=85",
  pull: "https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxyZXNpc3RhbmNlJTIwYmFuZCUyMHdvcmtvdXQlMjBkYXJrfGVufDB8fHx8MTc4NjU2NjUyOXww&ixlib=rb-4.1.0&q=85",
  legs: "https://images.unsplash.com/photo-1633671856163-34f97909b715?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxza2lwcGluZyUyMHJvcGUlMjB3b3Jrb3V0JTIwZGFya3xlbnwwfHx8fDE3ODY1NjY1Mjl8MA&ixlib=rb-4.1.0&q=85",
  cardio: "https://images.unsplash.com/photo-1633671856163-34f97909b715?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxza2lwcGluZyUyMHJvcGUlMjB3b3Jrb3V0JTIwZGFya3xlbnwwfHx8fDE3ODY1NjY1Mjl8MA&ixlib=rb-4.1.0&q=85",
  fullbody: "https://images.unsplash.com/photo-1765302755287-e3288ea8fbcb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwdXNodXAlMjBtYXQlMjBkYXJrfGVufDB8fHx8MTc4NjU2NjUyOXww&ixlib=rb-4.1.0&q=85",
};

// Base plan — always available. Each exercise has equipmentIds: [] required to be owned.
// [] = pure bodyweight (never hidden).
export const PLAN = {
  1: {
    id: "mon", dayName: "Monday", short: "M", focus: "PUSH + CORE",
    subtitle: "Chest • Shoulders • Triceps", isRestDay: false, image: IMG.push,
    blocks: [
      { title: "Push", exercises: [
        { id: "mon-1", name: "Push-Ups", type: "strength", sets: 3, repRange: "12–15", equipment: "Mat", equipmentIds: [] },
        { id: "mon-2", name: "Decline Push-Ups", type: "strength", sets: 3, repRange: "10–12", equipment: "Stepper", equipmentIds: ["stepper"] },
        { id: "mon-3", name: "Diamond Push-Ups", type: "strength", sets: 3, repRange: "10–12", equipment: "Mat", equipmentIds: [] },
        { id: "mon-4", name: "Pike Push-Ups", type: "strength", sets: 3, repRange: "8–12", equipment: "Mat", equipmentIds: [] },
        { id: "mon-5", name: "Band Front Raise", type: "band", sets: 3, repRange: "12–15", equipment: "Band", equipmentIds: ["bands"] },
      ]},
      { title: "Core", exercises: [
        { id: "mon-6", name: "Ab Wheel Rollout", type: "strength", sets: 3, repRange: "8–12", equipment: "Ab Wheel", equipmentIds: ["ab-wheel"] },
        { id: "mon-7", name: "Plank", type: "timed", sets: 3, duration: "45–60s", equipment: "Mat", equipmentIds: [] },
      ]},
    ],
  },
  2: {
    id: "tue", dayName: "Tuesday", short: "T", focus: "PULL + CORE",
    subtitle: "Back • Biceps (Band)", isRestDay: false, image: IMG.pull,
    blocks: [
      { title: "Pull", exercises: [
        { id: "tue-1", name: "Band Bent-Over Row", type: "band", sets: 3, repRange: "12–15", equipment: "Band", equipmentIds: ["bands"] },
        { id: "tue-2", name: "Band Straight-Arm Pulldown", type: "band", sets: 3, repRange: "12–15", equipment: "Band", equipmentIds: ["bands"] },
        { id: "tue-3", name: "Band Bicep Curl", type: "band", sets: 3, repRange: "12–15", equipment: "Band", equipmentIds: ["bands"] },
        { id: "tue-4", name: "Superman Hold", type: "strength", sets: 3, repRange: "12 (2s squeeze)", equipment: "Mat", equipmentIds: [] },
        { id: "tue-5", name: "Reverse Snow Angels", type: "strength", sets: 3, repRange: "12", equipment: "Mat", equipmentIds: [] },
      ]},
      { title: "Core", exercises: [
        { id: "tue-6", name: "Ab Wheel Rollout", type: "strength", sets: 3, repRange: "8–10", equipment: "Ab Wheel", equipmentIds: ["ab-wheel"] },
        { id: "tue-7", name: "Side Plank (each side)", type: "timed", sets: 3, duration: "30–45s", equipment: "Mat", equipmentIds: [] },
      ]},
    ],
  },
  3: { id: "wed", dayName: "Wednesday", short: "W", focus: "REST / MOBILITY", subtitle: "Recovery Day", isRestDay: true, image: null, blocks: [] },
  4: {
    id: "thu", dayName: "Thursday", short: "T", focus: "LEGS + GLUTES",
    subtitle: "Band • Bodyweight", isRestDay: false, image: IMG.legs,
    blocks: [
      { title: "Warm-up", exercises: [
        { id: "thu-1", name: "Mini Stepper Intervals", type: "cardio", single: true, duration: "10 min", equipment: "Stepper", equipmentIds: ["stepper"] },
      ]},
      { title: "Legs", exercises: [
        { id: "thu-2", name: "Band Squats", type: "band", sets: 3, repRange: "15", equipment: "Band", equipmentIds: ["bands"] },
        { id: "thu-3", name: "Reverse Lunges (per leg)", type: "strength", sets: 3, repRange: "12", equipment: "Mat", equipmentIds: [] },
        { id: "thu-4", name: "Band Glute Kickbacks (per leg)", type: "band", sets: 3, repRange: "15", equipment: "Band", equipmentIds: ["bands"] },
        { id: "thu-5", name: "Single-Leg Glute Bridge (per leg)", type: "strength", sets: 3, repRange: "12", equipment: "Mat", equipmentIds: [] },
        { id: "thu-6", name: "Wall Sit", type: "timed", sets: 3, duration: "45–60s", equipment: "None", equipmentIds: [] },
      ]},
      { title: "Core", exercises: [
        { id: "thu-7", name: "Lying Leg Raises", type: "strength", sets: 3, repRange: "15", equipment: "Mat", equipmentIds: [] },
      ]},
    ],
  },
  5: {
    id: "fri", dayName: "Friday", short: "F", focus: "CARDIO HIIT + ABS",
    subtitle: "Rope • Run • Core", isRestDay: false, image: IMG.cardio,
    blocks: [
      { title: "HIIT", exercises: [
        { id: "fri-1", name: "Jump Rope (5 × 1min / 30s rest)", type: "cardio", single: true, duration: "≈ 8 min", equipment: "Rope", equipmentIds: ["rope"] },
        { id: "fri-2", name: "Burpees", type: "strength", sets: 3, repRange: "12", equipment: "Mat", equipmentIds: [] },
        { id: "fri-3", name: "Mountain Climbers", type: "timed", sets: 3, duration: "30s", equipment: "Mat", equipmentIds: [] },
        { id: "fri-4", name: "Run (moderate)", type: "cardio", single: true, duration: "15–20 min", equipment: "Shoes", equipmentIds: ["shoes"] },
      ]},
      { title: "Abs", exercises: [
        { id: "fri-5", name: "Bicycle Crunches", type: "strength", sets: 3, repRange: "20 each", equipment: "Mat", equipmentIds: [] },
        { id: "fri-6", name: "Leg Raises", type: "strength", sets: 3, repRange: "12–15", equipment: "Mat", equipmentIds: [] },
      ]},
    ],
  },
  6: {
    id: "sat", dayName: "Saturday", short: "S", focus: "FULL BODY CIRCUIT",
    subtitle: "3–4 rounds • Minimal rest", isRestDay: false, image: IMG.fullbody,
    blocks: [
      { title: "Circuit", exercises: [
        { id: "sat-1", name: "Push-Ups", type: "strength", sets: 3, repRange: "15", equipment: "Mat", equipmentIds: [] },
        { id: "sat-2", name: "Band Rows", type: "band", sets: 3, repRange: "15", equipment: "Band", equipmentIds: ["bands"] },
        { id: "sat-3", name: "Band Squats", type: "band", sets: 3, repRange: "15", equipment: "Band", equipmentIds: ["bands"] },
        { id: "sat-4", name: "Mountain Climbers", type: "timed", sets: 3, duration: "30s", equipment: "Mat", equipmentIds: [] },
        { id: "sat-5", name: "Ab Wheel Rollout", type: "strength", sets: 3, repRange: "10", equipment: "Ab Wheel", equipmentIds: ["ab-wheel"] },
        { id: "sat-6", name: "Jump Rope", type: "timed", sets: 3, duration: "60s", equipment: "Rope", equipmentIds: ["rope"] },
      ]},
      { title: "Finisher", exercises: [
        { id: "sat-7", name: "Plank", type: "timed", sets: 1, duration: "60s", equipment: "Mat", equipmentIds: [] },
      ]},
    ],
  },
  0: { id: "sun", dayName: "Sunday", short: "S", focus: "REST / MOBILITY", subtitle: "Recovery Day", isRestDay: true, image: null, blocks: [] },
};

// Add-on exercises — merged into the matching block when ALL their equipmentIds are owned.
// Block title must match an existing block on that day (otherwise a new block is created).
export const ADDON_EXERCISES = {
  1: [ // Monday — Push + Core
    { id: "mon-a1", name: "Dumbbell Bench Press", type: "strength", sets: 3, repRange: "8–12", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Push" },
    { id: "mon-a2", name: "Dumbbell Shoulder Press", type: "strength", sets: 3, repRange: "8–12", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Push" },
    { id: "mon-a3", name: "Bench Dips", type: "strength", sets: 3, repRange: "10–15", equipment: "Bench", equipmentIds: ["bench"], block: "Push" },
    { id: "mon-a4", name: "Med Ball Push-Ups", type: "strength", sets: 3, repRange: "8–10", equipment: "Med Ball", equipmentIds: ["medicine-ball"], block: "Push" },
    { id: "mon-a5", name: "Med Ball Slams", type: "strength", sets: 3, repRange: "15", equipment: "Med Ball", equipmentIds: ["medicine-ball"], block: "Core" },
  ],
  2: [ // Tuesday — Pull + Core
    { id: "tue-a1", name: "Pull-Ups", type: "strength", sets: 3, repRange: "6–10", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Pull" },
    { id: "tue-a2", name: "Chin-Ups", type: "strength", sets: 3, repRange: "6–10", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Pull" },
    { id: "tue-a3", name: "Dumbbell Rows", type: "strength", sets: 3, repRange: "10–12", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Pull" },
    { id: "tue-a4", name: "Dumbbell Bicep Curls", type: "strength", sets: 3, repRange: "10–12", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Pull" },
    { id: "tue-a5", name: "TRX Rows", type: "strength", sets: 3, repRange: "10–12", equipment: "TRX", equipmentIds: ["trx"], block: "Pull" },
  ],
  4: [ // Thursday — Legs + Glutes
    { id: "thu-a1", name: "Kettlebell Swings", type: "strength", sets: 3, repRange: "15–20", equipment: "Kettlebell", equipmentIds: ["kettlebell"], block: "Legs" },
    { id: "thu-a2", name: "Goblet Squats", type: "strength", sets: 3, repRange: "10–15", equipment: "Kettlebell", equipmentIds: ["kettlebell"], block: "Legs" },
    { id: "thu-a3", name: "Dumbbell Lunges", type: "strength", sets: 3, repRange: "10 per leg", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Legs" },
    { id: "thu-a4", name: "Dumbbell Romanian Deadlift", type: "strength", sets: 3, repRange: "10–12", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Legs" },
    { id: "thu-a5", name: "Bulgarian Split Squats (per leg)", type: "strength", sets: 3, repRange: "10", equipment: "Bench", equipmentIds: ["bench"], block: "Legs" },
  ],
  5: [ // Friday — HIIT + Abs
    { id: "fri-a1", name: "Dumbbell Thrusters", type: "strength", sets: 3, repRange: "12", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "HIIT" },
    { id: "fri-a2", name: "Kettlebell Snatch (alternating)", type: "strength", sets: 3, repRange: "10 per side", equipment: "Kettlebell", equipmentIds: ["kettlebell"], block: "HIIT" },
    { id: "fri-a3", name: "Med Ball Russian Twists", type: "strength", sets: 3, repRange: "20", equipment: "Med Ball", equipmentIds: ["medicine-ball"], block: "Abs" },
  ],
  6: [ // Saturday — Full Body Circuit
    { id: "sat-a1", name: "Kettlebell Circuit", type: "timed", sets: 3, duration: "60s", equipment: "Kettlebell", equipmentIds: ["kettlebell"], block: "Circuit" },
    { id: "sat-a2", name: "Dumbbell Complex", type: "strength", sets: 3, repRange: "10", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Circuit" },
    { id: "sat-a3", name: "Pull-Ups", type: "strength", sets: 3, repRange: "8", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Circuit" },
    { id: "sat-a4", name: "TRX Row + Push-Up", type: "strength", sets: 3, repRange: "12", equipment: "TRX", equipmentIds: ["trx"], block: "Circuit" },
  ],
};

// Full equipment catalog — every preset that unlocks add-on exercises + comfort items
export const EQUIPMENT_CATALOG = [
  { id: "mat", name: "Exercise Mat", icon: "square", builtin: true, blurb: "Comfort for floor work" },
  { id: "rope", name: "Skipping Rope", icon: "activity", blurb: "Jump rope conditioning" },
  { id: "ab-wheel", name: "Ab Wheel", icon: "circle", blurb: "Ab rollouts" },
  { id: "stepper", name: "Mini Stepper", icon: "trending-up", blurb: "Cardio + lower body" },
  { id: "bands", name: "Resistance Bands", icon: "waves", blurb: "Pull, push and glute work" },
  { id: "shoes", name: "Running Shoes", icon: "footprints", blurb: "Outdoor runs" },
  { id: "dumbbells", name: "Dumbbells", icon: "dumbbell", blurb: "Unlocks press, row, curl, lunge" },
  { id: "kettlebell", name: "Kettlebell", icon: "anchor", blurb: "Unlocks swings + goblet squats" },
  { id: "pullup-bar", name: "Pull-Up Bar", icon: "minus", blurb: "Unlocks pull-ups and chin-ups" },
  { id: "bench", name: "Bench", icon: "rectangle-horizontal", blurb: "Unlocks dips + split squats" },
  { id: "trx", name: "TRX Straps", icon: "link", blurb: "Unlocks suspension rows" },
  { id: "medicine-ball", name: "Medicine Ball", icon: "circle-dot", blurb: "Unlocks slams + twists" },
  { id: "foam-roller", name: "Foam Roller", icon: "cylinder", blurb: "Recovery day mobility" },
];

// Default equipment IDs the user starts with (matches the original app's assumed setup)
export const DEFAULT_EQUIPMENT_IDS = ["mat", "rope", "ab-wheel", "stepper", "bands", "shoes"];

// Ordered Monday-first list for the Week strip
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

export const REST_SUGGESTIONS = [
  "Light 20-min walk outside",
  "Full-body stretch (10 min)",
  "Hip flexor + hamstring mobility",
  "Foam roll quads, back, calves",
  "Deep breathing / box breathing 5 min",
];
