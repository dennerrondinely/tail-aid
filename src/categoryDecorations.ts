import * as vscode from "vscode";
export const categoryDecorations: Record<string, vscode.TextEditorDecorationType> = {
  Color: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(147,197,253,0.15)", // azul pastel
    color: "#2563eb", // azul médio
    borderRadius: "2px",
  }),
  Spacing: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(167,243,208,0.12)", // verde menta claro
    color: "#10b981", // verde menta
    borderRadius: "2px",
  }),
  Typography: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(253,224,71,0.12)", // amarelo suave
    color: "#ca8a04", // dourado
    borderRadius: "2px",
  }),
  Border: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(221,214,254,0.15)", // roxo lavanda
    color: "#7c3aed", // roxo vivo
    border: "1px solid #7c3aed",
    borderRadius: "2px",
  }),
  Effect: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(251,207,232,0.12)", // rosa bebê
    color: "#db2777", // rosa magenta
    borderRadius: "2px",
  }),
  Layout: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(186,230,253,0.12)", // azul céu
    color: "#0ea5e9", // azul ciano
    borderRadius: "2px",
  }),
  Sizing: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(233,213,255,0.12)", // lilás claro
    color: "#a855f7", // roxo neon
    borderRadius: "2px",
  }),
  Animation: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(254,215,170,0.12)", // laranja claro
    color: "#f97316", // laranja vibrante
    borderRadius: "2px",
  }),
  Transform: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(191,219,254,0.12)", // azul gelo
    color: "#3b82f6", // azul padrão tailwind
    borderRadius: "2px",
  }),
  Interactivity: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(254,202,202,0.12)", // vermelho rosado
    color: "#ef4444", // vermelho vibrante
    borderRadius: "2px",
  }),
  Accessibility: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(212,212,216,0.10)", // cinza sutil
    color: "#71717a", // cinza médio
    borderRadius: "2px",
  }),
  Default: vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(226,232,240,0.10)", // cinza leve
    color: "#64748b", // cinza elegante
    borderRadius: "2px",
  }),
};

