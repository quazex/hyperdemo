import { SetMetadata } from '@nestjs/common'
import { TLooperParams } from '../types/params.types'
import { LOOPER_METADATA_KEY } from './looper.tokens'

/**
 * Декоратор для запуска метода в бесконечном цикле с заданным интервала
 */
export const Looper = (params: TLooperParams): MethodDecorator => (
  SetMetadata(LOOPER_METADATA_KEY, params)
)
