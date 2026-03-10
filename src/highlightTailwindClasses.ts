import * as vscode from 'vscode';
import { categoryDecorations } from './categoryDecorations';
import { getCategoryByPrefix } from './getCategoryByPrefix';
import { loadUserConfig, UserCustomClass } from './userConfig';

/** Cache of dynamically created TextEditorDecorationTypes for user-defined custom categories. */
const userDecorationCache = new Map<string, vscode.TextEditorDecorationType>();

/**
 * Returns a cached (or newly created) TextEditorDecorationType for the given
 * custom class entry. The cache key is derived from the category, colors and
 * prefixes so that different entries always get independent decoration types.
 */
function getUserDecoration(entry: UserCustomClass): vscode.TextEditorDecorationType {
  const prefixKey = Array.isArray(entry.prefix) ? entry.prefix.join(',') : entry.prefix;
  const key = `${entry.category}::${entry.color}::${entry.backgroundColor ?? ''}::${prefixKey}`;
  if (!userDecorationCache.has(key)) {
    userDecorationCache.set(key, vscode.window.createTextEditorDecorationType({
      backgroundColor: entry.backgroundColor ?? `rgba(167,139,250,0.10)`,
      color: entry.color,
      borderRadius: "3px",
    }));
  }
  return userDecorationCache.get(key)!;
}

/** Disposes all cached user decorations (call when config changes) */
export function disposeUserDecorations() {
  userDecorationCache.forEach(dec => dec.dispose());
  userDecorationCache.clear();
}

export function highlightTailwindClasses(editor: vscode.TextEditor) {
    if (!editor) return;
    const regEx = /class(Name)?\s*=\s*(?:"([^"]+)"|'([^']+)'|`([^`]+)`|\{`([^`}]+)`\}|\{['"]([^'"}]+)['"]\})/g;
    const text = editor.document.getText();

    // Clear all built-in category decorations before re-computing
    Object.values(categoryDecorations).forEach(dec => editor.setDecorations(dec, []));

    const decorationsByCategory: Record<string, vscode.DecorationOptions[]> = {
      Color: [],
      Spacing: [],
      Typography: [],
      Border: [],
      Effect: [],
      Layout: [],
      Sizing: [],
      Animation: [],
      Transform: [],
      Interactivity: [],
      Accessibility: [],
      SVG: [],
      Table: [],
      Default: []
    };

    // Load user config and prepare buckets for each custom category
    const userConfig = loadUserConfig();
    const userDecorationsByCategory = new Map<string, vscode.DecorationOptions[]>();
    if (userConfig) {
      // Clear any previously applied user decorations from the editor
      userDecorationCache.forEach(dec => editor.setDecorations(dec, []));
      // Create an empty range bucket for every unique custom category
      const seenCategories = new Set(userConfig.customClasses.map(e => e.category));
      seenCategories.forEach(cat => userDecorationsByCategory.set(cat, []));
    }

    let match;
    while ((match = regEx.exec(text))) {
      const classes = match[2] || match[3] || match[4] || match[5] || match[6];
      if (!classes) continue;
      let start = match.index + match[0].indexOf(classes);
      for (const cls of classes.split(/\s+/)) {
        if (!cls) continue;
        const startPos = editor.document.positionAt(start);
        const endPos = editor.document.positionAt(start + cls.length);
        const range = new vscode.Range(startPos, endPos);
        const category = getCategoryByPrefix(cls);

        if (userDecorationsByCategory.has(category)) {
          userDecorationsByCategory.get(category)!.push({ range });
        } else {
          const safeCat = decorationsByCategory[category] ? category : 'Default';
          decorationsByCategory[safeCat].push({ range });
        }
        start += cls.length + 1;
      }
    }

    // Apply built-in category decorations
    Object.entries(decorationsByCategory).forEach(([cat, decs]) => {
      editor.setDecorations(categoryDecorations[cat], decs);
    });

    // Apply user-defined custom category decorations
    if (userConfig) {
      userDecorationsByCategory.forEach((decs, category) => {
        const entry = userConfig.customClasses.find(e => e.category === category);
        if (!entry) return;
        editor.setDecorations(getUserDecoration(entry), decs);
      });
    }
  }