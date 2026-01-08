export enum ErrorCode {
  /**
   * Для внутренних ошибок
   */
  UNAUTHORIZED = 'UNAUTHORIZED',

  /**
   * Для внутренних ошибок
   */
  INTERNAL_ERROR = 'INTERNAL_ERROR',

  /**
   * Для внутренних ошибок
   */
  INVALID_PARAMETERS = 'INVALID_PARAMETERS',

  /**
   * Когда слишком много запросов
   */
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
}
