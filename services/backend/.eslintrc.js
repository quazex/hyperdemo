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
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-unsafe-member-access': ['off'],
        '@typescript-eslint/no-unsafe-call': ['off'],
    },
}
