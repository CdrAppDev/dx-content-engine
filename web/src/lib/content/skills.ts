import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { SKILLS_DIR } from "./paths";

export type Skill = {
  id: string;
  name: string;
  description: string;
  body: string;
  path: string;
};

async function findSkillFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findSkillFiles(full)));
    } else if (entry.isFile() && entry.name === "SKILL.md") {
      results.push(full);
    }
  }
  return results;
}

async function readSkill(filePath: string): Promise<Skill> {
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const id = path.basename(path.dirname(filePath));
  return {
    id,
    name: String(data.name ?? id),
    description: String(data.description ?? ""),
    body: content.trim(),
    path: filePath,
  };
}

let cache: Promise<Skill[]> | null = null;

export function loadSkills(): Promise<Skill[]> {
  if (!cache) {
    cache = (async () => {
      const files = await findSkillFiles(SKILLS_DIR);
      return Promise.all(files.map(readSkill));
    })();
  }
  return cache;
}

export async function getSkillByName(name: string): Promise<Skill | undefined> {
  const skills = await loadSkills();
  return skills.find((s) => s.name === name);
}

export function clearSkillCache() {
  cache = null;
}
