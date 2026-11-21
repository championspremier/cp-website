// Kept separate from the lazy-loaded CampusLightbox component so the homepage
// can check the flag without pulling in the lightbox chunk.
const STORAGE_KEY = "cp-campus-lightbox-seen";

export function hasSeenCampusLightbox(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Storage unavailable (private mode, blocked site data) — treat as not seen
    return false;
  }
}

export function markCampusLightboxSeen(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Ignore — the lightbox may show again on the next load
  }
}
