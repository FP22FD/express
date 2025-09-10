// import js from "@eslint/js";

// export default [
//   {
//     files: ["**/*.ts"],
//     languageOptions: {
//       parser: typescript - eslint.parser,
//     },
//     plugins: {
//       perfectionist: eslintPluginPerfectionist,
//     },
//     rules: {
//       "perfectionist/sort-imports": "error",
//     },
//   },
//   js.configs.recommended,
// ];

import js from "@eslint/js";
import { ESLint } from "eslint";
import typescriptParser from "@typescript-eslint/parser";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      perfectionist: eslintPluginPerfectionist,
    },
    rules: {
      "perfectionist/sort-imports": "error",
    },
  },
  js.configs.recommended,
];
