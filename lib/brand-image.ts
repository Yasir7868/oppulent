import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Reads a brand PNG from /public as a data URL for use inside ImageResponse. */
export async function brandDataUrl(file: "of-mark.png" | "of-logo.png"): Promise<string> {
  const data = await readFile(join(process.cwd(), "public", "brand", file));
  return `data:image/png;base64,${data.toString("base64")}`;
}
