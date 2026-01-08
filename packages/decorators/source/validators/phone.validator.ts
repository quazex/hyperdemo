import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsPhoneNumber,
  ValidationOptions,
} from 'class-validator'

export const ValidatePhone = (options?: ApiPropertyOptions): PropertyDecorator => {
  const validationOptions: ValidationOptions = {
    each: options?.isArray,
  }

  const decorators: PropertyDecorator[] = [
    ApiProperty(options),
    IsPhoneNumber(undefined, validationOptions),
  ]

  if (options?.required === false) {
    decorators.push(IsOptional())
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
