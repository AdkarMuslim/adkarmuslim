import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(root, ".next");

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next/");
} catch (e) {
  if (e.code === "ENOENT") {
    console.log(".next/ not found (already clean)");
    process.exit(0);
  }
  if (e.code === "EPERM" || e.code === "EBUSY") {
    console.error(
      "\nCould not delete .next (file locked). On Windows:\n" +
        "  1) Stop `next dev` / close the browser tab on localhost\n" +
        "  2) Run: npm run clean   (or delete the .next folder in Explorer)\n",
    );
    process.exit(1);
  }
  throw e;
}
