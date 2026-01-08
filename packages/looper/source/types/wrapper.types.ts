export interface TLooperWrapper {
  /**
   * Название окружения для логирования
   */
  scope: string

  /**
   * Время простоя при отсутствии задач
   */
  idleTimeout: number

  /**
   * Время простоя при ошибке
   */
  failTimeout: number
}
