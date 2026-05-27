import { promises as fs } from "node:fs";
import path from "node:path";
import { BRAND_DIR } from "./paths";

export type Brand = {
  theme: string;
  positioning: string;
  voice: string;
};

async function readFileSafe(name: string): Promise<string> {
  try {
    return await fs.readFile(path.join(BRAND_DIR, name), "utf8");
  } catch {
    return "";
  }
}

export async function loadBrand(): Promise<Brand> {
  const [theme, positioning, voice] = await Promise.all([
    readFileSafe("theme.md"),
    readFileSafe("positioning.md"),
    readFileSafe("voice.md"),
  ]);
  return { theme, positioning, voice };
}

export function formatBrandAsSystemContext(brand: Brand): string {
  return [
    "# Brand context\n\nThe following files define the brand's theme, positioning, and voice. Every piece of content you generate must reflect them. If they are empty, refuse to generate and tell the user to fill in the brand files first.\n",
    "## brand/theme.md\n\n" + (brand.theme || "_(empty — refuse to generate)_"),
    "## brand/positioning.md\n\n" + (brand.positioning || "_(empty — refuse to generate)_"),
    "## brand/voice.md\n\n" + (brand.voice || "_(empty — refuse to generate)_"),
  ].join("\n\n");
}
