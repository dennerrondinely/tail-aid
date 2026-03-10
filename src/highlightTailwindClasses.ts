import * as vscode from 'vscode';
import { categoryDecorations } from './categoryDecorations';
import { getCategoryByPrefix } from './getCategoryByPrefix';
import { loadUserConfig, UserCustomClass } from './userConfig';

/** Cache of dynamically created decorations for user custom categories */
const userDecorationCache = new Map<string, vscode.TextEditorDecorationType>();

function getUserDecoration(entry: UserCustomClass): vscode.TextEditorDecorationType {
  const prefixKey = Array.isArray(entry.prefix) ? entry.prefix.join(',') : entry.prefix;
  const key = `${entry.category}::${entry.color}::${entry.backgroundColor ?? ''}::${prefixKey}`;
  if (!userDecorationCache.has(key)) {
    const bg = entry.backgroundColor ?? `${entry.color.replace(/^#/, '')}22`;
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

    // Built-in category decorations
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

    // User custom categories
    const userConfig = loadUserConfig();
    const userDecorationsByCategory = new Map<string, vscode.DecorationOptions[]>();
    if (userConfig) {
      // Clear previous user decorations from editor
      userDecorationCache.forEach(dec => editor.setDecorations(dec, []));
      // Prepare buckets for each unique user category
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

    // Apply built-in decorations
    Object.entries(decorationsByCategory).forEach(([cat, decs]) => {
      editor.setDecorations(categoryDecorations[cat], decs);
    });

    // Apply user custom decorations
    if (userConfig) {
      userDecorationsByCategory.forEach((decs, category) => {
        const entry = userConfig.customClasses.find(e => e.category === category);
        if (!entry) return;
        editor.setDecorations(getUserDecoration(entry), decs);
      });
    }
  }