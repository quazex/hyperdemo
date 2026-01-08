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
import { Sharp } from 'sharp'

/**
 * @link https://gist.github.com/Qti3e/6341245314bf3513abb080677cd1c93b
 */
export enum ImageMime {
  PNG = 'png',
  SVG = 'svg',
  JPG = 'jpg',
}

/**
 * Кастомный декоратор для проверки Buffer на содержимое картинки
 */
export function IsImage(mime: ImageMime[], validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object, property): void {
    registerDecorator({
      name: 'IsImage',
      target: object.constructor,
      propertyName: property.toString(),
      options: validationOptions,
      validator: {
        async validate(value: object): Promise<boolean> {
          const isSharp = value?.constructor?.name === 'Sharp'

          if (isSharp) {
            const metadata = await (value as Sharp).metadata().catch(() => null)
            return mime.some((type) => type === metadata?.format)
          }

          return false
        },
        defaultMessage(args: ValidationArguments): string {
          return `Property ${args.property} is not valid MimeType`
        },
      },
    })
  }
}

/**
 * Преднастоенный набор декораторов для валидации картинок
 */
export const ValidateImage = (mime: ImageMime[], options?: ApiPropertyOptions): PropertyDecorator => {
  const validationOptions: ValidationOptions = {
    each: options?.isArray,
  }

  const decorators: PropertyDecorator[] = [
    ApiProperty(options),
    IsImage(mime, validationOptions),
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
