# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Monorepo-wide commands (run from root):**
- `npm run bundle:compile` - Build all packages and services
- `npm run dev:check` - TypeScript type checking across all workspaces
- `npm run dev:lint` - ESLint checking across all workspaces
- `npm run dev:format` - Auto-fix linting issues across all workspaces
- `npm run test:unit` - Run unit tests for packages and backend service
- `npm run test:e2e` - Run end-to-end tests for backend service
- `npm run pack:lint` - Check package.json sync across workspaces
- `npm run pack:format` - Format package.json files

**Backend service specific (run from services/backend/):**
- `npm run dev:live` - Start development server with hot reload
- `npm run bundle:run` - Run built production version
- `npm run migration:generate` - Generate TypeORM migration
- `npm run migration:run` - Run pending migrations

## Architecture Overview

This is a **TypeScript monorepo** using **Turbo** for build orchestration and **npm workspaces**. The project follows a **trunk-based development** approach with feature flags.

### Structure:
- **`packages/`** - Shared libraries used across services:
  - `@hyperdemo/clerk` - Clerk.dev authentication integration
  - `@hyperdemo/environment` - Environment configuration management
  - `@hyperdemo/validators` - Custom validation decorators
  - `@hyperdemo/exceptions` - Exception handling utilities
  - `@hyperdemo/logging` - Logging utilities

- **`services/backend/`** - NestJS API service with:
  - **Fastify** as HTTP adapter
  - **TypeORM** for database operations
  - **PostgreSQL** database
  - **Swagger/OpenAPI** documentation
  - **Clerk** authentication

### Backend Service Architecture:

**Domain-Driven Structure:**
- `source/domain/database/` - TypeORM entities grouped by business domain
- `source/domain/models/` - Business logic models
- `source/domain/restapi/` - DTOs for requests/responses
- `source/domain/schemas/` - Type definitions
- `source/domain/mocks/` - Test data factories

**Modular Architecture:**
- `source/modules/{domain}/{feature}/` - Feature modules organized by domain
- Each feature follows pattern: `module/business/`, `module/integration/`, `module/transport/`
- `module/business/` - Business logic handlers
- `module/integration/` - Database repositories
- `module/transport/` - HTTP controllers

**Configuration & Context:**
- `source/config/` - Application configuration modules
- `source/context/` - Request context injection for dependency injection

## Development Workflow

1. **Always run `npm run dev:check` after making changes** - this runs TypeScript checking across all workspaces
2. **Use `npm run test:unit` during development** for faster feedback (avoids E2E overhead)
3. **Run from monorepo root** unless working on service-specific tasks
4. **No cross-service imports allowed** between services (even within packages)

## Testing Strategy

- **Unit tests**: Test individual modules in isolation using `source/testing/application.unit.ts`
- **E2E tests**: Full application testing with real database using `source/testing/application.e2e.ts` and TestContainers
- **Database**: E2E tests use PostgreSQL TestContainers for isolation

## Code Style

- **Import/export syntax** with destructuring preferred: `import { foo } from 'bar'`
- **Feature flags** for environment-specific behavior with detailed comments
- **TypeScript strict mode** enabled across all packages
- **ESLint** with `@quazex/eslint-config` for consistent styling