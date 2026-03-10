import { prefixCategoryMap } from "./prefixCategoryMap";
import { loadUserConfig } from "./userConfig";

/**
 * Tailwind supports stacked variants like: hover:opacity-90, md:hover:text-red-500, dark:lg:bg-blue-500
 * We strip all variant prefixes (anything before the last ':') before matching the category.
 */
export function getCategoryByPrefix(cls: string): string {
  // Strip all variants (e.g. "hover:", "md:", "dark:focus:", etc.)
  const colonIndex = cls.lastIndexOf(":");
  const baseClass = colonIndex !== -1 ? cls.slice(colonIndex + 1) : cls;

  // 1. Check user custom classes first (higher priority)
  const userConfig = loadUserConfig();
  if (userConfig) {
    for (const entry of userConfig.customClasses) {
      const prefixes = (Array.isArray(entry.prefix) ? entry.prefix : [entry.prefix])
        .filter(p => typeof p === 'string' && p.trim().length > 0); // ignore empty/blank prefixes
      if (prefixes.some(p => baseClass.startsWith(p))) {
        return entry.category;
      }
    }
  }

  // 2. Fall back to built-in prefix map
  for (const prefix in prefixCategoryMap) {
    if (baseClass.startsWith(prefix)) {
      return prefixCategoryMap[prefix];
    }
  }

  return "Default";
}
