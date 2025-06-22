/**
 * @link https://github.com/firsttris/vscode-jest-runner/issues/353
 *
 * Данный костыль необходим для фикса поведения расширения Jest Runner при запуск e2e тестов в монорепозитории
 * NPM устанавливает зависисмости одой версии в корень монорепозитория,
 * а Jest Runner по умолчанию пытается найти ближайший `jest/bin/jest.js` и на базе его расположения определяет process.cwd().
 * Такой поведение расширения запускает тесты из корня монорепы, хотя требуется запуск из корня сервиса.
 * В качестве временнего решения можно создавать ссылку на корневой `jest/bin/jest.js` в папке сервиса для корректной работы расширения.
 */
const BIN_PATH = 'node_modules/jest/bin';
const BIN_NAME = 'jest.js';

const fs = require('fs');
const path = require('path');

const monorepoPath = path.resolve(__dirname, '../../../', BIN_PATH, BIN_NAME);
const backendPath = path.resolve(__dirname, '../', BIN_PATH);
const backendFile = path.resolve(backendPath, BIN_NAME);

const isLinkExisted = fs.existsSync(backendPath);
if (!isLinkExisted) {
    fs.mkdirSync(backendPath, { recursive: true });
    fs.symlinkSync(monorepoPath, backendFile);
}
