import { Transform } from 'class-transformer'
import { isRFC3339 } from 'class-validator'
import { DateTime } from 'luxon'

/**
 * Декоратор для преобразования даты из формата RFC3339
 */
export const TransformDateTime = (): PropertyDecorator => Transform((p) => {
  if (typeof p.value === 'string') {
    const isFullDate = isRFC3339(p.value)

    if (isFullDate) {
      return DateTime.fromISO(p.value)
    }
  }

  return p.value
})
