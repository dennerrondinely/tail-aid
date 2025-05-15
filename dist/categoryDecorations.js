"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryDecorations = void 0;
const vscode = __importStar(require("vscode"));
exports.categoryDecorations = {
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
