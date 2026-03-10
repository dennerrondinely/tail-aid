import * as vscode from "vscode";

// Colors are optimized for dark themes (VS Code default dark background ~#1e1e1e)
// Text colors use light/pastel tones for high contrast; backgrounds are very subtle tints.
export const categoryDecorations: Record<string, vscode.TextEditorDecorationType> = {
  Color: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(96,165,250,0.12)",  // azul suave
    color: "#93c5fd",                           // azul claro (sky-300)
    borderRadius: "3px",
  }),
  Spacing: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(52,211,153,0.10)",  // verde água
    color: "#6ee7b7",                           // verde claro (emerald-300)
    borderRadius: "3px",
  }),
  Typography: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(250,204,21,0.10)",  // amarelo
    color: "#fde68a",                           // amarelo claro (yellow-200)
    borderRadius: "3px",
  }),
  Border: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(167,139,250,0.12)", // violeta suave
    color: "#c4b5fd",                           // violeta claro (violet-300)
    borderRadius: "3px",
    border: "1px solid rgba(167,139,250,0.4)",
  }),
  Effect: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(244,114,182,0.10)", // rosa
    color: "#f9a8d4",                           // rosa claro (pink-300)
    borderRadius: "3px",
  }),
  Layout: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(56,189,248,0.10)",  // ciano
    color: "#7dd3fc",                           // ciano claro (sky-300)
    borderRadius: "3px",
  }),
  Sizing: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(192,132,252,0.10)", // púrpura
    color: "#d8b4fe",                           // púrpura claro (purple-300)
    borderRadius: "3px",
  }),
  Animation: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(251,146,60,0.10)",  // laranja
    color: "#fdba74",                           // laranja claro (orange-300)
    borderRadius: "3px",
  }),
  Transform: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(45,212,191,0.10)",  // teal
    color: "#5eead4",                           // teal claro (teal-300)
    borderRadius: "3px",
  }),
  Interactivity: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(248,113,113,0.10)", // vermelho
    color: "#fca5a5",                           // vermelho claro (red-300)
    borderRadius: "3px",
  }),
  Accessibility: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(148,163,184,0.08)", // cinza azulado
    color: "#94a3b8",                           // slate-400
    borderRadius: "3px",
  }),
  SVG: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(74,222,128,0.10)",  // verde
    color: "#86efac",                           // verde claro (green-300)
    borderRadius: "3px",
  }),
  Table: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(251,191,36,0.10)",  // âmbar
    color: "#fcd34d",                           // âmbar claro (amber-300)
    borderRadius: "3px",
  }),
  Default: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(148,163,184,0.06)", // cinza neutro
    color: "#cbd5e1",                           // slate-300
    borderRadius: "3px",
  }),
};

