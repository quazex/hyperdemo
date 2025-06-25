import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsNumber as IsNum,
    IsOptional,
    Max,
    Min,
    ValidationOptions,
} from 'class-validator';

export const IsNumber = (options?: ApiPropertyOptions): PropertyDecorator => {
    const validationOptions: ValidationOptions = {
        each: options?.isArray,
    };

    const decorators: PropertyDecorator[] = [
        ApiProperty(options),
        IsNum({ allowNaN: false, allowInfinity: false }, validationOptions),
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

    if (typeof options?.minimum === 'number') {
        decorators.push(
            Min(options.minimum, validationOptions),
        );
    }
    if (typeof options?.maximum === 'number') {
        decorators.push(
            Max(options.maximum, validationOptions),
        );
    }

    return applyDecorators(...decorators);
};
