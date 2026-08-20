import { useState } from "react";
import { EQUIPMENT_CATALOG } from "@/data/plan";
import {
  loadEquipment,
  addEquipment,
  removeEquipment,
  addCustomEquipment,
  getEquipmentMeta,
} from "@/lib/equipment";
import { clearAllData, loadSettings, saveSettings } from "@/lib/storage";
import {
  Moon, Sun, AlertTriangle, HardDrive, Wifi, Dumbbell, Circle, Square, TrendingUp,
  Footprints, Activity, Trash2, Plus, X, Waves, Anchor, Minus, Link as LinkIcon,
  CircleDot, Cylinder, Box, RectangleHorizontal,
} from "lucide-react";
import { toast } from "sonner";

const ICON_MAP = {
  square: Square,
  activity: Activity,
  circle: Circle,
  "trending-up": TrendingUp,
  footprints: Footprints,
  dumbbell: Dumbbell,
  waves: Waves,
  anchor: Anchor,
  minus: Minus,
  link: LinkIcon,
  "circle-dot": CircleDot,
  cylinder: Cylinder,
  box: Box,
  "rectangle-horizontal": RectangleHorizontal,
};

const iconFor = (name) => ICON_MAP[name] || Dumbbell;

export default function Settings({ onReset, restSeconds, setRestSeconds, isDark, setIsDark, onTick }) {
  const [settings, setSettings] = useState(loadSettings());
  const [equipment, setEquipment] = useState(loadEquipment());
  const [addOpen, setAddOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [confirming, setConfirming] = useState(false);

  const notifyOthers = () => {
    if (typeof onTick === "function") onTick();
  };

  const toggleDark = () => {
    const next = { ...settings, darkMode: !settings.darkMode };
    setSettings(next);
    saveSettings(next);
    setIsDark(next.darkMode);
    toast(next.darkMode ? "Dark mode on" : "Light mode on");
  };

  const changeRest = (v) => {
    const val = Math.max(15, Math.min(300, Number(v) || 60));
    setRestSeconds(val);
    const next = { ...settings, restSeconds: val };
    setSettings(next);
    saveSettings(next);
  };

  const doReset = () => {
    clearAllData();
    setConfirming(false);
    setEquipment(loadEquipment());
    onReset();
    toast.success("All workout data cleared");
  };

  const handleAdd = (id, name) => {
    setEquipment(addEquipment(id));
    toast.success(`${name} added`);
    notifyOthers();
  };

  const handleRemove = (id, name) => {
    setEquipment(removeEquipment(id));
    toast(`${name} removed`);
    notifyOthers();
  };

  const handleAddCustom = () => {
    const trimmed = customName.trim();
    if (!trimmed) return;
    setEquipment(addCustomEquipment(trimmed));
    setCustomName("");
    toast.success(`${trimmed} added`);
    notifyOthers();
  };

  const ownedIds = new Set(equipment.owned);
  const catalogUnowned = EQUIPMENT_CATALOG.filter((e) => !ownedIds.has(e.id));

  return (
    <div data-testid="settings-screen" className="pb-28 relative z-10">
      <div className="px-4 pt-8">
        <div className="text-[#FF4500] text-xs uppercase tracking-[0.3em] font-semibold">You</div>
        <h1 className="font-display text-5xl sm:text-6xl uppercase text-white leading-[0.9] mt-1">Settings</h1>
      </div>

      {/* Appearance */}
      <section className="px-4 mt-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Appearance</div>
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
          <button data-testid="dark-mode-toggle" onClick={toggleDark} className="w-full flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF4500]/15 flex items-center justify-center">
                {settings.darkMode ? <Moon size={16} className="text-[#FF4500]" /> : <Sun size={16} className="text-[#FF4500]" />}
              </div>
              <div className="text-left">
                <div className="text-white text-sm font-medium">Dark Mode</div>
                <div className="text-neutral-500 text-xs mt-0.5">Optimised for gym lighting</div>
              </div>
            </div>
            <span className={`w-11 h-6 rounded-full relative ${settings.darkMode ? "bg-[#FF4500]" : "bg-neutral-700"}`} style={{ transition: "background-color 200ms ease" }}>
              <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow" style={{ left: settings.darkMode ? "22px" : "2px", transition: "left 200ms ease" }} />
            </span>
          </button>
        </div>
      </section>

      {/* Rest timer default */}
      <section className="px-4 mt-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Rest Timer Default</div>
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-white text-sm font-medium">Between-set countdown</div>
            <div className="text-neutral-500 text-xs mt-0.5">Adjust default rest duration</div>
          </div>
          <div className="flex items-center gap-2">
            <button data-testid="rest-default-minus" onClick={() => changeRest(restSeconds - 15)} className="w-8 h-8 rounded-md bg-[#1A1A1A] border border-[#262626] text-white">−</button>
            <div className="font-display text-2xl text-white w-14 text-center" data-testid="rest-default-value">{restSeconds}s</div>
            <button data-testid="rest-default-plus" onClick={() => changeRest(restSeconds + 15)} className="w-8 h-8 rounded-md bg-[#1A1A1A] border border-[#262626] text-white">+</button>
          </div>
        </div>
      </section>

      {/* App info */}
      <section className="px-4 mt-6">
        <div className="bg-gradient-to-br from-[#150800] to-[#0F0F0F] border border-[#FF4500]/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF4500, #DC2626)" }}>
              <Dumbbell size={22} className="text-white" strokeWidth={2.4} />
            </div>
            <div>
              <div className="font-display text-3xl uppercase text-white leading-none">Home Shred</div>
              <div className="text-neutral-400 text-xs mt-1">5-Day Home Split — Bodyweight + Bands</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="flex items-center gap-2 text-neutral-300 text-xs"><HardDrive size={14} className="text-[#FF4500]" /> Saved on device</div>
            <div className="flex items-center gap-2 text-neutral-300 text-xs"><Wifi size={14} className="text-[#FF4500]" /> Works fully offline</div>
          </div>
        </div>
      </section>

      {/* Install to home screen */}
      <section className="px-4 mt-6" data-testid="install-hint">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Install On Phone</div>
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-4 text-sm text-neutral-300 space-y-2">
          <p><span className="text-[#FF4500] font-semibold">iPhone (Safari):</span> tap the Share icon → <span className="text-white font-medium">Add to Home Screen</span>.</p>
          <p><span className="text-[#FF4500] font-semibold">Android (Chrome):</span> tap the three-dot menu → <span className="text-white font-medium">Install app</span>.</p>
          <p className="text-neutral-500 text-xs">Once installed, Home Shred opens without internet — all data stays on your device.</p>
        </div>
      </section>

      {/* Equipment — editable */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Equipment</div>
          <button
            data-testid="add-equipment-btn"
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold text-white"
            style={{ background: "linear-gradient(90deg, #FF4500, #DC2626)" }}
          >
            <Plus size={12} /> Add
          </button>
        </div>
        <div data-testid="equipment-list" className="bg-[#111111] border border-[#1F1F1F] rounded-2xl divide-y divide-[#1A1A1A]">
          {equipment.owned.length === 0 && (
            <div className="px-4 py-6 text-center text-neutral-500 text-sm">
              No equipment yet — add something to unlock exercises.
            </div>
          )}
          {equipment.owned.map((id) => {
            const meta = getEquipmentMeta(id);
            const Icon = iconFor(meta.icon);
            return (
              <div key={id} data-testid={`equipment-row-${id}`} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-md bg-[#1A1A1A] flex items-center justify-center">
                  <Icon size={14} className="text-[#FF4500]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{meta.name}</div>
                  {meta.blurb && <div className="text-neutral-500 text-[11px] truncate">{meta.blurb}</div>}
                </div>
                <button
                  data-testid={`remove-equipment-${id}`}
                  onClick={() => handleRemove(id, meta.name)}
                  className="shrink-0 w-8 h-8 rounded-md text-neutral-500 hover:text-red-400 hover:bg-red-950/30 flex items-center justify-center"
                  style={{ transition: "color 150ms ease, background-color 150ms ease" }}
                  aria-label={`Remove ${meta.name}`}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Danger */}
      <section className="px-4 mt-8">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={14} className="text-red-500" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold">Danger Zone</span>
        </div>
        <div className="bg-[#150606] border border-red-900/50 rounded-2xl p-4">
          <div className="text-neutral-300 text-sm mb-3">Wipe every logged set, session, and streak from this device. Cannot be undone.</div>
          {!confirming ? (
            <button
              data-testid="reset-data-button"
              onClick={() => setConfirming(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-red-800 text-red-400 text-sm font-semibold uppercase tracking-wider hover:bg-red-950/30"
              style={{ transition: "background-color 150ms ease" }}
            >
              <Trash2 size={14} /> Reset All App Data
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2" data-testid="reset-confirm">
              <button data-testid="reset-cancel" onClick={() => setConfirming(false)} className="py-3 rounded-lg bg-[#1A1A1A] border border-[#262626] text-neutral-300 text-sm font-semibold">Cancel</button>
              <button data-testid="reset-confirm-yes" onClick={doReset} className="py-3 rounded-lg bg-red-600 text-white text-sm font-bold uppercase tracking-wider" style={{ transition: "background-color 150ms ease" }}>Confirm</button>
            </div>
          )}
        </div>
      </section>

      {/* Add Equipment sheet */}
      {addOpen && (
        <AddEquipmentSheet
          catalog={catalogUnowned}
          onClose={() => setAddOpen(false)}
          onAdd={handleAdd}
          onAddCustom={handleAddCustom}
          customName={customName}
          setCustomName={setCustomName}
        />
      )}
    </div>
  );
}

function AddEquipmentSheet({ catalog, onClose, onAdd, onAddCustom, customName, setCustomName }) {
  return (
    <div
      data-testid="add-equipment-sheet"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0F0F0F] border border-[#262626] rounded-2xl p-5 relative max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          data-testid="add-equipment-close"
          onClick={onClose}
          className="absolute right-3 top-3 text-neutral-500 hover:text-white p-1"
        >
          <X size={18} />
        </button>
        <div className="flex items-center gap-2 text-[#FF4500] mb-3">
          <Plus size={16} />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold">Add Equipment</span>
        </div>
        <div className="font-display text-3xl uppercase text-white mb-4">Build Your Kit</div>

        {catalog.length === 0 ? (
          <p className="text-neutral-500 text-sm mb-4">All preset items already added.</p>
        ) : (
          <div className="space-y-2 mb-5">
            {catalog.map((eq) => {
              const Icon = iconFor(eq.icon);
              return (
                <button
                  key={eq.id}
                  data-testid={`add-catalog-${eq.id}`}
                  onClick={() => onAdd(eq.id, eq.name)}
                  className="w-full flex items-center gap-3 bg-[#151515] border border-[#262626] rounded-xl px-3 py-3 hover:border-[#FF4500]/50 hover:bg-[#1A1A1A] text-left"
                  style={{ transition: "border-color 150ms ease, background-color 150ms ease" }}
                >
                  <div className="w-9 h-9 rounded-md bg-[#0A0A0A] flex items-center justify-center">
                    <Icon size={16} className="text-[#FF4500]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium">{eq.name}</div>
                    {eq.blurb && <div className="text-neutral-500 text-[11px] truncate">{eq.blurb}</div>}
                  </div>
                  <Plus size={16} className="text-[#FF4500] shrink-0" />
                </button>
              );
            })}
          </div>
        )}

        <div className="border-t border-[#262626] pt-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Custom</div>
          <div className="flex items-center gap-2">
            <input
              data-testid="custom-equipment-input"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onAddCustom();
              }}
              placeholder="e.g. Sandbag"
              className="flex-1 min-w-0 bg-black border border-[#262626] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF4500]"
              style={{ transition: "border-color 150ms ease" }}
            />
            <button
              data-testid="custom-equipment-add"
              onClick={onAddCustom}
              disabled={!customName.trim()}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white ${customName.trim() ? "" : "opacity-40"}`}
              style={{ background: "linear-gradient(90deg, #FF4500, #DC2626)" }}
            >
              Add
            </button>
          </div>
          <p className="text-neutral-500 text-[11px] mt-2">Custom items show in your kit list but don't unlock preset exercises.</p>
        </div>
      </div>
    </div>
  );
}
