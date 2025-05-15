import * as vscode from 'vscode';
import { categoryDecorations } from './categoryDecorations';
import { getCategoryByPrefix } from './getCategoryByPrefix';

export function highlightTailwindClasses(editor: vscode.TextEditor) {
    if (!editor) return;
    const regEx = /class(Name)?\s*=\s*(?:"([^"]+)"|'([^']+)'|`([^`]+)`|\{`([^`}]+)`\}|\{['"]([^'"}]+)['"]\})/g;
    const text = editor.document.getText();
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
      Default: []
    };
    let match;
    while ((match = regEx.exec(text))) {
      const classes = match[2] || match[3] || match[4] || match[5] || match[6];
      if (!classes) continue;
      let start = match.index + match[0].indexOf(classes);
      for (const cls of classes.split(/\s+/)) {
        if (!cls) continue;
        const startPos = editor.document.positionAt(start);
        const endPos = editor.document.positionAt(start + cls.length);
        // Categoria por prefixo
        let category = getCategoryByPrefix(cls);
        if (!decorationsByCategory[category]) category = 'Default';
        decorationsByCategory[category].push({ range: new vscode.Range(startPos, endPos) });
        start += cls.length + 1;
      }
    }
    Object.entries(decorationsByCategory).forEach(([cat, decs]) => {
      editor.setDecorations(categoryDecorations[cat], decs);
    });
  }