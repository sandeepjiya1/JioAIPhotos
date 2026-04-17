import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const tsReactBase = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
]

export default defineConfig([
  globalIgnores(['dist', 'dev-dist', 'web-build', '**/node_modules/**', '.expo/**']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: tsReactBase,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
])
