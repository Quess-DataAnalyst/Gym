// Home Shred — 5-day gym split
// Day index matches JS Date.getDay(): 0=Sun ... 6=Sat

const IMG = {
  chest: "https://images.unsplash.com/photo-1765302755287-e3288ea8fbcb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwdXNodXAlMjBtYXQlMjBkYXJrfGVufDB8fHx8MTc4NjU2NjUyOXww&ixlib=rb-4.1.0&q=85",
  back: "https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxyZXNpc3RhbmNlJTIwYmFuZCUyMHdvcmtvdXQlMjBkYXJrfGVufDB8fHx8MTc4NjU2NjUyOXww&ixlib=rb-4.1.0&q=85",
  legs: "https://images.unsplash.com/photo-1633671856163-34f97909b715?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxza2lwcGluZyUyMHJvcGUlMjB3b3Jrb3V0JTIwZGFya3xlbnwwfHx8fDE3ODY1NjY1Mjl8MA&ixlib=rb-4.1.0&q=85",
};

// Base plan — 5-day gym split (Mon–Fri). Sat + Sun rest.
// Each exercise has equipmentIds — [] = bodyweight fallback, always visible.
export const PLAN = {
  1: {
    id: "mon", dayName: "Monday", short: "M", focus: "CHEST + TRICEPS",
    subtitle: "Bench • Fly • Push-Down", isRestDay: false, image: IMG.chest,
    blocks: [
      { title: "Chest + Triceps", exercises: [
        { id: "mon-1", name: "Push-Ups", type: "strength", sets: 3, repRange: "12–15", equipment: "Bodyweight", equipmentIds: [] },
        { id: "mon-2", name: "Diamond Push-Ups", type: "strength", sets: 3, repRange: "10–12", equipment: "Bodyweight", equipmentIds: [] },
      ]},
    ],
  },
  2: {
    id: "tue", dayName: "Tuesday", short: "T", focus: "BACK + BICEPS",
    subtitle: "Row • Pulldown • Curl", isRestDay: false, image: IMG.back,
    blocks: [
      { title: "Back + Biceps", exercises: [
        { id: "tue-1", name: "Superman Hold", type: "strength", sets: 3, repRange: "12 (2s squeeze)", equipment: "Bodyweight", equipmentIds: [] },
        { id: "tue-2", name: "Reverse Snow Angels", type: "strength", sets: 3, repRange: "12", equipment: "Bodyweight", equipmentIds: [] },
      ]},
    ],
  },
  3: {
    id: "wed", dayName: "Wednesday", short: "W", focus: "SHOULDERS + LEGS + CORE",
    subtitle: "Press • Squat • Core", isRestDay: false, image: IMG.legs,
    blocks: [
      { title: "Shoulders", exercises: [
        { id: "wed-1", name: "Pike Push-Ups", type: "strength", sets: 3, repRange: "8–12", equipment: "Bodyweight", equipmentIds: [] },
      ]},
      { title: "Legs", exercises: [
        { id: "wed-2", name: "Bodyweight Squats", type: "strength", sets: 3, repRange: "15", equipment: "Bodyweight", equipmentIds: [] },
        { id: "wed-3", name: "Reverse Lunges (per leg)", type: "strength", sets: 3, repRange: "12", equipment: "Bodyweight", equipmentIds: [] },
        { id: "wed-4", name: "Wall Sit", type: "timed", sets: 3, duration: "45–60s", equipment: "Bodyweight", equipmentIds: [] },
      ]},
      { title: "Core", exercises: [
        { id: "wed-5", name: "Plank", type: "timed", sets: 3, duration: "1 min", equipment: "Mat", equipmentIds: [] },
        { id: "wed-6", name: "Jumping Jacks", type: "strength", sets: 3, repRange: "100", equipment: "Bodyweight", equipmentIds: [] },
      ]},
    ],
  },
  4: {
    id: "thu", dayName: "Thursday", short: "T", focus: "CHEST + TRICEPS",
    subtitle: "Incline • Fly • Cable", isRestDay: false, image: IMG.chest,
    blocks: [
      { title: "Chest + Triceps", exercises: [
        { id: "thu-1", name: "Diamond Push-Ups", type: "strength", sets: 3, repRange: "10–12", equipment: "Bodyweight", equipmentIds: [] },
        { id: "thu-2", name: "Decline Push-Ups", type: "strength", sets: 3, repRange: "10–12", equipment: "Bodyweight", equipmentIds: [] },
      ]},
    ],
  },
  5: {
    id: "fri", dayName: "Friday", short: "F", focus: "BACK + BICEPS",
    subtitle: "Deadlift • Pulldown • Curl", isRestDay: false, image: IMG.back,
    blocks: [
      { title: "Back + Biceps", exercises: [
        { id: "fri-1", name: "Superman Hold", type: "strength", sets: 3, repRange: "12 (2s squeeze)", equipment: "Bodyweight", equipmentIds: [] },
        { id: "fri-2", name: "Reverse Snow Angels", type: "strength", sets: 3, repRange: "12", equipment: "Bodyweight", equipmentIds: [] },
      ]},
    ],
  },
  6: { id: "sat", dayName: "Saturday", short: "S", focus: "REST / MOBILITY", subtitle: "Recovery Day", isRestDay: true, image: null, blocks: [] },
  0: { id: "sun", dayName: "Sunday", short: "S", focus: "REST / MOBILITY", subtitle: "Recovery Day", isRestDay: true, image: null, blocks: [] },
};

// Add-on exercises — merge into their target block when ALL equipmentIds are owned.
export const ADDON_EXERCISES = {
  1: [ // Monday — Chest + Triceps
    { id: "mon-a1", name: "Pull-Ups (30 reps)", type: "cardio", single: true, duration: "30 reps", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Chest + Triceps" },
    { id: "mon-a2", name: "Flat Barbell Bench Press", type: "strength", sets: 3, repRange: "10–15", equipment: "Barbell + Bench", equipmentIds: ["barbell", "adj-bench"], block: "Chest + Triceps" },
    { id: "mon-a3", name: "Incline Barbell Bench Press", type: "strength", sets: 3, repRange: "10–15", equipment: "Barbell + Incline Bench", equipmentIds: ["barbell", "adj-bench"], block: "Chest + Triceps" },
    { id: "mon-a4", name: "Chest Fly Machine", type: "strength", sets: 3, repRange: "15", equipment: "Chest Fly Machine", equipmentIds: ["chest-fly"], block: "Chest + Triceps" },
    { id: "mon-a5", name: "Chest Dips (lean forward)", type: "strength", sets: 3, repRange: "to failure", equipment: "Dip Station", equipmentIds: ["dip-station"], block: "Chest + Triceps" },
    { id: "mon-a6", name: "Double-Arm Push-Down (metal bar)", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable Machine", equipmentIds: ["cable-machine"], block: "Chest + Triceps" },
    { id: "mon-a7", name: "Overhead Cable Push", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable + Rope", equipmentIds: ["cable-machine"], block: "Chest + Triceps" },
    { id: "mon-a8", name: "Single-Arm Push-Down", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable + Handle", equipmentIds: ["cable-machine"], block: "Chest + Triceps" },
    { id: "mon-a9", name: "Incline Treadmill Walk", type: "cardio", single: true, duration: "15 min @ 3.5mph", equipment: "Treadmill", equipmentIds: ["treadmill"], block: "Cardio" },
  ],
  2: [ // Tuesday — Back + Biceps
    { id: "tue-a1", name: "Pull-Ups (50 reps)", type: "cardio", single: true, duration: "50 reps", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Back + Biceps" },
    { id: "tue-a2", name: "Machine Rows", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable Machine", equipmentIds: ["cable-machine"], block: "Back + Biceps" },
    { id: "tue-a3", name: "Lat Pull-Down (wide)", type: "strength", sets: 3, repRange: "10–15", equipment: "Lat Pulldown", equipmentIds: ["lat-pulldown"], block: "Back + Biceps" },
    { id: "tue-a4", name: "Lat Pull-Down (narrow)", type: "strength", sets: 3, repRange: "10–15", equipment: "Lat Pulldown", equipmentIds: ["lat-pulldown"], block: "Back + Biceps" },
    { id: "tue-a5", name: "Chest-Supported Rows", type: "strength", sets: 3, repRange: "15", equipment: "Cable Machine", equipmentIds: ["cable-machine"], block: "Back + Biceps" },
    { id: "tue-a6", name: "Trap Shrugs", type: "strength", sets: 3, repRange: "10–15", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Back + Biceps" },
    { id: "tue-a7", name: "Face Pulls", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable + Rope", equipmentIds: ["cable-machine"], block: "Back + Biceps" },
    { id: "tue-a8", name: "Barbell Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "Barbell", equipmentIds: ["barbell"], block: "Back + Biceps" },
    { id: "tue-a9", name: "Dumbbell Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Back + Biceps" },
    { id: "tue-a10", name: "Incline Seated Dumbbell Curl", type: "strength", sets: 3, repRange: "10–15", equipment: "DB + Incline Bench", equipmentIds: ["dumbbells", "adj-bench"], block: "Back + Biceps" },
    { id: "tue-a11", name: "Hammer Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Back + Biceps" },
    { id: "tue-a12", name: "Concentration Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "DB + Bench", equipmentIds: ["dumbbells", "adj-bench"], block: "Back + Biceps" },
    { id: "tue-a13", name: "Incline Treadmill Walk", type: "cardio", single: true, duration: "15 min @ 3.5mph", equipment: "Treadmill", equipmentIds: ["treadmill"], block: "Cardio" },
  ],
  3: [ // Wednesday — Shoulders + Legs + Core
    { id: "wed-a1", name: "Pull-Ups (30 reps)", type: "cardio", single: true, duration: "30 reps", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Shoulders" },
    { id: "wed-a2", name: "Shoulder Press", type: "strength", sets: 3, repRange: "10–15", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Shoulders" },
    { id: "wed-a3", name: "Lateral Raises", type: "strength", sets: 3, repRange: "10–15", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Shoulders" },
    { id: "wed-a4", name: "Frontal Raises", type: "strength", sets: 3, repRange: "10–15", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Shoulders" },
    { id: "wed-a5", name: "Shrugs", type: "strength", sets: 3, repRange: "15", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Shoulders" },
    { id: "wed-a6", name: "Face Pulls", type: "strength", sets: 3, repRange: "15", equipment: "Cable + Rope", equipmentIds: ["cable-machine"], block: "Shoulders" },
    { id: "wed-a7", name: "Barbell Squats", type: "strength", sets: 3, repRange: "10–15", equipment: "Barbell + Squat Rack", equipmentIds: ["barbell", "squat-rack"], block: "Legs" },
    { id: "wed-a8", name: "Leg Press", type: "strength", sets: 3, repRange: "10–15", equipment: "Leg Press", equipmentIds: ["leg-press"], block: "Legs" },
    { id: "wed-a9", name: "Hamstring Curl", type: "strength", sets: 3, repRange: "10–15", equipment: "Hamstring Curl", equipmentIds: ["hamstring-curl"], block: "Legs" },
    { id: "wed-a10", name: "Decline Bench Sit-Ups", type: "strength", sets: 3, repRange: "10–15", equipment: "Decline Bench", equipmentIds: ["adj-bench"], block: "Core" },
    { id: "wed-a11", name: "Hanging Leg Raises", type: "strength", sets: 3, repRange: "10–15", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Core" },
    { id: "wed-a12", name: "Cable Crunches", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable + Rope", equipmentIds: ["cable-machine"], block: "Core" },
  ],
  4: [ // Thursday — Chest + Triceps (variant)
    { id: "thu-a1", name: "Pull-Ups (30 reps)", type: "cardio", single: true, duration: "30 reps", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Chest + Triceps" },
    { id: "thu-a2", name: "Incline Dumbbell Bench Press", type: "strength", sets: 3, repRange: "10–15", equipment: "DB + Incline Bench", equipmentIds: ["dumbbells", "adj-bench"], block: "Chest + Triceps" },
    { id: "thu-a3", name: "Chest Fly Machine", type: "strength", sets: 3, repRange: "15", equipment: "Chest Fly Machine", equipmentIds: ["chest-fly"], block: "Chest + Triceps" },
    { id: "thu-a4", name: "Cable Fly (high-to-low)", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable + Dual Handles", equipmentIds: ["cable-machine"], block: "Chest + Triceps" },
    { id: "thu-a5", name: "Chest Dips (lean forward)", type: "strength", sets: 3, repRange: "to failure", equipment: "Dip Station", equipmentIds: ["dip-station"], block: "Chest + Triceps" },
    { id: "thu-a6", name: "Double-Arm Push-Down (metal bar)", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable Machine", equipmentIds: ["cable-machine"], block: "Chest + Triceps" },
    { id: "thu-a7", name: "Overhead Cable Push", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable + Rope", equipmentIds: ["cable-machine"], block: "Chest + Triceps" },
    { id: "thu-a8", name: "Single-Arm Push-Down", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable + Handle", equipmentIds: ["cable-machine"], block: "Chest + Triceps" },
    { id: "thu-a9", name: "Machine Triceps Push-Down", type: "strength", sets: 3, repRange: "10–15", equipment: "Triceps Push-Down Machine", equipmentIds: ["tricep-pushdown"], block: "Chest + Triceps" },
    { id: "thu-a10", name: "Incline Treadmill Walk", type: "cardio", single: true, duration: "15 min @ 3.5mph", equipment: "Treadmill", equipmentIds: ["treadmill"], block: "Cardio" },
  ],
  5: [ // Friday — Back + Biceps (variant)
    { id: "fri-a1", name: "Pull-Ups (50 reps)", type: "cardio", single: true, duration: "50 reps", equipment: "Pull-Up Bar", equipmentIds: ["pullup-bar"], block: "Back + Biceps" },
    { id: "fri-a2", name: "Deadlift", type: "strength", sets: 3, repRange: "10", equipment: "Barbell + Plates", equipmentIds: ["barbell"], block: "Back + Biceps" },
    { id: "fri-a3", name: "Lat Pull-Down (wide)", type: "strength", sets: 3, repRange: "10–15", equipment: "Lat Pulldown", equipmentIds: ["lat-pulldown"], block: "Back + Biceps" },
    { id: "fri-a4", name: "Lat Pull-Down (narrow)", type: "strength", sets: 3, repRange: "10–15", equipment: "Lat Pulldown", equipmentIds: ["lat-pulldown"], block: "Back + Biceps" },
    { id: "fri-a5", name: "Seated Cable Row", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable Machine", equipmentIds: ["cable-machine"], block: "Back + Biceps" },
    { id: "fri-a6", name: "Machine Pullovers", type: "strength", sets: 3, repRange: "15", equipment: "Pullover Machine", equipmentIds: ["pullover"], block: "Back + Biceps" },
    { id: "fri-a7", name: "Preacher Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "Preacher Bench + DB/Barbell", equipmentIds: ["preacher-bench", "dumbbells"], block: "Back + Biceps" },
    { id: "fri-a8", name: "Cable Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "Cable Machine", equipmentIds: ["cable-machine"], block: "Back + Biceps" },
    { id: "fri-a9", name: "Hammer Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "Dumbbells", equipmentIds: ["dumbbells"], block: "Back + Biceps" },
    { id: "fri-a10", name: "Wrist Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "DB + Bench", equipmentIds: ["dumbbells", "adj-bench"], block: "Back + Biceps" },
    { id: "fri-a11", name: "Reverse Wrist Curls", type: "strength", sets: 3, repRange: "10–15", equipment: "DB + Bench", equipmentIds: ["dumbbells", "adj-bench"], block: "Back + Biceps" },
    { id: "fri-a12", name: "Incline Treadmill Walk", type: "cardio", single: true, duration: "15 min @ 3.5mph", equipment: "Treadmill", equipmentIds: ["treadmill"], block: "Cardio" },
  ],
};

// Full equipment catalog — presets that unlock exercises
export const EQUIPMENT_CATALOG = [
  // Home-friendly items
  { id: "mat", name: "Exercise Mat", icon: "square", builtin: true, blurb: "Floor / core work" },
  { id: "rope", name: "Skipping Rope", icon: "activity", blurb: "Jump-rope conditioning" },
  { id: "ab-wheel", name: "Ab Wheel", icon: "circle", blurb: "Ab rollouts" },
  { id: "stepper", name: "Mini Stepper", icon: "trending-up", blurb: "Cardio + lower body" },
  { id: "bands", name: "Resistance Bands", icon: "waves", blurb: "Portable resistance" },
  { id: "shoes", name: "Running Shoes", icon: "footprints", blurb: "Outdoor runs" },
  { id: "kettlebell", name: "Kettlebell", icon: "anchor", blurb: "Swings + goblet squats" },
  { id: "trx", name: "TRX Straps", icon: "link", blurb: "Suspension rows" },
  { id: "medicine-ball", name: "Medicine Ball", icon: "circle-dot", blurb: "Slams + twists" },
  { id: "foam-roller", name: "Foam Roller", icon: "cylinder", blurb: "Recovery mobility" },
  // Full-gym items
  { id: "pullup-bar", name: "Pull-Up Bar", icon: "minus", blurb: "Pull-ups, chin-ups, hanging leg raises" },
  { id: "barbell", name: "Barbell + Plates", icon: "dumbbell", blurb: "Bench, squat, deadlift, curls" },
  { id: "dumbbells", name: "Dumbbells", icon: "dumbbell", blurb: "Press, row, curl, lunge" },
  { id: "adj-bench", name: "Adjustable Bench", icon: "rectangle-horizontal", blurb: "Flat / incline / decline positions" },
  { id: "squat-rack", name: "Squat Rack", icon: "blocks", blurb: "Barbell squats + rack pulls" },
  { id: "cable-machine", name: "Cable Machine", icon: "sliders-horizontal", blurb: "Rows, pushdowns, flies, crunches" },
  { id: "lat-pulldown", name: "Lat Pulldown Machine", icon: "chevrons-down", blurb: "Wide + narrow pulldowns" },
  { id: "chest-fly", name: "Chest Fly Machine", icon: "move-horizontal", blurb: "Pec fly isolation" },
  { id: "dip-station", name: "Dip Station", icon: "grip-vertical", blurb: "Chest + triceps dips" },
  { id: "leg-press", name: "Leg Press Machine", icon: "move-right", blurb: "Heavy leg press" },
  { id: "hamstring-curl", name: "Hamstring Curl Machine", icon: "rotate-cw", blurb: "Seated / lying hamstring curl" },
  { id: "pullover", name: "Pullover Machine", icon: "chevrons-up", blurb: "Lat + serratus pullovers" },
  { id: "tricep-pushdown", name: "Triceps Push-Down Machine", icon: "arrow-down", blurb: "Isolated triceps push-down" },
  { id: "preacher-bench", name: "Preacher Curl Bench", icon: "chevron-up", blurb: "Strict biceps curls" },
  { id: "treadmill", name: "Treadmill", icon: "gauge", blurb: "Incline walks + runs" },
];

// Default owned on first launch (home setup)
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
