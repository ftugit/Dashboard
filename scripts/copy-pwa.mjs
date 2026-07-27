// Copies the generated service worker into the web-root locations so it is
// served from "/" (giving it ROOT scope, so it controls the whole app).
//  - public/sw.js          -> served by the `public` static router at root
//  - .output/public/sw.js  -> also placed where Nitro's static dir serves it
import { copyFile, access, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const src = join(process.cwd(), ".output", "public", "_build", "sw.js");
const dests = [
  join(process.cwd(), "public", "sw.js"),
  join(process.cwd(), ".output", "public", "sw.js")
];

try {
  await access(src);
  for (const d of dests) {
    await mkdir(dirname(d), { recursive: true });
    await copyFile(src, d);
  }
  console.log("copied sw.js -> /sw.js (root scope)");
} catch (e) {
  console.warn("copy-pwa: sw.js not found at", src, "- skipping");
}
