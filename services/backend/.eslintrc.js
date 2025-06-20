module.exports = {
    extends: '@quazex/eslint-config',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    ignorePatterns: [
        'dist',
        '.eslintrc.*',
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
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
        }, {
            selector: ['variable'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        }, {
            selector: ['objectLiteralProperty', 'classProperty'],
            format: ['camelCase', 'snake_case'],
            leadingUnderscore: 'allow',
        }],
    },
}
