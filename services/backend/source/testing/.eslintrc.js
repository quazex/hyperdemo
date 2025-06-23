module.exports = {
    rules: {
        'import/no-default-export': ['off'],
        'no-console': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/naming-convention': ['error', {
            selector: ['objectLiteralProperty', 'classProperty'],
            format: ['camelCase', 'snake_case', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
        }],
    },
}
