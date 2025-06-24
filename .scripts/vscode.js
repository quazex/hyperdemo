/**
 * @link https://github.com/firsttris/vscode-jest-runner/issues/353
 *
 * Данный костыль необходим для фикса поведения расширения Jest Runner при запуск e2e тестов в монорепозитории
 * NPM устанавливает зависисмости одой версии в корень монорепозитория,
 * а Jest Runner по умолчанию пытается найти ближайший `jest/bin/jest.js` и на базе его расположения определяет process.cwd().
 * Такой поведение расширения запускает тесты из корня монорепы, хотя требуется запуск из корня сервиса.
 * В качестве временнего решения можно создавать ссылку на корневой `jest/bin/jest.js` в папке сервиса для корректной работы расширения.
 */
const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');

const BIN_PATH = 'node_modules/jest/bin';
const BIN_NAME = 'jest.js';

const rootPath = process.cwd();
const monorepoBin = path.resolve(rootPath, BIN_PATH, BIN_NAME);

const packageRaw = fs.readFileSync('package.json', 'utf8');
const packageJSON = JSON.parse(packageRaw);

if (Array.isArray(packageJSON.workspaces)) {
    for (const wsGlob of packageJSON.workspaces) {
        const wsPath = path.resolve(rootPath, wsGlob);

        const wsNested = glob.sync(wsPath, {
            deep: 1,
            onlyDirectories: true,
        });
        for (const projectPath of wsNested) {
            const projectDir = path.resolve(projectPath, BIN_PATH);
            const projectBin = path.resolve(projectDir, BIN_NAME);

            const isLinkExisted = fs.existsSync(projectDir);
            if (!isLinkExisted) {
                fs.mkdirSync(projectDir, { recursive: true });
                fs.symlinkSync(monorepoBin, projectBin);
            }
        }
    }
}
