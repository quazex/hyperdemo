# Bash команды
- `npm run bundle:compile` - Сборка проекта
- `npm run dev:check` - Проверка кода с помощью TypeScript
- `npm run dev:lint` - Проверка кода с помощью ESLint
- `npm run dev:format` - Автоматическое исправление ошибок линтера
- `npm run test:e2e` - Запуск end-to-end тестов с полным запуском приложения и тестовой БД
- `npm run test:unit` - Запуск unit тестов на уровне модуля

# Code style
- Используется import/export синтакс
- Для импортов по возможности применяется деструктуризация (например, import { foo } from 'bar')

# Структура
- `source` - корневая папка проекта для исходных TypeScript файлов

- `source/@types` - модификация типов для всего проекта
- `source/config` - модуль с настройками приложения (_должен содержать index.ts_)
- `source/context/index.ts` - точка входа для модуля настроек
- `source/context` - модуль для передачи параметров запроса в Injectable контекст
- `source/context/index.ts` - точка входа для модуля контекста

- `source/domain/database` - группы TypeORM сущностей базы данных
- `source/domain/mocks` - фабрики для генерации заглушек данных для тестов
- `source/domain/models` - модели данных для приложения
- `source/domain/restapi` - набор DTO для реквестов и респонсов
- `source/domain/schemas` - набор типов для ответов
- `source/domain/**/index.ts` - точка входа для модулей

- `source/modules` - корневая папка проекта для исходных TypeScript файлов
- `source/modules/{group}` - группа use-cases
- `source/modules/{group}/{group}.module.ts/` - общий модуль для группы use-cases
- `source/modules/{group}/{case}` - модуль use-cases

- `source/testing` - вспомогательные файлы для тестов
- `source/testing/application.e2e.ts` - преднастроенный TestingModule для E2E тестов, запускает AppModule целиком и дублирует настройки из `source/main.ts`
- `source/testing/application.unit.ts` - преднастроенный TestingModule для unit тестов, ожидает модуль в аргументах
- `source/testing/global.setup.ts` - Скрипт для подготовки E2E тестов
- `source/testing/global.teardown.ts` - Скрипт для завершения E2E тестов
- `source/testing/index.ts` - точка входа для файлов тестов

# Служебные файлы
- .env - публичный файл переменных окружения для локальной разработки
- dockerfile - настройки для сборки докер образа из корня проекта
- jest.e2e.json - Jest настройки для E2E тестов
- jest.unit.json - Jest настройки для Unit тестов
- nest.cli.json - Настройки для NestJS CLI утилиты (подключает плагины для Swagger)
- orm-config.ts - Datasource для TypeORM CLI для генерации моделей (только создание)

# Workflow
- После всех доработок запускать `npm run dev:check`
- При разработке использовать только `npm run test:unit` для оптимизации ресурсов
