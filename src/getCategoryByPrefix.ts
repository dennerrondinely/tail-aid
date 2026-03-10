import { prefixCategoryMap } from "./prefixCategoryMap";

/**
 * Tailwind supports stacked variants like: hover:opacity-90, md:hover:text-red-500, dark:lg:bg-blue-500
 * We strip all variant prefixes (anything before the last ':') before matching the category.
 */
export function getCategoryByPrefix(cls: string): string {
  // Strip all variants (e.g. "hover:", "md:", "dark:focus:", etc.)
  const colonIndex = cls.lastIndexOf(":");
  const baseClass = colonIndex !== -1 ? cls.slice(colonIndex + 1) : cls;

  for (const prefix in prefixCategoryMap) {
    if (baseClass.startsWith(prefix)) {
      return prefixCategoryMap[prefix];
    }
  }
  return "Default";
}
