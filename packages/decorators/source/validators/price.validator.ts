import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNumberString,
  IsOptional,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator'
import { Decimal } from 'decimal.js'

/**
 * Validator для проверки минимального значения цены
 */
export function IsMinPrice(minimum: number, validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object, property) {
    registerDecorator({
      name: 'IsMinPrice',
      target: object.constructor,
      propertyName: property.toString(),
      options: validationOptions,
      constraints: [
        minimum,
      ],
      validator: {
        validate(value: string): boolean {
          try {
            const decimal = new Decimal(value)
            return decimal.greaterThanOrEqualTo(minimum)
          } catch {
            return false
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a price greater than or equal to ${args.constraints[0]}`
        },
      },
    })
  }
}

/**
 * Validator для проверки максимального значения цены
 */
export function IsMaxPrice(maximum: number, validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object, property) {
    registerDecorator({
      name: 'IsMaxPrice',
      target: object.constructor,
      propertyName: property.toString(),
      options: validationOptions,
      constraints: [
        maximum,
      ],
      validator: {
        validate(value: string): boolean {
          try {
            const decimal = new Decimal(value)
            return decimal.lessThanOrEqualTo(maximum)
          } catch {
            return false
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a price less than or equal to ${args.constraints[0]}`
        },
      },
    })
  }
}

export const ValidatePrice = (options?: ApiPropertyOptions): PropertyDecorator => {
  const validationOptions: ValidationOptions = {
    each: options?.isArray,
  }

  const decorators: PropertyDecorator[] = [
    ApiProperty(options),
    IsNumberString(undefined, validationOptions),
  ]

  if (options?.required === false) {
    decorators.push(IsOptional())
  }

  if (typeof options?.minimum === 'number') {
    decorators.push(IsMinPrice(options.minimum))
  }

  if (typeof options?.maximum === 'number') {
    decorators.push(IsMaxPrice(options.maximum))
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
