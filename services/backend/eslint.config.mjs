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
        '@stylistic/array-bracket-newline': ['warn', 'consistent'],
        '@stylistic/array-bracket-spacing': ['warn', 'never'],
        '@stylistic/array-element-newline': ['warn', 'consistent'],
        '@stylistic/arrow-parens': ['error', 'always'],
        '@stylistic/arrow-spacing': ['error'],
        '@stylistic/brace-style': ['error', '1tbs', {
            'allowSingleLine': false,
        }],
        '@stylistic/generator-star-spacing': ['error', {
            'before': true,
            'after': true,
        }],
        '@stylistic/comma-dangle': ['warn', 'always-multiline'],
        '@stylistic/comma-spacing': ['warn'],
        '@stylistic/comma-style': ['warn', 'last'],
        '@stylistic/function-call-spacing': ['warn', 'never'],
        '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
        '@stylistic/function-paren-newline': ['warn', 'multiline-arguments'],
        '@stylistic/indent': ['error', 2],
        '@stylistic/lines-around-comment': ['warn', {
            allowBlockStart: true,
            allowObjectStart: true,
            allowArrayStart: true,
            allowClassStart: true,
            allowEnumStart: true,
            allowInterfaceStart: true,
            beforeBlockComment: true,
            beforeLineComment: false,
        }],
        '@stylistic/quotes': ['error', 'single', {
            'avoidEscape': true
        }],
        '@stylistic/spaced-comment': ['error', 'always'],
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
        '@typescript-eslint/explicit-member-accessibility': ['warn', {
            overrides: {
            constructors: 'no-public',
            },
        }],
        '@typescript-eslint/naming-convention': ['warn', {
            'selector': ['interface', 'typeAlias'],
            'format': ['PascalCase'],
            'custom': {
            'regex': '^T[A-Z]',
            'match': true,
            }
        }, {
            'selector': 'enumMember',
            'format': ['UPPER_CASE']
        }],
        '@typescript-eslint/parameter-properties': ['warn', {
            allow: [
            'private readonly',
            ],
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
        'arrow-body-style': ['warn', 'as-needed'],
        'curly': ['warn', 'all'],
        'max-classes-per-file': ['warn', 1],
        'no-async-promise-executor': 'error',
        'no-console': ['warn'],
        'no-throw-literal': ['error'],
        'no-restricted-syntax': ['warn', {
            selector: "CallExpression[callee.property.name='forEach']",
            message: 'Use `for...or` instead',
        }, {
            selector: 'ForInStatement',
            message: 'Use `for...or` instead',
        }, {
            selector: "MethodDefinition[accessibility='private']",
            message: 'Private methods are not allowed, you need to split code',
        }, {
            selector: "ThrowStatement > NewExpression[callee.name='Error']",
            message: 'You need to throw AppError instance',
        }, {
            selector: "CallExpression[callee.object.name='Math'][callee.property.name='random']",
            message: 'Math.random is not allowed, use `radash.random()` instead',
        }],
        'prefer-destructuring': ['warn', {
            array: false,
            object: false,
        }, {
            enforceForRenamedProperties: false,
        }],
        },
    },
);
