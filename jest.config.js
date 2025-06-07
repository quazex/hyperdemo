module.exports = {
    maxWorkers: 1,
    passWithNoTests: true,
    testTimeout: 120000,
    moduleFileExtensions: ['ts', 'js'],
    testMatch: [
        '**/*.spec.ts'
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}
