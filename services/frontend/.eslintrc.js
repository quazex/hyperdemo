module.exports = {
    extends: [
        'plugin:@next/next/recommended',
        '@quazex/eslint-config',
    ],
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        }
    },
    ignorePatterns: [
        'dist',
        '.eslintrc.*',
        '*.d.ts',
    ],
    rules: {
        '@stylistic/indent-binary-ops': ['error', 4],
        '@stylistic/jsx-closing-bracket-location': ['error', {
            selfClosing: 'line-aligned',
        }],
        '@stylistic/jsx-curly-newline': ['error', 'consistent'],
        '@stylistic/jsx-curly-spacing': ['error', {
            'when': 'never',
            'allowMultiline': true,
        }],
        '@stylistic/jsx-indent-props': ['error', {
            indentMode: 4,
            ignoreTernaryOperator: true,
        }],
        '@stylistic/jsx-quotes': ['error', 'prefer-double'],
        '@stylistic/jsx-wrap-multilines': ['error', {
            declaration: 'parens',
            assignment: 'parens',
            return: 'parens',
            arrow: 'parens',
            condition: 'ignore',
            logical: 'ignore',
            prop: 'ignore',
            propertyValue: 'ignore',
        }],
        '@stylistic/padded-blocks': ['error', {
            blocks: 'never',
            classes: 'always',
        }, {
            allowSingleLineBlocks: true,
        }],
        '@stylistic/padding-line-between-statements': ['error', {
            blankLine: 'always',
            prev: 'try',
            next: '*',
        }, {
            blankLine: 'never',
            prev: 'try',
            next: 'return',
        }],
        '@typescript-eslint/naming-convention': ['error', {
            selector: ['interface', 'typeAlias'],
            format: ['PascalCase'],
            custom: {
                regex: '^T[A-Z]',
                match: true,
            },
        }, {
            selector: 'class',
            format: ['PascalCase'],
        }, {
            selector: ['classMethod'],
            format: ['camelCase'],
        }, {
            selector: 'classProperty',
            format: ['snake_case'],
        }, {
            selector: 'enum',
            format: ['PascalCase'],
        }, {
            selector: 'enumMember',
            format: ['camelCase'],
        }],
        '@typescript-eslint/no-magic-numbers': ['off'],
        'import/no-default-export': 'off',
        'import/order': ['error', {
            'newlines-between': 'never',
            'alphabetize': {
                'order': 'asc',
                'caseInsensitive': true,
            },
            'pathGroups': [{
                'pattern': 'react*',
                'group': 'external',
                'position': 'before',
            }],
            'pathGroupsExcludedImportTypes': ['react'],
            'groups': [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index',
                'object',
                'type',
            ]
        }],
        'func-style': ['off'],
        'promise/catch-or-return': 'off',
        'promise/prefer-await-to-then': 'off',
    },
};
