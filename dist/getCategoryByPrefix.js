"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryByPrefix = getCategoryByPrefix;
const prefixCategoryMap_1 = require("./prefixCategoryMap");
function getCategoryByPrefix(cls) {
    for (const prefix in prefixCategoryMap_1.prefixCategoryMap) {
        if (cls.startsWith(prefix)) {
            return prefixCategoryMap_1.prefixCategoryMap[prefix];
        }
    }
    return "Default";
}
