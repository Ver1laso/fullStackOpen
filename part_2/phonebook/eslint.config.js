import js from "@eslint/js";
import globals from "globals";
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
// ]);

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node },
    plugins: { js, stylistic },    
    extends: ["js/recommended"]  
  }
]);