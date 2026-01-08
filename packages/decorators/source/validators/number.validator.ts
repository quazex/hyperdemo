import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidationOptions,
} from 'class-validator'

export const ValidateNumber = (options?: ApiPropertyOptions): PropertyDecorator => {
  const validationOptions: ValidationOptions = {
    each: options?.isArray,
  }

  const decorators: PropertyDecorator[] = [
    ApiProperty(options),
    IsNumber({ allowNaN: false, allowInfinity: false }, validationOptions),
  ]

  if (options?.required === false) {
    decorators.push(IsOptional())
  }

  if (typeof options?.minimum === 'number') {
    decorators.push(
      Min(options.minimum),
    )
  }
  if (typeof options?.maximum === 'number') {
    decorators.push(
      Max(options.maximum),
    )
  }

  if (options?.isArray) {
    decorators.push(
      IsArray(),
      ArrayNotEmpty(),
    )

    if (typeof options.minItems === 'number') {
      decorators.push(
        ArrayMinSize(options.minItems),
      )
    }

    if (typeof options.maxItems === 'number') {
      decorators.push(
        ArrayMaxSize(options.maxItems),
      )
    }
  }

  return applyDecorators(...decorators)
}
