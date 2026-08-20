// Registers the Home Shred service worker so the app works offline.
// Uses PUBLIC_URL so it works on both / and /Gym/ hosting.

export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  // Skip on localhost dev servers using webpack HMR — they conflict with SW caching
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    // Still allow if explicitly forced
    if (!window.location.search.includes("sw=1")) return;
  }

  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL || ""}/service-worker.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        // On update available, force it so users get the new build on next visit
        registration.addEventListener("updatefound", () => {
          const nw = registration.installing;
          if (!nw) return;
          nw.addEventListener("statechange", () => {
            if (nw.state === "installed" && navigator.serviceWorker.controller) {
              nw.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch(() => {
        // Silently ignore — offline mode simply won't be enabled
      });
  });
}
