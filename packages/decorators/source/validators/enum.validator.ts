import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidationOptions,
} from 'class-validator'

export const ValidateEnum = (entity: object, options?: Omit<ApiPropertyOptions, 'enum'>): PropertyDecorator => {
  //
  // В typescript при использовании чисел в enum будут возвращены ключи и значения при вызове Object.values
  // Чтобы предотвратить использование ключей в числовых enum необходимо отфильтровать строковые ключи
  //
  const entityValues = Object.values(entity)
  const isEnumInteger = entityValues.some((v) => typeof v === 'number')
  const enumValues = entityValues.filter((v) => isEnumInteger ? typeof v === 'number' : typeof v === 'string')

  const validationOptions: ValidationOptions = {
    each: options?.isArray,
  }

  const apiProperties: ApiPropertyOptions = {
    ...options as object,
    enum: enumValues as never,
  }

  const decorators: PropertyDecorator[] = [
    ApiProperty(apiProperties),
    IsEnum(enumValues, validationOptions),
    IsNotEmpty(),
  ]

  if (isEnumInteger) {
    decorators.push(IsNumber())
  }

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
