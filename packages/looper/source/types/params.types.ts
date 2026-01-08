export interface TLooperParams {
  /**
   * Название окружения для логирования
   * @default Имя класса и метода
   */
  scope?: string

  /**
   * Время простоя при отсутствии задач
   */
  idleTimeout: number

  /**
   * Время простоя при ошибке
   * @default idleTimeout
   */
  failTimeout?: number

  /**
   * Отключение метода
   * @default false
   */
  disabled?: boolean
}
