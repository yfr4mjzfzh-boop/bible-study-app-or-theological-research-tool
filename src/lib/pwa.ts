type InstallPrompt = {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let deferred: InstallPrompt | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const fn of listeners) fn();
}

/** Keep Android's status bar on oxblood. Control Center re-reads the meta. */
const OXBLOOD = "#821111";

export function lockThemeColor() {
  if (typeof document === "undefined") return;
  const apply = () => {
    document
      .querySelectorAll('meta[name="theme-color"][media]')
      .forEach((el) => el.remove());
    let meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    if (meta.getAttribute("content") !== OXBLOOD) {
      meta.setAttribute("content", OXBLOOD);
    }
  };
  apply();
  document.addEventListener("visibilitychange", apply);
}

export function initPwa() {
  if (typeof window === "undefined") return;
  lockThemeColor();
  if ("serviceWorker" in navigator) {
    void navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });
  }
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferred = event as unknown as InstallPrompt;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    notify();
  });
}

export function canInstallPwa() {
  return deferred != null && !isStandalone();
}

export function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

/** When Android fullscreen reports 0 inset, keep the camera cutout off the chrome. */
export function lockSafeTop() {
  if (typeof window === "undefined" || !document.body) return;
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;visibility:hidden;pointer-events:none;height:env(safe-area-inset-top,0px)";
  document.body.appendChild(probe);
  const inset = probe.getBoundingClientRect().height;
  probe.remove();
  const fullscreen = window.matchMedia("(display-mode: fullscreen)").matches;
  document.documentElement.style.setProperty(
    "--safe-top-min",
    fullscreen && inset < 12 ? "2rem" : "0px",
  );
}

export function subscribePwa(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export async function installPwa() {
  if (!deferred) return false;
  const prompt = deferred;
  deferred = null;
  notify();
  await prompt.prompt();
  const { outcome } = await prompt.userChoice;
  return outcome === "accepted";
}
