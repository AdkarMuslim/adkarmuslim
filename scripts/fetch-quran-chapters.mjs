/**
 * يحمّل نصوص السور + قائمة السور من quranapi.pages.dev ويخزّنها محلياً
 * في data/quran-chapters/ — بعدها الموقع يقرأ من القرص دون الاتصال بالـ API.
 *
 * تشغيل: node ./scripts/fetch-quran-chapters.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "data", "quran-chapters");
const BASE = "https://quranapi.pages.dev/api";

await mkdir(outDir, { recursive: true });

const surahRes = await fetch(`${BASE}/surah.json`);
if (!surahRes.ok) throw new Error(`surah.json failed: ${surahRes.status}`);
const surahList = await surahRes.json();
await writeFile(path.join(outDir, "surah.json"), JSON.stringify(surahList), "utf8");

for (let n = 1; n <= 114; n++) {
  const res = await fetch(`${BASE}/${n}.json`);
  if (!res.ok) throw new Error(`chapter ${n} failed: ${res.status}`);
  const data = await res.json();
  await writeFile(path.join(outDir, `${n}.json`), JSON.stringify(data), "utf8");
  process.stdout.write(`\r${n}/114`);
}
process.stdout.write("\n");
