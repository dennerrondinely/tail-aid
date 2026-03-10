import * as fs from "fs";
import * as path from "path";

export const USER_CONFIG_FILENAME = "tailaid.config.json";

export interface UserCustomClass {
  /** One or more prefixes/class names to match (e.g. ["btn-", "card", "text-brand-"]) */
  prefix: string | string[];
  /** Category name (e.g. "Components", "Brand") */
  category: string;
  /** Text color in any CSS format (e.g. "#a78bfa", "#000000") */
  color: string;
  /** Background highlight color in any CSS format (e.g. "rgba(167,139,250,0.12)", "#fff8ff") */
  backgroundColor?: string;
}

export interface UserConfig {
  customClasses: UserCustomClass[];
}

const DEFAULT_CONFIG: UserConfig = {
  customClasses: [
    {
      prefix: ["btn-", "card"],
      category: "Components",
      color: "#a78bfa",
      backgroundColor: "rgba(167,139,250,0.12)"
    }
  ]
};

/**
 * Finds the workspace root by looking for common project markers.
 */
function findWorkspaceRoot(): string | undefined {
  const workspaceFolders = (() => {
    try {
      // Dynamic import to avoid circular dependency issues
      const vscode = require("vscode");
      return vscode.workspace.workspaceFolders as { uri: { fsPath: string } }[] | undefined;
    } catch {
      return undefined;
    }
  })();

  if (workspaceFolders && workspaceFolders.length > 0) {
    return workspaceFolders[0].uri.fsPath;
  }
  return undefined;
}

/**
 * Returns the full path to the config file in the current workspace root.
 */
export function getConfigFilePath(): string | undefined {
  const root = findWorkspaceRoot();
  if (!root) return undefined;
  return path.join(root, USER_CONFIG_FILENAME);
}

/**
 * Loads and parses the user config file. Returns null if not found or invalid.
 */
export function loadUserConfig(): UserConfig | null {
  const configPath = getConfigFilePath();
  if (!configPath || !fs.existsSync(configPath)) return null;

  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(raw) as UserConfig;
    if (!Array.isArray(parsed.customClasses)) {
      console.warn("[TailAid] tailaid.config.json is missing `customClasses` array.");
      return null;
    }
    // Warn about empty prefixes but don't reject the whole config
    parsed.customClasses.forEach((entry, i) => {
      const prefixes = Array.isArray(entry.prefix) ? entry.prefix : [entry.prefix];
      const empty = prefixes.filter(p => typeof p !== 'string' || p.trim().length === 0);
      if (empty.length > 0) {
        console.warn(`[TailAid] customClasses[${i}] has ${empty.length} empty/invalid prefix(es) — they will be ignored.`);
      }
    });
    return parsed;
  } catch (e) {
    console.warn("[TailAid] Failed to parse tailaid.config.json:", e);
    return null;
  }
}

/**
 * Creates a default tailaid.config.json in the workspace root.
 * Returns the path of the created file.
 */
export function createDefaultConfig(): string | undefined {
  const configPath = getConfigFilePath();
  if (!configPath) return undefined;

  if (fs.existsSync(configPath)) return configPath; // already exists

  fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), "utf-8");
  return configPath;
}
