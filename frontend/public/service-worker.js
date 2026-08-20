/* Home Shred — offline-first service worker
 * Caches the built app shell so the app opens with no internet.
 * Static assets and previously-visited images are served from cache when offline.
 * All workout data lives in localStorage which is already device-local.
 */

const CACHE_VERSION = "home-shred-v3";
const OFFLINE_URL = "index.html";

// Compute a base scope (works whether hosted at "/" or "/Gym/")
const SCOPE = new URL(self.registration.scope).pathname; // e.g. "/" or "/Gym/"

const CORE_ASSETS = [
  SCOPE,
  SCOPE + "index.html",
  SCOPE + "manifest.json",
  SCOPE + "icon-192.png",
  SCOPE + "icon-512.png",
  SCOPE + "apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) =>
        Promise.all(
          CORE_ASSETS.map((url) =>
            cache.add(new Request(url, { cache: "reload" })).catch(() => null),
          ),
        ),
      ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((k) => k !== CACHE_VERSION)
              .map((k) => caches.delete(k)),
          ),
        ),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Navigation requests — network-first with cache fallback (so a fresh build wins when online, offline still works)
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches
            .open(CACHE_VERSION)
            .then((cache) => cache.put(request, clone))
            .catch(() => {});
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then(
              (res) =>
                res ||
                caches.match(SCOPE + OFFLINE_URL) ||
                caches.match(SCOPE),
            ),
        ),
    );
    return;
  }

  // Same-origin static assets — cache-first, then network, then cache-store
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request)
            .then((response) => {
              if (response && response.status === 200 && response.type === "basic") {
                const clone = response.clone();
                caches
                  .open(CACHE_VERSION)
                  .then((cache) => cache.put(request, clone))
                  .catch(() => {});
              }
              return response;
            })
            .catch(() => cached),
      ),
    );
    return;
  }

  // Cross-origin (Unsplash images, Google Fonts, analytics) — try network, fall back to cache if we've seen it
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches
            .open(CACHE_VERSION)
            .then((cache) => cache.put(request, clone))
            .catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});

// Allow the page to trigger an immediate update
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
