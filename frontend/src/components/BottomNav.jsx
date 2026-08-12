import { Home, Calendar, Flame, Settings as SettingsIcon } from "lucide-react";

const TABS = [
  { key: "today", label: "Today", icon: Home },
  { key: "week", label: "Week", icon: Calendar },
  { key: "history", label: "History", icon: Flame },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

export default function BottomNav({ current, onChange }) {
  return (
    <nav
      data-testid="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A] border-t border-[#262626]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-md mx-auto grid grid-cols-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = current === tab.key;
          return (
            <button
              key={tab.key}
              data-testid={`nav-${tab.key}`}
              onClick={() => onChange(tab.key)}
              className="relative flex flex-col items-center justify-center gap-1 py-3 focus:outline-none"
              style={{ transition: "color 200ms ease" }}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full"
                  style={{ background: "linear-gradient(90deg, #FF4500, #DC2626)" }}
                />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.4 : 1.8}
                className={active ? "text-[#FF4500]" : "text-neutral-500"}
              />
              <span
                className={`text-[11px] tracking-wide ${active ? "text-[#FF4500] font-semibold" : "text-neutral-500"}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
