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

/**
 * Кастомный декоратор для проверки поля на Buffer
 */
export function IsBuffer(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object, property): void {
    registerDecorator({
      name: 'IsBuffer',
      target: object.constructor,
      propertyName: property.toString(),
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return Buffer.isBuffer(value)
        },
        defaultMessage(args: ValidationArguments): string {
          return `Property ${args.property} is not valid Buffer`
        },
      },
    })
  }
}

/**
 * Преднастоенный набор декораторов для валидации экземпляра Buffer
 */
export const ValidateBuffer = (options?: ApiPropertyOptions): PropertyDecorator => {
  const validationOptions: ValidationOptions = {
    each: options?.isArray,
  }

  const decorators: PropertyDecorator[] = [
    ApiProperty(options),
    IsBuffer(validationOptions),
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
