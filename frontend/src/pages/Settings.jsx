import { useState } from "react";
import { EQUIPMENT } from "@/data/plan";
import { clearAllData, loadSettings, saveSettings } from "@/lib/storage";
import { Moon, Sun, AlertTriangle, HardDrive, Wifi, Dumbbell, Circle, Square, TrendingUp, Footprints, Activity, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ICONS = {
  square: Square,
  activity: Activity,
  circle: Circle,
  "trending-up": TrendingUp,
  footprints: Footprints,
};

export default function Settings({ onReset, restSeconds, setRestSeconds }) {
  const [settings, setSettings] = useState(loadSettings());
  const [confirming, setConfirming] = useState(false);

  const toggleDark = () => {
    const next = { ...settings, darkMode: !settings.darkMode };
    setSettings(next);
    saveSettings(next);
    toast(next.darkMode ? "Dark mode on" : "Home Shred is dark mode only — kept on");
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
    onReset();
    toast.success("All workout data cleared");
  };

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
          <button
            data-testid="dark-mode-toggle"
            onClick={toggleDark}
            className="w-full flex items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF4500]/15 flex items-center justify-center">
                {settings.darkMode ? <Moon size={16} className="text-[#FF4500]" /> : <Sun size={16} className="text-[#FF4500]" />}
              </div>
              <div className="text-left">
                <div className="text-white text-sm font-medium">Dark Mode</div>
                <div className="text-neutral-500 text-xs mt-0.5">Optimised for gym lighting</div>
              </div>
            </div>
            <span
              className={`w-11 h-6 rounded-full relative ${settings.darkMode ? "bg-[#FF4500]" : "bg-neutral-700"}`}
              style={{ transition: "background-color 200ms ease" }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                style={{ left: settings.darkMode ? "22px" : "2px", transition: "left 200ms ease" }}
              />
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
            <button
              data-testid="rest-default-minus"
              onClick={() => changeRest(restSeconds - 15)}
              className="w-8 h-8 rounded-md bg-[#1A1A1A] border border-[#262626] text-white"
            >
              −
            </button>
            <div className="font-display text-2xl text-white w-14 text-center" data-testid="rest-default-value">
              {restSeconds}s
            </div>
            <button
              data-testid="rest-default-plus"
              onClick={() => changeRest(restSeconds + 15)}
              className="w-8 h-8 rounded-md bg-[#1A1A1A] border border-[#262626] text-white"
            >
              +
            </button>
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
            <div className="flex items-center gap-2 text-neutral-300 text-xs">
              <HardDrive size={14} className="text-[#FF4500]" /> Saved on device
            </div>
            <div className="flex items-center gap-2 text-neutral-300 text-xs">
              <Wifi size={14} className="text-[#FF4500]" /> Works fully offline
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="px-4 mt-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Equipment</div>
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl divide-y divide-[#1A1A1A]">
          {EQUIPMENT.map((e) => {
            const Icon = ICONS[e.icon] || Dumbbell;
            return (
              <div key={e.name} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-md bg-[#1A1A1A] flex items-center justify-center">
                  <Icon size={14} className="text-[#FF4500]" />
                </div>
                <div className="text-white text-sm">{e.name}</div>
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
          <div className="text-neutral-300 text-sm mb-3">
            Wipe every logged set, session, and streak from this device. Cannot be undone.
          </div>
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
              <button
                data-testid="reset-cancel"
                onClick={() => setConfirming(false)}
                className="py-3 rounded-lg bg-[#1A1A1A] border border-[#262626] text-neutral-300 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                data-testid="reset-confirm-yes"
                onClick={doReset}
                className="py-3 rounded-lg bg-red-600 text-white text-sm font-bold uppercase tracking-wider"
                style={{ transition: "background-color 150ms ease" }}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
