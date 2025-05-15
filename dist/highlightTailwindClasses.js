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
exports.highlightTailwindClasses = highlightTailwindClasses;
const vscode = __importStar(require("vscode"));
const categoryDecorations_1 = require("./categoryDecorations");
const getCategoryByPrefix_1 = require("./getCategoryByPrefix");
function highlightTailwindClasses(editor) {
    if (!editor)
        return;
    const regEx = /class(Name)?\s*=\s*(?:"([^"]+)"|'([^']+)'|`([^`]+)`|\{`([^`}]+)`\}|\{['"]([^'"}]+)['"]\})/g;
    const text = editor.document.getText();
    Object.values(categoryDecorations_1.categoryDecorations).forEach(dec => editor.setDecorations(dec, []));
    const decorationsByCategory = {
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
        if (!classes)
            continue;
        let start = match.index + match[0].indexOf(classes);
        for (const cls of classes.split(/\s+/)) {
            if (!cls)
                continue;
            const startPos = editor.document.positionAt(start);
            const endPos = editor.document.positionAt(start + cls.length);
            // Categoria por prefixo
            let category = (0, getCategoryByPrefix_1.getCategoryByPrefix)(cls);
            if (!decorationsByCategory[category])
                category = 'Default';
            decorationsByCategory[category].push({ range: new vscode.Range(startPos, endPos) });
            start += cls.length + 1;
        }
    }
    Object.entries(decorationsByCategory).forEach(([cat, decs]) => {
        editor.setDecorations(categoryDecorations_1.categoryDecorations[cat], decs);
    });
}
