import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import babelParser from "@babel/eslint-parser";
import prettier from 'prettier';
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";


export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/**/*.js", "**/**/*.ts", "**/**/*.tsx"],
    ignores: ["dist", "**/*.test.js", "./rollup.config.js"],
    rules: {
      semi: ["error"]
    }
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      sourceType: "module",
      ecmaVersion: 2022,
      parser: typescriptParser,
    },
  },
  {
    plugins: { prettier, typescriptEslint }
  }
];
