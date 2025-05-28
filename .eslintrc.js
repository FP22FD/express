import js from "@eslint/js";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescript - eslint.parser,
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
