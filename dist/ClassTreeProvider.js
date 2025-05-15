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
exports.ClassTreeProvider = void 0;
const vscode = __importStar(require("vscode"));
class ClassTreeProvider {
    data;
    constructor(data) {
        this.data = data;
    }
    getChildren(element) {
        if (!element) {
            const categories = [...new Set(Object.values(this.data).map(item => item.category))];
            return categories.map(c => new ClassItem(c || 'Sem categoria', vscode.TreeItemCollapsibleState.Collapsed));
        }
        else {
            return Object.entries(this.data)
                .filter(([_, val]) => val.category === element.label)
                .map(([cls, val]) => new ClassItem(cls, vscode.TreeItemCollapsibleState.None, {
                command: 'tailwindHighlighter.insertClass',
                title: 'Inserir Classe',
                arguments: [cls]
            }, val.description || '', val.preview || ''));
        }
    }
    getTreeItem(element) {
        return element;
    }
    onDidChangeTreeData;
}
exports.ClassTreeProvider = ClassTreeProvider;
class ClassItem extends vscode.TreeItem {
    label;
    collapsibleState;
    command;
    description;
    preview;
    constructor(label, collapsibleState, command, description, preview) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.description = description;
        this.preview = preview;
    }
}
