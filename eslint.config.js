import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const tsReactBase = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
]

export default defineConfig([
  globalIgnores(['dist', 'dev-dist', '**/node_modules/**']),
  {
    files: ['src/**/*.{ts,tsx}', 'vite.config.ts'],
    extends: [...tsReactBase, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['mobile/**/*.{ts,tsx}'],
    extends: tsReactBase,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      /** Metro / RN static assets use `require()` in registries and some screens. */
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
])
