import * as fs from 'fs';
import * as path from 'path';

export function loadTailwindData(config: any): Record<string, { description?: string; preview?: string; category?: string }> {
  let classListPath = path.join(__dirname, 'tailwindClassList.json');
  if (!fs.existsSync(classListPath)) {
    // Fallback to source directory (useful during development)
    classListPath = path.join(__dirname, '../src/tailwindClassList.json');
  }
  let classList: Record<string, { category: string }> = {};
  try {
    classList = JSON.parse(fs.readFileSync(classListPath, 'utf-8'));
  } catch (e) {
    console.warn('[TailAid] Could not load tailwindClassList.json:', e);
  }
  // Returns classes with their category (description/preview can be added here in the future)
  return classList;
  }
  