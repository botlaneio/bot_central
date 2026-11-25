"use client";

/*
 * Loads Theatre.js once for the whole page. In development, adding ?studio to the URL opens the Theatre
 * studio, where every animated section (sheet) on the page can be retimed. Studio has to be initialised
 * before any project is created, so every component gets Theatre through this function.
 */
let loading: Promise<typeof import("@theatre/core")> | null = null;

export function loadTheatre() {
  loading ??= (async () => {
    if (process.env.NODE_ENV === "development" && new URLSearchParams(location.search).has("studio")) {
      const studio = (await import("@theatre/studio")).default;
      studio.initialize();
    }
    return import("@theatre/core");
  })();
  return loading;
}
