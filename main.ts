// The Funniest Sick-Day Excuse — make.fun entry
// Writes a single funny sick-day excuse (under 200 characters) to /output/entry.txt.
// Node stdlib only, deterministic, no network, no third-party packages.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "My smart fridge locked me out of the kitchen and reported me as an intruder, so I'm staying home to negotiate my release with an appliance.";

function main(): void {
  const text = EXCUSE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${text.length}`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text + "\n", "utf8");
  // The grader collects outputs as another user: leave the file and
  // directory world-readable (only files this program itself creates).
  try {
    chmodSync("/output/entry.txt", 0o644);
  } catch {
    // best effort; default umask usually already yields a readable file
  }
  try {
    chmodSync("/output", 0o755);
  } catch {
    // best effort
  }
}

main();
