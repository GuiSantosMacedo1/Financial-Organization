import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/**", "node_modules/**", "coverage/**"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-multi-spaces": "error",
      "space-in-parens": ["error", "never"],
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "space-before-function-paren": ["error", "never"]
    }
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    extends: ["prettier"]
  }
]);
