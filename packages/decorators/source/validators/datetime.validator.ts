import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator'
import { DateTime } from 'luxon'

/**
 * Кастомный декоратор для проверки поля на DateTime
 */
export function IsDateTime(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object, property): void {
    registerDecorator({
      name: 'IsDateTime',
      target: object.constructor,
      propertyName: property.toString(),
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          if (value instanceof DateTime) {
            return value.isValid
          }
          return false
        },
        defaultMessage(args: ValidationArguments): string {
          return `Property ${args.property} is not valid DateTime`
        },
      },
    })
  }
}

/**
 * Преднастоенный набор декораторов для валидации экземпляра DateTime
 */
export const ValidateDateTime = (options?: ApiPropertyOptions): PropertyDecorator => {
  const validationOptions: ValidationOptions = {
    each: options?.isArray,
  }

  const decorators: PropertyDecorator[] = [
    ApiProperty(options),
    IsDateTime(validationOptions),
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
