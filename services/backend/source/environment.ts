/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { LOG_LEVELS } from '@nestjs/common'
import { parse } from 'dotenv'
import { from } from 'env-var'

/**
 * Создаем настройки приложения для универсального использования
 * Обязательно использовать класс со статическими геттерами
 * для поддержки тестового окружения
 */
export class Environment {
  /**
   * Считываем переменные окружения
   */
  static get #vars() {
    const root = process.cwd()
    const vars = Object.assign({}, process.env)

    //
    // Для продового окружения пропускаем чтение енвов из файла
    //
    if (vars.NODE_ENV !== 'production') {
      const path = join(root, './.env')
      const isEnvExists = existsSync(path)
      if (isEnvExists) {
        const file = readFileSync(path, 'utf8')
        const dotenv = parse<Record<string, string>>(file)

        Object.assign(vars, dotenv)
      }
    }

    /**
     * Формируем валидатор енвов
     */
    return from(vars)
  }

  public static get App() {
    const logLevels = this.#vars.get('LOGS_LEVELS').default('log,debug,warn,error,fatal').asArray(',')
    const allowedLogs = LOG_LEVELS.filter((lvl) => logLevels.includes(lvl))

    return {
      port: this.#vars.get('PORT').required().asPortNumber(),
      environment: this.#vars.get('NODE_ENV').required().asEnum(['development', 'production']),
      timezone: this.#vars.get('APP_TIMEZONE').default('UTC').asString(),
      docsEnabled: this.#vars.get('DOCS_ENABLED').default('false').asBoolStrict(),
      logLevels: allowedLogs,
    }
  }

  public static get Features() {
    return {
    }
  }

  public static get Durations() {
    return {
    }
  }

  public static get View() {
    return {
      Size: this.#vars.get('VIEW_PAGINATION_SIZE').default('40').asIntPositive(),
    }
  }

  public static get Postgres() {
    return {
      URI: this.#vars.get('POSTGRES_URI').required().asUrlString(),
      Timeout: this.#vars.get('POSTGRES_TIMEOUT').default('10000').asIntPositive(),
    }
  }

  public static get Clerk() {
    return {
      publishableKey: this.#vars.get('CLERK_PUBLISHABLE_KEY').required().asString(),
      secretKey: this.#vars.get('CLERK_SECRET_KEY').required().asString(),
    }
  }
}
