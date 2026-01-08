import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator'

export const ValidateString = (options?: ApiPropertyOptions): PropertyDecorator => {
  const validationOptions: ValidationOptions = {
    each: options?.isArray,
  }

  const decorators: PropertyDecorator[] = [
    ApiProperty(options),
    IsString(validationOptions),
    IsNotEmpty(),
  ]

  if (options?.required === false) {
    decorators.push(IsOptional())
  }

  if (options?.minLength) {
    decorators.push(MinLength(options.minLength))
  }

  if (options?.maxLength) {
    decorators.push(MaxLength(options.maxLength))
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
