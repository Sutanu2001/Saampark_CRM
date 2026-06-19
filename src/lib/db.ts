import { promises as fs } from "node:fs";
import path from "node:path";
import type { AppDb } from "@/lib/types";

const DB_PATH = path.join(process.cwd(), "data", "app-db.json");

async function ensureDbFile() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    const emptyDb: AppDb = { leads: [], dashboards: [], projects: [], users: [] };
    await fs.writeFile(DB_PATH, JSON.stringify(emptyDb, null, 2), "utf8");
  }
}

export async function readDb(): Promise<AppDb> {
  await ensureDbFile();
  const content = await fs.readFile(DB_PATH, "utf8");
  try {
    return JSON.parse(content) as AppDb;
  } catch (error) {
    console.error("Database file corrupted. Resetting to safe state...", error);
    const emptyDb: AppDb = { leads: [], dashboards: [], projects: [], users: [] };
    await fs.writeFile(DB_PATH, JSON.stringify(emptyDb, null, 2), "utf8");
    return emptyDb;
  }
}

export async function writeDb(db: AppDb): Promise<void> {
  await ensureDbFile();
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export function makeId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}
