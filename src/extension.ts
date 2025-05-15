import * as vscode from 'vscode';
import { ClassTreeProvider } from './ClassTreeProvider';
import { loadTailwindData } from './tailwindUtils';
import { highlightTailwindClasses } from './highlightTailwindClasses';

export function activate(context: vscode.ExtensionContext) {

  let tailwindConfig: any = {};

  const tailwindData = loadTailwindData(tailwindConfig);

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

  const treeProvider = new ClassTreeProvider(tailwindData);
  vscode.window.registerTreeDataProvider('tailwindClassExplorer', treeProvider);

  const insertCmd = vscode.commands.registerCommand('tailwindHighlighter.insertClass', (cls: string) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.insertSnippet(new vscode.SnippetString(cls + ' '));
    }
  });

  context.subscriptions.push(hoverProvider, insertCmd);

  // Aplica highlight ao abrir/trocar de editor
  vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor && isRelevantDocument(editor.document)) highlightTailwindClasses(editor);
  });
  // Aplica highlight ao editar o texto
  vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (editor && event.document === editor.document && isRelevantDocument(editor.document)) {
      highlightTailwindClasses(editor);
    }
  });
  // Aplica highlight ao ativar extensão
  if (vscode.window.activeTextEditor && isRelevantDocument(vscode.window.activeTextEditor.document)) {
    highlightTailwindClasses(vscode.window.activeTextEditor);
  }

  globalThis.tailwindData = tailwindData;
}

export function deactivate() {}

function isRelevantDocument(document: vscode.TextDocument) {
  return [
    'javascript',
    'typescript',
    'javascriptreact',
    'typescriptreact',
    'html'
  ].includes(document.languageId);
}

const categoryDecorations: Record<string, vscode.TextEditorDecorationType> = {
  Color: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(59,130,246,0.15)', // light blue
    color: '#2563eb', // blue
    borderRadius: '2px'
  }),
  Spacing: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(34,197,94,0.10)', // light green
    color: '#16a34a', // green
    borderRadius: '2px'
  }),
  Typography: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(251,191,36,0.10)', // light yellow
    color: '#b45309', // dark yellow
    borderRadius: '2px'
  }),
  Border: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(99,102,241,0.10)', // light purple
    color: '#6366f1', // purple
    border: '1px solid #6366f1',
    borderRadius: '2px'
  }),
  Effect: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(251,113,133,0.10)', // light pink
    color: '#be185d', // dark pink
    borderRadius: '2px'
  }),
  Layout: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(16,185,129,0.10)', // light teal
    color: '#0d9488', // dark teal
    borderRadius: '2px'
  }),
  Sizing: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(168,85,247,0.10)', // light lilac
    color: '#a21caf', // dark lilac
    borderRadius: '2px'
  }),
  Animation: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(251,191,36,0.10)', // light yellow
    color: '#f59e42', // orange
    borderRadius: '2px'
  }),
  Transform: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(59,130,246,0.10)', // light blue
    color: '#1e40af', // dark blue
    borderRadius: '2px'
  }),
  Interactivity: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(244,63,94,0.10)', // light red
    color: '#b91c1c', // dark red
    borderRadius: '2px'
  }),
  Accessibility: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(163,163,163,0.10)', // light gray
    color: '#52525b', // dark gray
    borderRadius: '2px'
  }),
  Default: vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(203,213,225,0.30)', // light blue-gray (slate-200)
    color: '#334155', // dark blue-gray (slate-800)
    borderRadius: '2px'
  })
};

const prefixCategoryMap: Record<string, string> = {
  // Colors
  'bg-': 'Color',
  'text-': 'Typography',
  'from-': 'Color',
  'via-': 'Color',
  'to-': 'Color',
  'border-': 'Border',
  'outline-': 'Border',
  'ring-': 'Border',
  'decoration-': 'Typography',
  'placeholder-': 'Typography',
  'caret-': 'Typography',
  'fill-': 'Color',
  'stroke-': 'Color',

  // Spacing
  'p-': 'Spacing',
  'px-': 'Spacing',
  'py-': 'Spacing',
  'pt-': 'Spacing',
  'pr-': 'Spacing',
  'pb-': 'Spacing',
  'pl-': 'Spacing',
  'm-': 'Spacing',
  'mx-': 'Spacing',
  'my-': 'Spacing',
  'mt-': 'Spacing',
  'mr-': 'Spacing',
  'mb-': 'Spacing',
  'ml-': 'Spacing',
  'space-x-': 'Spacing',
  'space-y-': 'Spacing',
  'gap-': 'Spacing',

  // Layout
  'container': 'Layout',
  'box-': 'Layout',
  'block': 'Layout',
  'inline': 'Layout',
  'flex': 'Layout',
  'grid': 'Layout',
  'col-': 'Layout',
  'row-': 'Layout',
  'auto-cols-': 'Layout',
  'auto-rows-': 'Layout',
  'grid-cols-': 'Layout',
  'grid-rows-': 'Layout',
  'place-': 'Layout',
  'justify-': 'Layout',
  'items-': 'Layout',
  'content-': 'Layout',
  'self-': 'Layout',
  'order-': 'Layout',
  'float-': 'Layout',
  'clear-': 'Layout',
  'z-': 'Layout',
  'isolate': 'Layout',
  'inset-': 'Layout',
  'top-': 'Layout',
  'right-': 'Layout',
  'bottom-': 'Layout',
  'left-': 'Layout',

  // Sizing
  'w-': 'Sizing',
  'min-w-': 'Sizing',
  'max-w-': 'Sizing',
  'h-': 'Sizing',
  'min-h-': 'Sizing',
  'max-h-': 'Sizing',

  // Typography
  'font-': 'Typography',
  'tracking-': 'Typography',
  'leading-': 'Typography',
  'list-': 'Typography',
  'align-': 'Typography',
  'whitespace-': 'Typography',
  'break-': 'Typography',
  'uppercase': 'Typography',
  'lowercase': 'Typography',
  'capitalize': 'Typography',
  'normal-case': 'Typography',
  'truncate': 'Typography',
  'overflow-': 'Typography',

  // Borders and effects
  'rounded': 'Border',
  'shadow': 'Effect',
  'opacity-': 'Effect',
  'mix-blend-': 'Effect',
  'bg-blend-': 'Effect',
  'filter': 'Effect',
  'backdrop-': 'Effect',

  // Other utilities
  'transition': 'Animation',
  'duration-': 'Animation',
  'ease-': 'Animation',
  'delay-': 'Animation',
  'animate-': 'Animation',
  'scale-': 'Transform',
  'rotate-': 'Transform',
  'translate-': 'Transform',
  'skew-': 'Transform',
  'origin-': 'Transform',
  'select-': 'Interactivity',
  'pointer-events-': 'Interactivity',
  'resize': 'Interactivity',
  'cursor-': 'Interactivity',
  'user-select-': 'Interactivity',
  'touch-': 'Interactivity',
  'visible': 'Interactivity',
  'invisible': 'Interactivity',
  'sr-only': 'Accessibility',
  'not-sr-only': 'Accessibility'
};