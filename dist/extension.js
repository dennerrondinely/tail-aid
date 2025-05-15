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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const resolveConfig_1 = __importDefault(require("tailwindcss/resolveConfig"));
const ClassTreeProvider_1 = require("./ClassTreeProvider");
const tailwindUtils_1 = require("./tailwindUtils");
const highlightTailwindClasses_1 = require("./highlightTailwindClasses");
function activate(context) {
    const workspace = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    const configPath = path.join(workspace || '', 'tailwind.config.js');
    let tailwindConfig = {};
    try {
        const userConfig = require(configPath);
        tailwindConfig = (0, resolveConfig_1.default)(userConfig);
    }
    catch (e) {
        console.warn('tailwind.config.js não encontrado.');
    }
    const tailwindData = (0, tailwindUtils_1.loadTailwindData)(tailwindConfig);
    const hoverProvider = vscode.languages.registerHoverProvider(['html', 'javascript', 'typescript'], {
        provideHover(document, position) {
            const range = document.getWordRangeAtPosition(position, /[\w-:\/]+/);
            const word = document.getText(range);
            const info = tailwindData[word];
            if (info) {
                const msg = new vscode.MarkdownString(`**${word}**: ${info.description}\n\n${info.preview}`);
                msg.isTrusted = true;
                return new vscode.Hover(msg, range);
            }
            return null;
        }
    });
    const treeProvider = new ClassTreeProvider_1.ClassTreeProvider(tailwindData);
    vscode.window.registerTreeDataProvider('tailwindClassExplorer', treeProvider);
    const insertCmd = vscode.commands.registerCommand('tailwindHighlighter.insertClass', (cls) => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString(cls + ' '));
        }
    });
    context.subscriptions.push(hoverProvider, insertCmd);
    // Aplica highlight ao abrir/trocar de editor
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor && isRelevantDocument(editor.document))
            (0, highlightTailwindClasses_1.highlightTailwindClasses)(editor);
    });
    // Aplica highlight ao editar o texto
    vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document && isRelevantDocument(editor.document)) {
            (0, highlightTailwindClasses_1.highlightTailwindClasses)(editor);
        }
    });
    // Aplica highlight ao ativar extensão
    if (vscode.window.activeTextEditor && isRelevantDocument(vscode.window.activeTextEditor.document)) {
        (0, highlightTailwindClasses_1.highlightTailwindClasses)(vscode.window.activeTextEditor);
    }
    globalThis.tailwindData = tailwindData;
}
function deactivate() { }
function isRelevantDocument(document) {
    return [
        'javascript',
        'typescript',
        'javascriptreact',
        'typescriptreact',
        'html'
    ].includes(document.languageId);
}
