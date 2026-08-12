import { useEffect, useState } from "react";
import "@/App.css";
import BottomNav from "@/components/BottomNav";
import Today from "@/pages/Today";
import Week from "@/pages/Week";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import { Toaster } from "sonner";
import { loadSettings } from "@/lib/storage";

function App() {
  const [tab, setTab] = useState("today");
  const [tick, setTick] = useState(0);
  const [restSeconds, setRestSeconds] = useState(() => loadSettings().restSeconds || 60);
  const onTick = () => setTick((t) => t + 1);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white noise-bg">
      <div className="max-w-md mx-auto min-h-screen relative">
        {tab === "today" && <Today tick={tick} onTick={onTick} restSeconds={restSeconds} />}
        {tab === "week" && <Week tick={tick} />}
        {tab === "history" && <History tick={tick} />}
        {tab === "settings" && <Settings onReset={onTick} restSeconds={restSeconds} setRestSeconds={setRestSeconds} />}
        <BottomNav current={tab} onChange={setTab} />
      </div>
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "#111111",
            border: "1px solid #262626",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
