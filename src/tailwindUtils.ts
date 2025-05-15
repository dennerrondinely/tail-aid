import * as fs from 'fs';
import * as path from 'path';

export function loadTailwindData(config: any): Record<string, { description?: string; preview?: string; category?: string }> {
  let classListPath = path.join(__dirname, 'tailwindClassList.json');
  if (!fs.existsSync(classListPath)) {
    // Tenta buscar na raiz do projeto (útil para dev)
    classListPath = path.join(__dirname, '../src/tailwindClassList.json');
  }
  let classList: Record<string, { category: string }> = {};
  try {
    classList = JSON.parse(fs.readFileSync(classListPath, 'utf-8'));
  } catch (e) {
    console.warn('Não foi possível carregar tailwindClassList.json:', e);
  }
  // Retorna as classes com categoria (pode adicionar description/preview se quiser)
  return classList;
  }
  