import { useEffect, useState } from "react";
import "@/App.css";
import BottomNav from "@/components/BottomNav";
import Today from "@/pages/Today";
import Week from "@/pages/Week";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import { Toaster } from "sonner";
import { loadSettings } from "@/lib/storage";

const applyTheme = (isDark) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", isDark ? "dark" : "light");
  root.style.colorScheme = isDark ? "dark" : "light";
};

function App() {
  const [tab, setTab] = useState("today");
  const [tick, setTick] = useState(0);
  const initialSettings = loadSettings();
  const [restSeconds, setRestSeconds] = useState(() => initialSettings.restSeconds || 60);
  const [isDark, setIsDark] = useState(() => initialSettings.darkMode !== false);
  const onTick = () => setTick((t) => t + 1);

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen app-bg text-white noise-bg">
      <div className="max-w-md mx-auto min-h-screen relative">
        {tab === "today" && <Today tick={tick} onTick={onTick} restSeconds={restSeconds} />}
        {tab === "week" && <Week tick={tick} />}
        {tab === "history" && <History tick={tick} />}
        {tab === "settings" && (
          <Settings
            onReset={onTick}
            restSeconds={restSeconds}
            setRestSeconds={setRestSeconds}
            isDark={isDark}
            setIsDark={setIsDark}
          />
        )}
        <BottomNav current={tab} onChange={setTab} />
      </div>
      <Toaster
        theme={isDark ? "dark" : "light"}
        position="top-center"
        toastOptions={{
          style: {
            background: isDark ? "#111111" : "#FFFFFF",
            border: isDark ? "1px solid #262626" : "1px solid #E5E5E5",
            color: isDark ? "#fff" : "#0A0A0A",
          },
        }}
      />
    </div>
  );
}

export default App;
