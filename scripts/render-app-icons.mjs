/**
 * Rasterize the leather-cover seal to PWA / iOS / Android icons.
 * Delegates to scripts/render-cover-icons.py (source: brand/cover-source.jpg).
 * Run: node scripts/render-app-icons.mjs
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const run = spawnSync("python3", [join(root, "scripts/render-cover-icons.py")], {
  cwd: root,
  stdio: "inherit",
});
process.exit(run.status ?? 1);
