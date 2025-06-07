import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber as IsNum, IsOptional, Min, ValidationOptions } from 'class-validator';

export const IsNumber = (options?: ApiPropertyOptions): PropertyDecorator => {
    const minValue = options?.minimum ?? 0;

    const validationOptions: ValidationOptions = {
        each: options?.isArray,
    };

    const decorators: PropertyDecorator[] = [
        ApiProperty(options),
        IsNum({ allowNaN: false, allowInfinity: false }, validationOptions),
        Min(minValue, validationOptions),
    ];
    if (options?.required === false) {
        decorators.push(IsOptional());
    }
    if (options?.isArray) {
        decorators.push(
            IsArray(),
            ArrayNotEmpty(),
        );
    }
    if (!options?.isArray) {
        decorators.push(
            Transform((params) => Number(params.value)),
        );
    }

    return applyDecorators(...decorators);
};
