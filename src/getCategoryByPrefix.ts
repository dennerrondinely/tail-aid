import { prefixCategoryMap } from "./prefixCategoryMap";
export function getCategoryByPrefix(cls: string): string {
  for (const prefix in prefixCategoryMap) {
    if (cls.startsWith(prefix)) {
      return prefixCategoryMap[prefix];
    }
  }
  return "Default";
}
