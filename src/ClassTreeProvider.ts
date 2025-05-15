import * as vscode from 'vscode';

export class ClassTreeProvider implements vscode.TreeDataProvider<ClassItem> {
  constructor(private data: Record<string, { description?: string; preview?: string; category?: string }>) {}

  getChildren(element?: ClassItem): vscode.ProviderResult<ClassItem[]> {
    if (!element) {
      const categories = [...new Set(Object.values(this.data).map(item => item.category))];
      return categories.map(c => new ClassItem(c || 'Sem categoria', vscode.TreeItemCollapsibleState.Collapsed));
    } else {
      return Object.entries(this.data)
        .filter(([_, val]) => val.category === element.label)
        .map(([cls, val]) => new ClassItem(cls, vscode.TreeItemCollapsibleState.None, {
          command: 'tailwindHighlighter.insertClass',
          title: 'Inserir Classe',
          arguments: [cls]
        }, val.description || '', val.preview || ''));
    }
  }

  getTreeItem(element: ClassItem): vscode.TreeItem {
    return element;
  }

  onDidChangeTreeData?: vscode.Event<ClassItem | null | undefined>;
}

class ClassItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public readonly description?: string,
    public readonly preview?: string
  ) {
    super(label, collapsibleState);
  }
}
