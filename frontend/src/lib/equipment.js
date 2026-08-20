// Equipment persistence + plan filtering
import { PLAN, ADDON_EXERCISES, EQUIPMENT_CATALOG, DEFAULT_EQUIPMENT_IDS } from "@/data/plan";

const KEY = "homeshred:equipment";

const safeParse = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// Stored shape: { owned: [ "mat", "bands", ... ], custom: [ { id: "custom-1", name: "Sandbag", icon: "box" }, ... ] }
export const loadEquipment = () => {
  const data = safeParse(localStorage.getItem(KEY), null);
  if (!data) {
    return { owned: [...DEFAULT_EQUIPMENT_IDS], custom: [] };
  }
  return {
    owned: Array.isArray(data.owned) ? data.owned : [...DEFAULT_EQUIPMENT_IDS],
    custom: Array.isArray(data.custom) ? data.custom : [],
  };
};

export const saveEquipment = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const addEquipment = (id) => {
  const data = loadEquipment();
  if (!data.owned.includes(id)) data.owned.push(id);
  saveEquipment(data);
  return data;
};

export const removeEquipment = (id) => {
  const data = loadEquipment();
  data.owned = data.owned.filter((x) => x !== id);
  data.custom = data.custom.filter((x) => x.id !== id);
  saveEquipment(data);
  return data;
};

export const addCustomEquipment = (name) => {
  const data = loadEquipment();
  const trimmed = String(name || "").trim();
  if (!trimmed) return data;
  const id = `custom-${Date.now().toString(36)}`;
  data.custom.push({ id, name: trimmed, icon: "box" });
  data.owned.push(id);
  saveEquipment(data);
  return data;
};

// Merge catalog + custom into a single lookup
export const listAllEquipment = () => {
  const { custom } = loadEquipment();
  return [...EQUIPMENT_CATALOG, ...custom];
};

export const getEquipmentMeta = (id) => {
  const all = listAllEquipment();
  return all.find((e) => e.id === id) || { id, name: id, icon: "box" };
};

// Returns a day object with filtered base exercises + merged add-on exercises based on owned equipment.
export const buildDayPlan = (dayIdx, ownedIds) => {
  const day = PLAN[dayIdx];
  if (!day) return null;
  if (day.isRestDay) return day;

  const owned = new Set(ownedIds);
  const canDo = (ex) => (ex.equipmentIds || []).every((id) => owned.has(id));

  // Filter base blocks
  const baseBlocks = day.blocks
    .map((b) => ({ title: b.title, exercises: b.exercises.filter(canDo) }))
    .filter((b) => b.exercises.length > 0);

  // Merge add-ons into matching blocks (or push a new block)
  const addons = (ADDON_EXERCISES[dayIdx] || []).filter(canDo);
  addons.forEach((ex) => {
    const existing = baseBlocks.find((b) => b.title === ex.block);
    if (existing) existing.exercises.push({ ...ex, isAddon: true });
    else baseBlocks.push({ title: ex.block, exercises: [{ ...ex, isAddon: true }] });
  });

  return { ...day, blocks: baseBlocks };
};

// Convenience for callers that need a plan lookup fn (streak/week/history calculations)
export const makePlanFn = (ownedIds) => (dayIdx) => buildDayPlan(dayIdx, ownedIds);

export const flattenExercises = (day) =>
  (day?.blocks || []).flatMap((b) => b.exercises);
