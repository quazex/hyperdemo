import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  stylistic.configs.recommended,
  importPlugin.flatConfigs.recommended,
  globalIgnores([
    'build',
    'node_modules',
    'source/@types',
    'eslint*',
    '.env*',
    '**/*.js*',
  ]),
  {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', {
        'allowSingleLine': false,
      }],
      '@stylistic/generator-star-spacing': ['error', {
        'before': true,
        'after': true,
      }],
      '@stylistic/operator-linebreak': ['error', 'before', {
        'overrides': {
          '=': 'after',
        }
      }],
      '@stylistic/quotes': ['error', 'single', {
        'avoidEscape': true
      }],
      '@typescript-eslint/array-type': ['error', {
        'default': 'array-simple',
      }],
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': ['error', {
        'allowStaticOnly': true,
        'allowEmpty': true,
      }],
      '@typescript-eslint/explicit-function-return-type': ['error', {
        'allowExpressions': true,
        'allowTypedFunctionExpressions': true,
      }],
      '@typescript-eslint/naming-convention': ['error', {
        'selector': ['interface', 'typeAlias'],
        'format': ['PascalCase'],
        'custom': {
          'regex': '^T[A-Z]',
          'match': true,
        }
      }],
      'import/named': 'off',
      'import/no-unresolved': 'off',
      'import/order': ['error', {
        'newlines-between': 'never',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
        'pathGroups': [{
          'pattern': '@/**',
          'group': 'internal',
          'position': 'before',
        }],
        'groups': [
          'builtin',
          'external',
          'internal',
          'object',
          'parent',
          'sibling',
          'index',
          'type',
        ],
      }],
    },
  },
);
